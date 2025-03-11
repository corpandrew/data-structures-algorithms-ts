import {IPriorityQueue} from "../../data-structures/queue/priority-queue/types.ts";
import {ITaskScheduler} from "./types.ts";
import {PriorityQueue} from "../../data-structures/queue/priority-queue/priorityQueue.ts";

export class TaskScheduler implements ITaskScheduler {

    private readonly taskQueue: IPriorityQueue<string>;

    constructor() {
        this.taskQueue = new PriorityQueue<string>();
    }

    getTaskQueue(): IPriorityQueue<string> {
        return this.taskQueue;
    }

    addTask(taskName: string, priority: number): void {
        this.taskQueue.enqueue(taskName, priority);
    }

    getNextTask(): string | undefined {
        return this.taskQueue.dequeue();
    }

    peekNextTask(): string | undefined {
        return this.taskQueue.peek();
    }

    getTaskCount(): number {
        return this.taskQueue.size();
    }

    isTaskQueueEmpty(): boolean {
        return this.taskQueue.isEmpty();
    }

    clearTaskQueue(): void {
        this.taskQueue.clear();
    }

}