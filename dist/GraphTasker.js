"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTaskExecution = void 0;
const queue_1 = require("./modules/queue");
const TaskStatus_enum_1 = require("./types/TaskStatus.enum");
async function handleTaskExecution(tasks, activeQueue, postponedQueue) {
    for (let i = 0; i < tasks.length; i++) {
        const currentTask = tasks[i];
        const taskHasNoDependencies = currentTask?.dependencies.length === 0;
        if (taskHasNoDependencies) {
            (0, queue_1.enqueue)(currentTask, activeQueue);
            currentTask.callback()
                .then(response => {
                (0, queue_1.changeTaskStatus)(currentTask, TaskStatus_enum_1.TaskStatus.FULLFILLED, activeQueue);
                console.log('Callback executed', response, currentTask);
            })
                .catch((e) => {
                console.error(e);
                (0, queue_1.changeTaskStatus)(currentTask, TaskStatus_enum_1.TaskStatus.REJECTED, activeQueue);
            });
            continue;
        }
        (0, queue_1.enqueue)(currentTask, postponedQueue);
    }
    console.log(postponedQueue);
    /* if (besideQueue.length) {
        // TaskRunner(besideQueue);
    } */
    return activeQueue;
}
exports.handleTaskExecution = handleTaskExecution;
//# sourceMappingURL=GraphTasker.js.map