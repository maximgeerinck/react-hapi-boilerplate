import * as fs from "fs";

const defaultEnv = "dev";
const allowed = ["dev", "stag", "prod", "test"];

let processArg = process.argv[2];
let nodeEnv = process.env.NODE_ENV;

if (allowed.indexOf(processArg) === -1) {
    processArg = undefined;
}

if (allowed.indexOf(nodeEnv) === -1) {
    nodeEnv = undefined;
}

export interface IDatabaseConnectionConfiguration {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
export interface IDatabaseConfiguration {
    connection: IDatabaseConnectionConfiguration;
    client: string;
}

export interface IRedisConfiguration {
    password: string;
}

export interface IServerConfiguration {
    ip: string;
    port: number;
    cors_client_origins: string[];
    cors_headers: string[];
    cors_credentials: boolean;
}

export interface ILanguageConfiguration {
    fallback: string;
}

export interface IAssetsConfiguration {
    public_dir: string;
}

export interface IJwtConfiguration {
    secret: string;
}
export interface IAuthenticationConfiguration {
    jwt: IJwtConfiguration;
}
export interface IMailConfiguration {
    host: string;
    port: number;
    username: string;
    password: string;
}

export interface IAPIConfiguration {
    [key: string]: {
        apiKey: string;
    };
}

export interface IConfig {
    database: IDatabaseConfiguration;
    authentication: IAuthenticationConfiguration;
    redis: IRedisConfiguration;
    server: IServerConfiguration;
    languages: ILanguageConfiguration;
    assets: IAssetsConfiguration;
    mail: IMailConfiguration;
    apis: IAPIConfiguration;
}

// Set environment

const configPath = (env: string) => `../../config/app_${env}`;
let env = processArg || nodeEnv || defaultEnv;

if (!fs.existsSync(configPath(env))) {
    console.log(`${env} doesn't exist, resorting to default dev`);
    env = "dev";
}

const config: IConfig = require(configPath(env)) as IConfig;
console.log(`loading app_${processArg || nodeEnv || defaultEnv}`);
export default config;
