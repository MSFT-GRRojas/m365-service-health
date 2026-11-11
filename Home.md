## M365 Service Health
The M365 Service Health app gives non-administrative users a clear, easy-to-use view of Microsoft 365 service health. A Power Automate flow retrieves the current service health data from the Microsoft Graph API and writes it to a SharePoint list that all users can read. The app then displays that list's data, so users can check service status without needing admin access.

## Prerequisites
Entra App Registration with the following API permissions consented on behalf the tenant:
  - ServiceHealth.Read.All
