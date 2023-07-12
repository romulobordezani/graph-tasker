"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_immediate_mock_js_1 = require("./tasks-immediate.mock.js");
const handleTaskExecution_js_1 = require("./handleTaskExecution.js");
const activeQueue = [];
const postponedQueue = [];
(0, handleTaskExecution_js_1.handleTaskExecution)(tasks_immediate_mock_js_1.TasksMock, activeQueue, postponedQueue);
//# sourceMappingURL=index.js.map