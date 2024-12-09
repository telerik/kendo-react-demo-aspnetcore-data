# KendoReactEFCoreDemo

A demo that shows how to use the Progress Telerik UI for React Grid with an EntityFramework backend and CRUD operations.

## Get Started
To run the example:

1. Open `ReactWithRestApi.sln` solution in Visual Studio (or VSCode)
    - The solution has two projects; the React project (client), the .NET project (server)
2. Open the `ReactWithRestApi.Client` folder in your favorite terminal and run `npm install` to restore its dependenices
3. Update the Telerik NuGet server credentials
    - Option 1 (recommended) - Edit the **nuget.config** file and replace `%TELERIK_NUGET_KEY%` with your own Telerik NuGet Key ([generate a new one here](https://www.telerik.com/account/downloads/nuget-keys))
    - Option 2 (Visual Studio) - Add the Telerik NuGet server to your Visual Studio package sources ([one-time instructions here](https://docs.telerik.com/aspnet-core/installation/nuget-install#setup-with-the-nuget-package-manager))
4. Make sure the **HTTPS** profile is selected as the default target and start debugging

## Runtime

After starting the app, the following things will occurr:

1. The .NET backend will start first and a new brower tab will open and show the API's swagger page.
2. A new command window will open and start the client app. You may need to click/copy the URL to open the client app in the browser.

## Further Assistance

Depending on the topic you need assistance with, there are two locations to get assistance.

- .NET - For more information about launching and running a SPA app in Visual Studio:
    - [Tutorial ASP.NET Core with React | Microsoft Learn](https://learn.microsoft.com/en-us/visualstudio/javascript/tutorial-asp-net-core-with-react?view=vs-2022).
    - [.NET Discord | Live Chat with .NET team and other .NET community members](http://aka.ms/dotnet-discord)
- Kendo - If you have any questions about the client-side KendoReact Grid:
    - [Technical Support](https://www.telerik.com/account/support-center/contact-us/technical-support)
    - [Forums](https://www.telerik.com/forums/kendo-ui-react/kendoreact-general-discussions)
    - [License Support](https://www.telerik.com/account/support-center/contact-us/licensing-support)