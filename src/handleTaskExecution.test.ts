import { TasksMock } from './tasks.mock';
import { handleTaskExecution } from './handleTaskExecution';
import { Queue } from './types/Queue';

describe('Graph Tasker', () => {

  test('should execute all chained promises', async () => {
    expect.assertions(1);
    const activeQueue: Queue = [];
    const postponedQueue: Queue = [];

    const result = await handleTaskExecution(TasksMock, activeQueue, postponedQueue);

    return expect(result).toBe('peanut butter');
  });
});