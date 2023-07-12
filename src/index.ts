import { TasksMock } from './tasks-immediate.mock.js';
import { handleTaskExecution } from './handleTaskExecution.js';
import { Queue } from './types/Queue.js';

const activeQueue: Queue = [];
const postponedQueue: Queue = [];

handleTaskExecution(TasksMock, activeQueue, postponedQueue);
