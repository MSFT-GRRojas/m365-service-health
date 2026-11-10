import { List } from "dattatable";
import { Components, Types } from "gd-sprest-bs";
import { getRanking, getStatusTitle } from "./common";
import { Security } from "./security";
import Strings from "./strings";

/**
 * List Item
 * Add your custom fields here
 */
export interface IListItem extends Types.SP.ListItem {
    Rank: number;
    ServiceId: string;
    ServiceIssues: string;
    ServiceStatus: string;
    Status: string;
    Title: string;
}

/**
 * Data Source
 */
export class DataSource {
    // Initializes the application
    static init(): PromiseLike<any> {
        // Return a promise
        return new Promise((resolve, reject) => {
            return Promise.all([
                // Load the security
                Security.init(),
                // Load the data
                this.load()
            ]).then(resolve, reject);
        });
    }

    // Loads the list data
    private static _items: IListItem[] = null;
    private static _list: List<IListItem> = null;
    static get List(): List<IListItem> { return this._list; }
    static get ListItems(): IListItem[] { return this._items; }
    static getFilteredItems(): IListItem[] {
        // See if we are showing all services
        if (Strings.ShowServices == null || Strings.ShowServices == "[]") { return this.ListItems; }

        // Parse the items
        let items: IListItem[] = [];
        for (let i = 0; i < this.ListItems.length; i++) {
            let item = this.ListItems[i];

            // Parse the services to show
            if (Strings.ShowServices.indexOf(item.ServiceId) >= 0) {
                // Append this item
                items.push(item);
            }
        }

        // Return the items to display
        return items;
    }
    static load(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Clear the items
            this._items = [];

            // Initialize the list
            this._list = new List<IListItem>({
                listName: Strings.Lists.Main,
                webUrl: Strings.SourceUrl,
                itemQuery: {
                    GetAllItems: true,
                    OrderBy: ["Title"],
                    Top: 5000
                },
                onInitError: reject,
                onInitialized: () => {
                    // Load the services
                    this.loadServices();

                    // Load the Status Filters
                    this.loadStatusFilters()

                    // Resolve the request
                    resolve();
                },
                onItemLoading: item => {
                    // Set the rank & status
                    item.Rank = getRanking(item.ServiceStatus);
                    item.Status = getStatusTitle(item.ServiceStatus);

                    // Add the item
                    this._items.push(item);
                }
            });
        });
    }

    // Services
    private static _services = new Map<string, string>();
    static get Services(): Map<string, string> { return this._services; }
    private static loadServices() {
        // Clear the services
        this._services = new Map<string, string>();

        // Parse the services
        for (let i = 0; i < DataSource.ListItems.length; i++) {
            this._services.set(DataSource.ListItems[i].ServiceId, DataSource.ListItems[i].Title);
        }
    }

    // Status Filters
    private static _statusFilters: Components.ICheckboxGroupItem[] = null;
    static get StatusFilters(): Components.ICheckboxGroupItem[] { return this._statusFilters; }
    static loadStatusFilters() {
        // Get the status field choices
        let field = this.List.getField("ServiceStatus") as Types.SP.FieldChoice;
        if (field) {
            let items: Components.ICheckboxGroupItem[] = [];

            // Parse the choices
            for (let i = 0; i < field.Choices.results.length; i++) {
                // Add an item
                items.push({
                    data: field.Choices.results[i],
                    label: getStatusTitle(field.Choices.results[i]),
                    type: Components.CheckboxGroupTypes.Switch
                });
            }

            // Set the filters and resolve the promise
            this._statusFilters = items;
        }
    }

    // Refreshes the list data
    static refresh(): PromiseLike<IListItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Refresh the data
            DataSource.List.refresh().then(resolve, reject);
        });
    }
}