import * as schedule from "node-schedule";

export default abstract class Task {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public abstract execute(): Promise<any>;
    public abstract schedule(): void;

    public scheduleJob(time: string) {
        schedule.scheduleJob(time, () => this.execute());
    }

    public getName(): string {
        return this.name;
    }

    public log(message: string) {
        console.log(`[${this.getName()}] ${message}`);
    }
}
