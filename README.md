

 Asp.Net Core React Starter Kit
===================

  This starter kit is baked for React App in Asp.Net Core environment using modern JavaScript.
  Courtesy of  [aspnet/JavaScriptServices](https://github.com/aspnet/JavaScriptServices).

  If you are the one who prefer JavaScript more than TypeScript, this Starter Kit is probably  for you.
  Why another Starter Kit for Asp.Net Core React Application?
    read this from [Eric Elliot](https://medium.com/@_ericelliott) : [You Might Not Need TypeScript](https://medium.com/javascript-scene/you-might-not-need-typescript-or-static-types-aa7cb670a77b)

  for more about running SPA on Asp.Net Core, read this great blog [Angular, React, Knockout Apps On Asp.Net Core](http://blog.stevensanderson.com/2016/05/02/angular2-react-knockout-apps-on-aspnet-core/) from  [Steve Sanderson](https://github.com/SteveSandersonMS)
## Prerequisites:
-  [.NET Core 2.0](https://www.microsoft.com/net/learn/get-started/windows) (or later) SDK
-  [Node.js](https://nodejs.org/en/) version 6 (or later)

## How to run the Starter Kit
 - Download the zip package or clone this repo
 - Install all the dependencies (packages)
####
       > yarn
   or

       > npm intall

  - Run the project

####    
     > dotnet run

 - Set environment variable
####
    > setx ASPNETCORE_ENVIRONMENT "Development"

   [Read more](https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/) about  setting environment variable for asp.net core

## Technologies Included:

#### UI/State Management
    react
#### Styling
     Bootstrap + Plain CSS
     future plan: support sass(scss) + css modules
#### New Age JavaScript
     ES6/ES2017 with Babel
#### Package management
     yarn/npm
#### Linting
      ESLint + Stylelint
#### Static Typing
       Flow
#### Build System
       Webpack
#### Unit Testing
     future plan: support Jest + Enzyme
#### Continuous Integration
     N/A this will not be the concern of this starter kit
#### Hosting
     N/A this will not be the concern of this starter kit
