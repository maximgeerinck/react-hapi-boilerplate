import Server from "./server";

Server.start(parseInt(process.env.PORT, 10) || undefined, process.env.NODE_ENV);
