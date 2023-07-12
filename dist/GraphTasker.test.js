import { TasksMock } from './tasks.mock';
import { GraphTasker } from './GraphTasker';
describe('Graph Tasker', () => {
    test('should execute all promises', () => {
        expect(GraphTasker(TasksMock)).toBe(3);
    });
});
//# sourceMappingURL=GraphTasker.test.js.map