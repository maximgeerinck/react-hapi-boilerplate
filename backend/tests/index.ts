import test from "ava";
import { MongoDBServer } from "mongomem";
import { Mockgoose } from "mockgoose";

import request from "supertest";
import mongoose from "../src/db";
import { createServer } from "../src/server";

// for server
import routes from "../src/routes";
import config from "../src/config";

let server = null;
let db = null;
let AUTH_TOKEN = null;

test.before(async (t) => {
    // create server
    const s = await createServer(8200, "0.0.0.0");
    server = s.listener;

    // mock database
    const mockgoose = new Mockgoose(mongoose);
    await mockgoose.prepareStorage().then(() => {
        const URI = "mongodb://mongo/discovery";
        db = mongoose.connect(URI);
    });

    // create test user
    await request(makeApp())
        .post("/user/create")
        .send({ email: USER_EMAIL, password: USER_PASS });

    // get its login token
    const res = await request(makeApp())
        .post("/authenticate")
        .send({ email: USER_EMAIL, password: USER_PASS });

    AUTH_TOKEN = res.body.token;
});
test.after.always("cleanup", (t) => {
    db.disconnect();
});

export const USER_EMAIL = "test@test.com";
export const USER_PASS = "test123";

export const getAuth = () => AUTH_TOKEN;
export const makeApp = () => server;

export default test;
