"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksMock = void 0;
exports.TasksMock = [
    {
        id: 'ID_A',
        callback: () => new Promise((resolve) => {
            console.log('Callback A executed');
            resolve("ID_A resolved");
        }),
        dependencies: [],
    },
    {
        id: 'ID_B',
        callback: () => new Promise((resolve) => {
            console.log('Callback B executed');
            resolve("ID_A resolved");
        }),
        dependencies: [],
    },
    {
        id: 'ID_C',
        callback: () => new Promise((resolve) => {
            console.log('Callback C executed');
            resolve("ID_A resolved");
        }),
        dependencies: [],
    },
    {
        id: 'ID_D',
        callback: () => new Promise((resolve) => {
            console.log('Callback D executed');
            resolve("ID_A resolved");
        }),
        dependencies: ['ID_A', 'ID_B'],
    },
    {
        id: 'ID_E',
        callback: () => new Promise((resolve) => {
            console.log('Callback E executed');
            resolve("ID_A resolved");
        }),
        dependencies: ['ID_D'],
    }
];
//# sourceMappingURL=tasks-immediate.mock.js.map