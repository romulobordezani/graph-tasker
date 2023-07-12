import { Queue } from "../../types/Queue";
import { Task } from "../../types/Task";
import { TaskStatus } from "../../types/TaskStatus.enum";

export function enqueue(task: Task, queue: Queue) {
    queue.push(task);
}


export function removeFromQueue(task: Task, queue: Queue) {
    const indexToRemove = queue.findIndex(queuedTask => queuedTask?.id === task.id);

    if (indexToRemove >= 0) {
        return queue.splice(indexToRemove + 1, 1);
    }

    return queue;
}


export function changeTaskStatus(task: Task, status: TaskStatus, queue: Queue) {
    const taskToChange = queue.find(queuedTask => queuedTask.id === task.id);
    taskToChange.status = status;
}


export function saveResponseData(task: Task, data: any, queue: Queue) {
    const taskToSaveData = queue.find(queuedTask => queuedTask.id === task.id);
    taskToSaveData.data = data;
}