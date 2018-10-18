import { __DEV__ } from "./constants";
import mongoose, { URI } from "./db";
import { createServer } from "./server";
import TaskRepository from "./task/TaskRepository";

const main = async () => {
    mongoose.connect(URI);

    const taskRepository = TaskRepository.getInstance();

    if (!__DEV__) {
        taskRepository.scheduleAll();
    }

    const server = await createServer(5000, "0.0.0.0");
    await server.start();
    console.log(`Server running at: ${server.info.uri} (${__DEV__ ? "development" : "production"})`);
};

function init() {
    try {
        main();
    } catch (ex) {
        console.log(ex);
        console.log(ex.message);
    }
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();
