import {IPriorityQueue} from "../../data-structures/queue/priority-queue/types.ts";

/**
 * Interface for a Task Scheduler Application built using a Priority Queue.
 * Defines the contract for an application that schedules and retrieves tasks based on priority.
 * @interface ITaskScheduler
 */
export interface ITaskScheduler {
    /**
     * Gets the underlying Priority Queue data structure used by the Task Scheduler Application.
     * This is primarily for testing and inspection, not typically part of the core application interface.
     * @returns {IPriorityQueue<string>} The Priority Queue instance, storing task names as strings.
     * @memberof ITaskScheduler
     * @internal - Marked as internal as it's mainly for testing
     */
    getTaskQueue(): IPriorityQueue<string>;

    /**
     * Adds a task to the Task Scheduler with a given priority.
     * @param {string} taskName The name or description of the task.
     * @param {number} priority The priority of the task. Lower numbers typically indicate higher priority.
     * @returns {void}
     * @memberof ITaskScheduler
     */
    addTask(taskName: string, priority: number): void;

    /**
     * Gets and removes the next task to be executed (the task with the highest priority) from the Task Scheduler.
     * @returns {string | undefined} The name of the next task with the highest priority, or undefined if the queue is empty.
     * @memberof ITaskScheduler
     */
    getNextTask(): string | undefined;

    /**
     * Returns the name of the next task with the highest priority without removing it from the Task Scheduler.
     * @returns {string | undefined} The name of the next task with the highest priority, or undefined if the queue is empty.
     * @memberof ITaskScheduler
     */
    peekNextTask(): string | undefined;

    /**
     * Gets the current number of tasks in the Task Scheduler Queue.
     * @returns {number} The number of tasks in the queue.
     * @memberof ITaskScheduler
     */
    getTaskCount(): number;

    /**
     * Checks if the Task Queue is empty.
     * @returns {boolean} True if the task queue is empty, false otherwise.
     * @memberof ITaskScheduler
     */
    isTaskQueueEmpty(): boolean;

    /**
     * Clears all tasks from the Task Scheduler Queue.
     * @returns {void}
     * @memberof ITaskScheduler
     */
    clearTaskQueue(): void;
}