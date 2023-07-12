import { changeTaskStatus, enqueue, removeFromQueue, saveResponseData } from "./modules/queue";
import { Queue } from "./types/Queue";
import { Task } from "./types/Task";
import { TaskStatus } from "./types/TaskStatus.enum";

async function executeTask(task: Task, activeQueue: Queue, postponedQueue: Queue, resolveChain: (value: unknown) => void) {
    enqueue(task, activeQueue);
    changeTaskStatus(task, TaskStatus.PENDING, activeQueue);
    const mutedPostponedQueue = removeFromQueue(task, postponedQueue);

    task.callback()
        .then(response => {
            changeTaskStatus(task, TaskStatus.FULLFILLED, activeQueue);
            saveResponseData(task, response, activeQueue);
            handleTaskExecutionRecursivelly(task, activeQueue, mutedPostponedQueue, resolveChain);

            const activePromissesPending = activeQueue.some(item => item.status !== TaskStatus.FULLFILLED);

            if (mutedPostponedQueue.length === 0 && !activePromissesPending) {
                resolveChain('Done.');
            }
        })
        .catch((e) => {
            console.error(`Attention! Something went wrong with one of the tasks`, e);
            changeTaskStatus(task, TaskStatus.REJECTED, activeQueue);
        });
}


async function handleTaskExecutionRecursivelly(
    task: Task,
    activeQueue: Queue,
    postponedQueue: Queue,
    resolveChain: (value: unknown) => void
) {
    const allPostponedPromisesWereExecuted = postponedQueue.length === 0;

    if (allPostponedPromisesWereExecuted) {
        return null;
    }
    
    for(let i: number = 0; i < postponedQueue.length; i++ ) {
        const postponedTask = postponedQueue[i];
        const postponedTaskDependsOnLastExecuted = postponedTask?.dependencies.includes(task.id as never);

        if (postponedTaskDependsOnLastExecuted) {
            
            const relatedTasksStillExecuting = activeQueue.map(item =>  {
                if (
                    postponedTask.dependencies.includes(item.id as never)
                    && item.status !== TaskStatus.FULLFILLED
                ) {
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


export async function startTaskExecution(tasks: Task[], activeQueue: Queue, postponedQueue: Queue) {

    let promiseChain = new Promise(resolveChain => {
        for(let i: number = 0; i < tasks.length; i++ ) {
            const currentTask = tasks[i];
            const taskHasNoDependencies = currentTask?.dependencies.length === 0;
            
            if (taskHasNoDependencies) {
                enqueue(currentTask, activeQueue);
                continue;
            }
    
            enqueue(currentTask, postponedQueue);
        }

        activeQueue.forEach(task => {
            executeTask(task, activeQueue, postponedQueue, resolveChain);
        });
    });

    return promiseChain;
}


export async function handleTaskExecution(tasks: Task[], activeQueue: Queue, postponedQueue: Queue) {
    const result = await startTaskExecution(tasks, activeQueue, postponedQueue)
        .then(result => {
            console.log(result);
        })
        .catch((e) => {
            console.error(e);
        });
    
    return result;
}