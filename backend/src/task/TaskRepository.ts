import AbstractTask from "./AbstractTask";

interface ITaskExecutor {
    execute: any;
}

interface ITask {
    executor: any;
    isRunning: boolean;
}

interface ITasks {
    [key: string]: ITask;
}

class TaskRepository {
    public static instance: TaskRepository;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new TaskRepository();
        }

        return this.instance;
    }

    public tasks: ITasks = {};

    public addTask(task: AbstractTask) {
        console.log(`adding task: ${task.getName()}`);
        this.tasks[task.getName()] = { executor: task, isRunning: false };
    }

    public start(name: string) {
        if (!this.tasks[name]) {
            return;
        }
        this.tasks[name].isRunning = true;
        this.tasks[name].executor.execute().then(() => {
            this.tasks[name].isRunning = false;
        });
    }

    public getTasks() {
        return Object.keys(this.tasks);
    }

    public execute(name: string): Promise<any> {
        if (!this.tasks[name]) {
            console.log(`Not found ${name} ,rejecting`);
            return Promise.reject(false);
        }
        console.log(`[task] Running ${name}`);
        return this.tasks[name].executor.execute().catch(() => Promise.resolve(true));
    }

    public scheduleAll() {
        Object.keys(this.tasks).forEach((taskKey: string) => {
            return this.tasks[taskKey].executor.schedule();
        });
    }
}

export default TaskRepository;
