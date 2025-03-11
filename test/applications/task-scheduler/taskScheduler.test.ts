import { describe, it, expect, beforeEach } from 'vitest';
import {TaskScheduler} from "../../../src/applications/task-scheduler/taskScheduler";
import {ITaskScheduler} from "../../../src/applications/task-scheduler/types";

describe('TaskScheduler', () => {
    let taskSchedulerApp: ITaskScheduler;

    beforeEach(() => {
        taskSchedulerApp = new TaskScheduler();
    });

    describe('addTask', () => {
        it('should add a single task to the task queue', () => {
            taskSchedulerApp.addTask('Task 1', 3);
            expect(taskSchedulerApp.getTaskCount()).toBe(1);
            expect(taskSchedulerApp.isTaskQueueEmpty()).toBe(false);
        });

        it('should add multiple tasks to the task queue', () => {
            taskSchedulerApp.addTask('Task 1', 3);
            taskSchedulerApp.addTask('Task 2', 1);
            taskSchedulerApp.addTask('Task 3', 2);
            expect(taskSchedulerApp.getTaskCount()).toBe(3);
        });
    });

    describe('getNextTask', () => {
        beforeEach(() => {
            taskSchedulerApp.addTask('Low Priority Task', 3);
            taskSchedulerApp.addTask('High Priority Task', 1);
            taskSchedulerApp.addTask('Medium Priority Task', 2);
        });

        it('should get and remove the highest priority task (Min-PriorityQueue - lower number is higher priority)', () => {
            expect(taskSchedulerApp.getNextTask()).toBe('High Priority Task'); // Priority 1
            expect(taskSchedulerApp.getNextTask()).toBe('Medium Priority Task'); // Priority 2
            expect(taskSchedulerApp.getNextTask()).toBe('Low Priority Task'); // Priority 3
            expect(taskSchedulerApp.getNextTask()).toBeUndefined(); // Queue should be empty now
            expect(taskSchedulerApp.getTaskCount()).toBe(0);
        });

        it('should return undefined when getting next task from an empty queue', () => {
            const emptyScheduler = new TaskScheduler();
            expect(emptyScheduler.getNextTask()).toBeUndefined();
        });

        it('should decrease task count after getting next task', () => {
            taskSchedulerApp.getNextTask();
            expect(taskSchedulerApp.getTaskCount()).toBe(2);
            taskSchedulerApp.getNextTask();
            expect(taskSchedulerApp.getTaskCount()).toBe(1);
            taskSchedulerApp.getNextTask();
            expect(taskSchedulerApp.getTaskCount()).toBe(0);
        });
    });

    describe('peekNextTask', () => {
        beforeEach(() => {
            taskSchedulerApp.addTask('Low Priority Task', 3);
            taskSchedulerApp.addTask('High Priority Task', 1);
            taskSchedulerApp.addTask('Medium Priority Task', 2);
        });

        it('should peek at the highest priority task without removing it', () => {
            expect(taskSchedulerApp.peekNextTask()).toBe('High Priority Task'); // Highest priority task
            expect(taskSchedulerApp.getTaskCount()).toBe(3); // Size should remain the same after peek
        });

        it('should return undefined when peeking at an empty queue', () => {
            const emptyScheduler = new TaskScheduler();
            expect(emptyScheduler.peekNextTask()).toBeUndefined();
        });
    });

    describe('getTaskCount and isTaskQueueEmpty', () => {
        it('should be empty initially', () => {
            expect(taskSchedulerApp.isTaskQueueEmpty()).toBe(true);
            expect(taskSchedulerApp.getTaskCount()).toBe(0);
        });

        it('should not be empty after adding tasks', () => {
            taskSchedulerApp.addTask('Task 1', 3);
            expect(taskSchedulerApp.isTaskQueueEmpty()).toBe(false);
            expect(taskSchedulerApp.getTaskCount()).toBe(1);
            taskSchedulerApp.addTask('Task 2', 1);
            expect(taskSchedulerApp.getTaskCount()).toBe(2);
        });

        it('should be empty after adding and getting all tasks', () => {
            taskSchedulerApp.addTask('Task 1', 3);
            taskSchedulerApp.getNextTask();
            expect(taskSchedulerApp.isTaskQueueEmpty()).toBe(true);
            expect(taskSchedulerApp.getTaskCount()).toBe(0);
        });
    });

    describe('clearTaskQueue (Optional)', () => {
        it('should clear all tasks from the task queue', () => {
            taskSchedulerApp.addTask('Task 1', 3);
            taskSchedulerApp.addTask('Task 2', 1);
            taskSchedulerApp.clearTaskQueue?.(); // Optional method call - use ?. to avoid error if not implemented
            expect(taskSchedulerApp.isTaskQueueEmpty()).toBe(true);
            expect(taskSchedulerApp.getTaskCount()).toBe(0);
            expect(taskSchedulerApp.peekNextTask()).toBeUndefined();
            expect(taskSchedulerApp.getNextTask()).toBeUndefined();
        });

        it('should clear an already empty task queue (no error)', () => {
            const emptyScheduler = new TaskScheduler();
            emptyScheduler.clearTaskQueue?.(); // Clear already empty queue
            expect(emptyScheduler.isTaskQueueEmpty()).toBe(true); // Should remain empty
            expect(emptyScheduler.getTaskCount?.()).toBe(0); // Size should remain 0
        });
    });
});