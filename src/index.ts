import { TasksMock as TaskMockImmediate  } from './tasks-immediate.mock.js';
import { TasksMock } from './tasks.mock.js';
import { handleTaskExecution } from './handleTaskExecution.js';
import { Queue } from './types/Queue.js';

const activeQueue: Queue = [];
const postponedQueue: Queue = [];

const run = async () => {
    await handleTaskExecution(TasksMock, activeQueue, postponedQueue);
    await handleTaskExecution(TaskMockImmediate, activeQueue, postponedQueue);
}

run();