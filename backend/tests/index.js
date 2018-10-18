"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const mockgoose_1 = require("mockgoose");
const supertest_1 = require("supertest");
const db_1 = require("../src/db");
const server_1 = require("../src/server");
let server = null;
let db = null;
let AUTH_TOKEN = null;
ava_1.default.before((t) => __awaiter(this, void 0, void 0, function* () {
    const s = yield server_1.createServer(8200, "0.0.0.0");
    server = s.listener;
    const mockgoose = new mockgoose_1.Mockgoose(db_1.default);
    yield mockgoose.prepareStorage().then(() => {
        const URI = "mongodb://mongo/discovery";
        db = db_1.default.connect(URI);
    });
    yield supertest_1.default(exports.makeApp())
        .post("/user/create")
        .send({ email: exports.USER_EMAIL, password: exports.USER_PASS });
    const res = yield supertest_1.default(exports.makeApp())
        .post("/authenticate")
        .send({ email: exports.USER_EMAIL, password: exports.USER_PASS });
    AUTH_TOKEN = res.body.token;
}));
ava_1.default.after.always("cleanup", (t) => {
    db.disconnect();
});
exports.USER_EMAIL = "test@test.com";
exports.USER_PASS = "test123";
exports.getAuth = () => AUTH_TOKEN;
exports.makeApp = () => server;
exports.default = ava_1.default;
