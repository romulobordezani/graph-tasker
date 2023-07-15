"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_immediate_mock_js_1 = require("./tasks-immediate.mock.js");
const tasks_mock_js_1 = require("./tasks.mock.js");
const handleTaskExecution_js_1 = require("./handleTaskExecution.js");
const activeQueue = [];
const postponedQueue = [];
const run = async () => {
    await (0, handleTaskExecution_js_1.handleTaskExecution)(tasks_mock_js_1.TasksMock, activeQueue, postponedQueue);
    await (0, handleTaskExecution_js_1.handleTaskExecution)(tasks_immediate_mock_js_1.TasksMock, activeQueue, postponedQueue);
};
run();
//# sourceMappingURL=index.js.map