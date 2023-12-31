"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksMock = void 0;
exports.TasksMock = [
    {
        id: 'ID_A',
        callback: () => new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Callback A executed');
                resolve("ID_A resolved");
            }, 100);
        }),
        dependencies: [],
    },
    {
        id: 'ID_B',
        callback: () => new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Callback B executed');
                resolve("ID_B resolved");
            }, 200);
        }),
        dependencies: [],
    },
    {
        id: 'ID_C',
        callback: () => new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Callback C executed');
                resolve("ID_C resolved");
            }, 300);
        }),
        dependencies: [],
    },
    {
        id: 'ID_D',
        callback: () => new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Callback D executed');
                resolve("ID_D resolved");
            }, 400);
        }),
        dependencies: ['ID_A', 'ID_B'],
    },
    {
        id: 'ID_E',
        callback: () => new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Callback E executed');
                resolve("ID_E resolved");
            }, 500);
        }),
        dependencies: ['ID_D'],
    }
];
//# sourceMappingURL=tasksimmediate.mock.js.map