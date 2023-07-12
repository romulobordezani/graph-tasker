"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveResponseData = exports.changeTaskStatus = exports.removeFromQueue = exports.enqueue = void 0;
function enqueue(task, queue) {
    queue.push(task);
}
exports.enqueue = enqueue;
function removeFromQueue(task, queue) {
    const indexToRemove = queue.findIndex(queuedTask => queuedTask?.id === task.id);
    if (indexToRemove >= 0) {
        return queue.splice(indexToRemove + 1, 1);
    }
    return queue;
}
exports.removeFromQueue = removeFromQueue;
function changeTaskStatus(task, status, queue) {
    const taskToChange = queue.find(queuedTask => queuedTask.id === task.id);
    taskToChange.status = status;
}
exports.changeTaskStatus = changeTaskStatus;
function saveResponseData(task, data, queue) {
    const taskToSaveData = queue.find(queuedTask => queuedTask.id === task.id);
    taskToSaveData.data = data;
}
exports.saveResponseData = saveResponseData;
//# sourceMappingURL=index.js.map