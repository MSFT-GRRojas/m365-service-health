## Download Latest

The required files will be available [here](https://github.com/spsprinkles/m365-service-health/releases) for download.

## SPFx Solution

The application will require you to download the `m365-service-health.sppkg` SPFx package.

### App Catalog

Add the SPFx package to the site collection or tenant app catalog. Deploy the SPFx package and make it available to all immediately. 

Note - If you choose not to make it available, then you must add the app manually to the site. [Reference from Microsoft](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/tenant-scoped-deployment)

### Create/Choose Page

Access the site to store the M365 Service Health items. 
  - For a new page: 
    - Click on `New` and then `Page` to create a new modern page. Configure the page and click on the `+` icon to add a webpart. Find the `M365 Service Health` app under the `Advanced` section.
  - For an existing page:
    - Select Edit in the upper right-hand corner to edit the page.  Select the section in which to add the app and lick on the `+` icon to add a webpart. Find the `M365 Service Health` app under the `Advanced` section.

### Install List

On initial load of the app, it will show you the installation dialog for creating the list. Click on `Install` to create the list.  This is required to store `M365 Service Health` data to display on the app.

#### Security

Once the list is installed, the security dialog will be displayed. This app will utilize the default site owners, members and visitors group to control access to the app. By default, it will inherit the permissions from the site. Click on `Configure` to break inheritance and set the default owners, members and visitors groups to the app. Click on `Refresh` to reload the page.

#### Publish Page

Review the webpart configuration options and save/publish the page.

## Flows

### Overview

The application uses a Power Automate Flow to retrieve data from the API call add items to the SharePoint list.

#### Default Environment (Commercial & GCC)

* MessageCenter.zip
* MessageCenterCleanup.zip

#### DoD Environment

The DoD packages will target the appropriate graph endpoints.

* MessageCenterDoD.zip
* MessageCenterCleanupDoD.zip

#### Higher Impact Levels

