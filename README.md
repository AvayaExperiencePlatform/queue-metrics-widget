
# Queue Metrics Widget

## Description

This custom widget gives the ability to Agents to check the Metrics for a specific set of Queues & Attributes before transffering an engagement to another Queue.

## :warning: **Disclaimer**

> :bulb: This sample application is provided **for demonstration purposes only** and is not intended for production use. We assume no responsibility for any issues arising from its use.

---

## Technical Details

The widget primarily uses the `AXP Admin & Routing APIs` and the `Workspaces Widget Framework SDK`.

### Workspaces Widget Framework SDK
- `onAgentStateEvent`: Subscribe to changes in Agent's state (logged in, ready, not ready, etc.).
- `onAnyInteractionEvent`: Subscribe to any new Interaction on the agent's desktop.
- `getInteractionData()`: Obtain details of the current interaction.
- `getConfiguration().user`: Retrieve the full logged-in Agent configuration.

### Admin APIs
- [Authorization](https://developers.avayacloud.com/avaya-experience-platform/docs/how-to-authenticate-with-axp-apis#client-credentials-grant): Acquire an access token for API calls.
- [Get Queue Metrics](https://developers.avayacloud.com/avaya-experience-platform/reference/getmetricsrequestpriorityattributesoptional): Fetch Metrics for a specific Queue.
- [List Categories](https://developers.avayacloud.com/avaya-experience-platform/reference/listcategories): Retrieve Categories/Attributes for the tenant.
- [List Queues](https://developers.avayacloud.com/avaya-experience-platform/reference/listqueues): Get configured Queues for the tenant.

## Configuration & Installation

The widget consists of the `bundle.js` file and a backend component for authorization and Admin API requests proxying. Both components are not multi-tenanted and require individual deployment per tenant.

Pre-requisites include AXP Client Credentials `(CLIENT_ID and CLIENT_SECRET)` and AXP API Application Key `(AXP_API_APP_KEY)`. Node.js `v18.0+` is also necessary.

### Running the Backend Component
Refer to the AXP Proxy API build & deploy guide available [here](https://github.com/AvayaExperiencePlatform/axp-api-proxy).

### Building the Widget bundle.js File
The bundle.js file is built out of the react-app `(queue-metrics-widget)`


To build the `bundle.js` file:
- Navigate to `src/app/config.js` and update the configuration for your tenant:
```js
export default {
    env: {
        AXP_CLIENT_ID: "YOUR_AXP_CLIENT_ID",
        AXP_PROXY_BASE_URL: "https://your_server_fqdn_running_axp-proxy-api:3001",
        AXP_ACCOUNT_ID: "ABCDEF",
        AXP_API_APP_KEY: "your-secret-api-app-key"
    },
};
```
- Run `yarn install` to install dependencies.
- Run `npm run prod` to build the bundle.js file, it will be in the build/ folder.


## Dockerized Hosting

### Prerequisites
- Node.js version 18+.
- Docker & Docker Compose.
- SSL Certificate & Key.
- Upload `queue-metrics-widget.json` to Avaya Experience Platform Admin Portal -> Widget Management.

### Steps
1. Update `docker-compose-dev.yml` with SSL certificate paths.
2. Build and deploy the widget:
   ```sh
   yarn install
   npm run build
   docker-compose -f docker-compose-dev.yml up # add -d for background process
   ```
3. To apply changes, run `npm run build` and refresh workspaces.

If you've done everything correctly, it should look something like this (default without any changes).

![Widget Demo](./public/screenshot.png)

## Manual Hosting

### Hosting with NGINX
Serve the widget using any web server. Here is an NGINX configuration example:

```nginx
server {
    listen 8443 ssl;
    ssl_certificate /etc/nginx/cer.cer;
    ssl_certificate_key /etc/nginx/key.key;
    add_header Access-Control-Allow-Origin *;
    root /home/username/Projects/queue-metrics-widget/build; # Path to bundle.js file
    autoindex on;
}
```
