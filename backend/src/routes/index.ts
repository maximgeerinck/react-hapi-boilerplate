import * as fs from "fs";
import * as Hapi from "hapi";
import * as path from "path";

let routes: Hapi.ServerRoute[] = [];

fs.readdirSync(__dirname).forEach((file: any) => {
    // If its the current file ignore it
    if (file === "index.js" || file.endsWith(".ts")) {
        return;
    }

    // Prepare empty object to store module
    const mod = {};

    // Store module with its name (from filename) and validate
    const routeConfig: Hapi.ServerRoute[] = require(path.join(__dirname, file));
    const validatedRouteConfig: Hapi.ServerRoute[] = [];

    for (const config of routeConfig) {
        if (!config.method || !config.path || !config.handler) {
            return;
        }
        validatedRouteConfig.push(config);
    }

    routes = routes.concat(validatedRouteConfig);
});

export default routes;
