---
name: application-modes
routeTemplate: ./data/component-templates/article.yml
title: Application Modes
---

# JSS application modes

> Note: Before learning about application modes, make sure to select a [developer workflow](dev-workflows/overview). Some application modes only apply to specific developer workflows.


JSS allows you run your JS app in various modes or configurations giving you a lot of flexibility depending on where you are in the development process:

For development:
- [Disconnected dev mode](#disconnected-developer-mode) - Sitecore _not_ required, hosts locally, uses local content data.
- [Connected dev mode](#connected-developer-mode) - Sitecore required, hosts locally, content data from Sitecore.
- [Integrated mode](#integrated-mode) - Sitecore required, hosts on Sitecore, content data from Sitecore, server-side rendering.
- [API-only mode](#api-only-mode) - Consume personalized Sitecore layout data from any platform that understands JSON.

For production:
- [Headless server-side rendering mode](#headless-server-side-rendering-mode) - Server-side rendering performed on Node server, data from Sitecore CD.
- [Integrated mode](#integrated-mode) - Server-side rendering performed on Sitecore CM server (for compatibility with Experience Editor only).
- [API-only mode](#api-only-mode) - Consume personalized Sitecore layout data from any platform that understands JSON.

## Disconnected developer mode

With disconnected mode, content data is mocked using local files (json/yaml/js) instead of a Sitecore instance. Disconnected mode is advantageous when there is no available Sitecore instance to deploy the app to, where most developer expertise is in JavaScript, or when it is undesirable to have frontend developers need their own Sitecore instance such as using Macs without a virtual machine to host Sitecore. All of the sample applications can run in disconnected mode.

![disconnected mode diagram](/assets/img/mode-disconnected.svg)

Disconnected mode apps can [import themselves](/docs/techniques/working-disconnected/import-process) to Sitecore, creating all necessary Sitecore items for them to run in connected mode later.

A common development path might be for an application's lifecycle to begin in disconnected mode, and later in development transition to _connected mode_ if the [limitations of disconnected import](/docs/techniques/working-disconnected/import-process) need to be circumvented.

#### Characteristics
- Rendering performed by the browser
- Data comes from local json/yaml files
- Usages: development

#### Configuration

* Run `jss start` to start in disconnected mode.
* `http://localhost:3000` (if it doesn't automatically open)

## Connected developer mode

In connected mode, a Sitecore instance is required. The Sitecore databases hold the content, layout data, and component registrations. Unlike _disconnected mode_ defining local mock data is unnecessary. When the app is run, the data is acquired from Sitecore using HTTP data calls.

![connected mode diagram](/assets/img/mode-connected.svg)

#### Characteristics
- Rendering performed by the browser
- Data comes from Sitecore via LayoutService/DictionaryService/GraphQL APIs via HTTP.
- Usages: development against running Sitecore instance

#### How to use

* Follow the directions in the Quick Start to [deploy the app to Sitecore](/docs/client-frameworks/getting-started/app-deployment), (including [prerequisites](/docs/client-frameworks/getting-started/jss-server-install) if it's the first JSS app on this Sitecore instance).
* Run `jss start:connected` to start the dev server.
* `http://localhost:3000` (if it doesn't automatically open)

> Note: When signed in to Sitecore in Experience Editor mode, using connected mode may result in extra code-like markup being delivered to your JSS application. If this happens, switch your site to Preview or Normal mode in Sitecore and the extra markup will go away.

## Integrated mode

This mode hosts your JSS app within a Sitecore instance. The application is _server-side rendered (SSR)_ by the Sitecore instance, meaning complete HTML is delivered to the user without any initial JS execution on the client. Integrated mode is always used when editing the site in Sitecore Experience Editor.

> When you add a component using Experience Editor, it will insert only the component HTML generated by SSR into the page, so global styles, scripts can not be updated. For example, some libraries (e.g. [styled-components](https://github.com/styled-components/styled-components)) are inserting global styles using `<style/>` tag after render of new component. After saving and refresing of Experience Editor it will insert all required and updated tags.

> We recommend Headless mode (below) for high traffic production sites. It provides additional scaling options, better scalability, and lower hosting costs for heavy traffic. If using SSR with Connected GraphQL, this is particularly important. Always load test your site with expected traffic before going live.

This mode allows your Sitecore users to manage content, presentation and other marketing features for your JSS app using Sitecore's Experience Editor. 

![integrated mode diagram](/assets/img/mode-integrated.svg)

#### Characteristics
- Rendering performed by server (SSR by [Node instances orchestrated by Sitecore](/docs/fundamentals/services/view-engine#nodejs-rendering-engine) or via a [remote rendering host](/docs/fundamentals/services/view-engine#http-rendering-engine)) 
- Data comes from Sitecore LayoutService, passed from Sitecore to Node with no extra HTTP call
- Requires configuration of the application with Sitecore
- Usage: Content Management/Authoring server, production Content Delivery server (if not using headless hosting or remote rendering host)

#### How to use

* Follow the directions in the Quick Start to [deploy the app to Sitecore](/docs/client-frameworks/getting-started/app-deployment), (including [prerequisites](/docs/client-frameworks/getting-started/jss-server-install) if it's the first JSS app on this Sitecore instance).
* `http://your-configured-app-hostname` (from `/sitecore/config/*.config`, search on `hostName`)

## Headless server-side rendering mode
This mode allows for running your app on any platform that supports `node.js` and Express, opening up inexpensive rendering engine scaling.

### Characteristics
- Rendering performed by server (SSR by Node-as-a-service provider, i.e. Azure App Service, Netlify, Heroku, etc)
- Data comes from Sitecore CD server via LayoutService API (HTTP calls)
- Full Sitecore marketing/personalization engine support
- Usages: decoupling rendering of the JSS app from Sitecore, multichannel API usage

![headless mode diagram](/assets/img/mode-headless.svg)

### How to use

Consult the [headless with `sitecore-jss-proxy`](/docs/techniques/ssr/headless-mode-ssr) page for details on how to configure the headless proxy.

## API-Only Mode

In this mode, you consume data directly from Sitecore's headless APIs - [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service), [GraphQL](/docs/fundamentals/services/graphql), [Dictionary Service](/docs/fundamentals/services/dictionary/sitecore-dictionary-service), [Sitecore Services Client](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/sitecoreservicesclient), etc.

API-only mode can be used with any platform that understands JSON data to consume Sitecore-provided content and personalized layout information. When the data is used this way, none of the JSS npm packages (or indeed any JavaScript) is required. Experience editor will not be supported.

> Note: a JSS-enabled Sitecore license is required to consume JSS' Layout Service data directly as an API.

### Characteristics
- Consume Sitecore APIs that return JSON data from anything that understands JSON, e.g. native mobile apps, chatbots, etc.

### How to use (Layout Service, Dictionary Service)

* Follow the directions in the Quick Start to [install the Headless server components](/docs/client-frameworks/getting-started/jss-server-install).
* Create a JSS app configuration (see `/sitecore/config` in any of the sample apps for a starting point) and deploy it to Sitecore's `/App_Config/Include`
* Run a test Layout Service request to the app: `http://myapp.dev.local/sitecore/api/layout/render/jss?item=/&sc_apikey={YOUR_API_KEY}`

### How to use (GraphQL)

* Follow the directions in the Quick Start to [install the Headless server components](/docs/client-frameworks/getting-started/jss-server-install).
* Follow the instructions in the [GraphQL API documentation](/docs/techniques/graphql/graphql-overview) to define a GraphQL endpoint
* Query away!

### How to use (SSC)

SSC is built in to Sitecore and requires no additional installations. Consult the SSC documentation for usage guidelines.