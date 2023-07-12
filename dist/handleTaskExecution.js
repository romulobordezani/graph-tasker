"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTaskExecution = exports.startTaskExecution = void 0;
const queue_1 = require("./modules/queue");
const TaskStatus_enum_1 = require("./types/TaskStatus.enum");
async function executeTask(task, activeQueue, postponedQueue, resolveChain) {
    (0, queue_1.enqueue)(task, activeQueue);
    (0, queue_1.changeTaskStatus)(task, TaskStatus_enum_1.TaskStatus.PENDING, activeQueue);
    const mutedPostponedQueue = (0, queue_1.removeFromQueue)(task, postponedQueue);
    task.callback()
        .then(response => {
        (0, queue_1.changeTaskStatus)(task, TaskStatus_enum_1.TaskStatus.FULLFILLED, activeQueue);
        (0, queue_1.saveResponseData)(task, response, activeQueue);
        handleTaskExecutionRecursivelly(task, activeQueue, mutedPostponedQueue, resolveChain);
        const activePromissesPending = activeQueue.some(item => item.status !== TaskStatus_enum_1.TaskStatus.FULLFILLED);
        if (mutedPostponedQueue.length === 0 && !activePromissesPending) {
            resolveChain('Done.');
        }
    })
        .catch((e) => {
        console.error(`Attention! Something went wrong with one of the tasks`, e);
        (0, queue_1.changeTaskStatus)(task, TaskStatus_enum_1.TaskStatus.REJECTED, activeQueue);
    });
}
async function handleTaskExecutionRecursivelly(task, activeQueue, postponedQueue, resolveChain) {
    const allPostponedPromisesWereExecuted = postponedQueue.length === 0;
    if (allPostponedPromisesWereExecuted) {
        return null;
    }
    for (let i = 0; i < postponedQueue.length; i++) {
        const postponedTask = postponedQueue[i];
        const postponedTaskDependsOnLastExecuted = postponedTask?.dependencies.includes(task.id);
        if (postponedTaskDependsOnLastExecuted) {
            const relatedTasksStillExecuting = activeQueue.map(item => {
                if (postponedTask.dependencies.includes(item.id)
                    && item.status !== TaskStatus_enum_1.TaskStatus.FULLFILLED) {
                    return item;
                }
            }).filter(item => item);
            const allDependentTasksWereExecutedSucessfully = relatedTasksStillExecuting.length === 0;
            if (allDependentTasksWereExecutedSucessfully) {
                await executeTask(postponedTask, activeQueue, postponedQueue, resolveChain);
            }
        }
    }
    return activeQueue;
}
async function startTaskExecution(tasks, activeQueue, postponedQueue) {
    let promiseChain = new Promise(resolveChain => {
        for (let i = 0; i < tasks.length; i++) {
            const currentTask = tasks[i];
            const taskHasNoDependencies = currentTask?.dependencies.length === 0;
            if (taskHasNoDependencies) {
                (0, queue_1.enqueue)(currentTask, activeQueue);
                continue;
            }
            (0, queue_1.enqueue)(currentTask, postponedQueue);
        }
        activeQueue.forEach(task => {
            executeTask(task, activeQueue, postponedQueue, resolveChain);
        });
    });
    return promiseChain;
}
exports.startTaskExecution = startTaskExecution;
async function handleTaskExecution(tasks, activeQueue, postponedQueue) {
    const result = await startTaskExecution(tasks, activeQueue, postponedQueue)
        .then(result => {
        console.log(result);
    })
        .catch((e) => {
        console.error(e);
    });
    return result;
}
exports.handleTaskExecution = handleTaskExecution;
//# sourceMappingURL=handleTaskExecution.js.map