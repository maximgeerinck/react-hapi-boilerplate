import request from "supertest";

import UserService from "../../build/user/UserService";
// import User from "../../build/user/User";

import test, { USER_EMAIL, USER_PASS } from "../index";

// https://github.com/avajs/ava/blob/master/docs/recipes/endpoint-testing.md

test("signup:Success", async t => {
    t.plan(2);

    const res = await request(makeApp())
        .post("/user/create")
        .send({ email: "test2@test.com", password: USER_PASS });

    t.is(res.status, 200);
    t.is(res.body.email, "test2@test.com");
});

test("authenticate:Success", async t => {
    t.plan(2); // 2 assertions should be completed

    const res = await request(makeApp())
        .post("/authenticate")
        .send({ email: USER_EMAIL, password: USER_PASS });

    AUTH_TOKEN = res.body.token;

    t.is(res.status, 200);
    t.not(res.body.token, null);
});

test("authenticate:invalid_password", async t => {
    t.plan(3);

    const res = await request(makeApp())
        .post("/authenticate")
        .send({ email: USER_EMAIL, password: "bla" });

    AUTH_TOKEN = res.body.token;

    t.is(res.status, 401);
    t.is(res.body.error, "Unauthorized");
    t.is(res.body.message, "E_INVALID_CREDENTIALS");
});

test("authenticate:invalid_email", async t => {
    t.plan(3);

    const res = await request(makeApp())
        .post("/authenticate")
        .send({ email: "bla", password: USER_PASS });

    AUTH_TOKEN = res.body.token;

    t.is(res.status, 401);
    t.is(res.body.error, "Unauthorized");
    t.is(res.body.message, "E_INVALID_CREDENTIALS");
});

test("user_detail:Success", async t => {
    t.plan(3);

    const res = await request(makeApp())
        .get("/user/me")
        .set("Authorization", AUTH_TOKEN);

    t.is(res.status, 200);
    t.is(res.body.email, USER_EMAIL);
    t.is(res.body.enabled, true);
});

test("password:reset", async t => {
    t.plan(2);

    const EMAIL = "test@test.com";
    const token = await UserService.requestToken(EMAIL);
    const res = await request(makeApp())
        .post("/reset")
        .send({ email: EMAIL, token: token, password: "newpass" });

    t.is(res.status, 200);
    t.is(res.body.success, true);
});

test("password:forgot", async t => {
    t.plan(1);
    const res = await request(makeApp())
        .post("/forgot")
        .send({ email: USER_EMAIL });

    t.is(res.status, 200);
});
