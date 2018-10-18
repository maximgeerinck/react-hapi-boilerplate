import config from "./config";
import routes from "./routes";

import * as Boom from "boom";
import { Request, ResponseToolkit, Server, ServerOptions } from "hapi";
import * as Path from "path";
import { __DEV__ } from "./constants";
import { IUser } from "./user/User";
import UserService from "./user/UserService";
import JoiValidationErrorAdapter from "./utils/JoiValidation";

const JWT_SECRET = config.authentication.jwt.secret;

const createServerConfigs = (port: number, host: string = "0.0.0.0"): ServerOptions => ({
    address: host,
    port,
    debug: __DEV__ ? { log: ["error"] } : false,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, "../../public")
        },
        cors: {
            origin: config.server.cors_client_origins,
            headers: config.server.cors_headers,
            credentials: config.server.cors_credentials,
            additionalHeaders: ["Origin"]
        },
        state: {
            parse: false,
            failAction: "log"
        },
        validate: {
            failAction: (request: Request, h: ResponseToolkit, err: any) => {

                if (!err.details) {
                    return;
                }

                const adapter = new JoiValidationErrorAdapter(err.details);

                // var formattedErrors = FormatErrors(error);
                const error: any = Boom.badRequest();
                error.reformat();
                error.output.payload.error = "E_VALIDATION";
                error.output.payload.validation = adapter.convert();

                return error;
            },
            options: {
                abortEarly: false // lets JOI go over all errors
            }
        }
    }
});

interface IDecodedUser {
    user: {
        id: string;
        email: string;
    };
    iat: number;
}

const validate = async (decoded: IDecodedUser, request: any, callback: any) => {
    try {
        const user = await UserService.findOneById(decoded.user.id);
        return { isValid: true, credentials: user };
    } catch (ex) {
        console.log(ex);
    }
};

export let createServer = async (port: number, host: string = "0.0.0.0"): Promise<Server> => {

    const server = new Server(createServerConfigs(port, host));

    // load plugins, inert is file server
    await server.register([require("hapi-auth-jwt2"), require("inert")]);

    // load auth strategy (true => auth on all routes!)
    // ex. header: Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
    server.auth.strategy("jwt", "jwt", {
        key: JWT_SECRET,
        validate,
        verifyOptions: { algorithms: ["HS256"] }
    });

    server.auth.default("jwt");

    // load routes
    console.log("registered routes");
    if (__DEV__) {
        routes.map((route: any) => console.log(`${route.method}: ${route.path}`));
    }

    // assets
    server.route({
        method: "GET",
        path: "/assets/{param*}",
        handler: {
            directory: {
                path: Path.join(__dirname, "..", "public")
            }
        },
        options: {
            auth: false,
            cache: {
                expiresIn: 60 * 60,
                privacy: "public"
            }
        }
    });

    server.route(routes);

    return server;
};
