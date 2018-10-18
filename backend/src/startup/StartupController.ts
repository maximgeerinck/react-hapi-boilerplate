import * as Hapi from "hapi";

class StartupController {

    /**
     * Provides a list of startups
     */
    public async index() {
        throw new Error("NOT_IMPLEMENTED");
    }

    /**
     * Returns all files from a startup
     */
    public async files() {
        throw new Error("NOT_IMPLEMENTED");
    }
    /**
     * Authenticated request
     * Adds a file to the startups page
     */
    public async addFile(req: Hapi.Request) {
        throw new Error("NOT_IMPLEMENTED");
    }

    /**
     * Removes a file from a startup page
     */
    public async removeFile(req: Hapi.Request) {
        throw new Error("NOT_IMPLEMENTED");
    }

}

export default new StartupController();
