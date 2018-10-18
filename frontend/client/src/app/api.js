import superagent from "superagent";
import superagentJsonapify from "superagent-jsonapify";
import { BASE_PATH } from "./constants";

superagentJsonapify(superagent);

export const buildPostRequest = path => new PostRequest(path);
export const buildGetRequest = path => new GetRequest(path);
export const buildDeleteRequest = path => new DeleteRequest(path);
export const buildPutRequest = path => new PutRequest(path);

class Request {
    constructor(path, token) {
        this.path = BASE_PATH + path;
        this.token = token;
        this.settings = {
            response: 10000,
            deadline: 60000,
        };
        this.retries = 0;
    }

    auth(token) {
        this.request.set("Authorization", token);
        return this;
    }

    onTimeout(func, timeout = 3000) {
        this._onTimeout = func;
        this.settings.response = timeout;
        return this;
    }

    retry() {
        this.retries++;
        if (this.retries < 5) {
            this.send();
        } else {
            this._onTimeout();
        }
    }

    send(data) {
        return new Promise((resolve, reject) => {
            this.request.send(data).end((err, res) => {
                // check if validation error
                if (
                    res.body &&
                    res.body.error &&
                    (res.body.error === "E_VALIDATION" || res.body.validation !== undefined)
                ) {
                    return reject(res.body.validation);
                }

                // check general error
                if (err) {
                    return reject(res.body || err);
                }

                if (!res.body) return reject(res);
                return resolve(res.body);
            });
        });
    }
}

class GetRequest extends Request {
    constructor(path) {
        super(path);
        this.request = superagent.get(this.path).timeout(this.settings);
    }

    createRequest() {
        this.request = superagent.get(this.path).timeout(this.settings);
        if (this.token) this.request = this.request.set("Authorization", this.token);
        return this.request;
    }
}

class DeleteRequest extends Request {
    constructor(path) {
        super(path);
        this.request = superagent.delete(this.path).timeout(this.settings);
    }
}

class PostRequest extends Request {
    constructor(path) {
        super(path);
        this.request = superagent.post(this.path).timeout(this.settings);
    }
}

class PutRequest extends Request {
    constructor(path) {
        super(path);
        this.request = superagent.put(this.path).timeout(this.settings);
    }
}