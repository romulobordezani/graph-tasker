import { Task } from './types/Task.js';

export const TasksMock: Task[] = [
    {
        id: 'ID_A',
        callback: () => new Promise<any>(
            (resolve) => {
                console.log('Callback A executed');
                resolve("ID_A resolved");
            }
        ),
        dependencies: [],
    },
    {
        id: 'ID_B',
        callback: () => new Promise<any>(
            (resolve) => {
                console.log('Callback B executed');
                resolve("ID_A resolved");
            }
        ),
        dependencies: [],
    },
    {
        id: 'ID_C',
        callback: () => new Promise<any>(
            (resolve) => {
                console.log('Callback C executed');
                resolve("ID_A resolved");
            }
        ),
        dependencies: [],
    },
    {
        id: 'ID_D',
        callback: () => new Promise<any>(
            (resolve) => {
                console.log('Callback D executed');
                resolve("ID_A resolved");
            }
        ),
        dependencies: ['ID_A', 'ID_B'],
    },
    {
        id: 'ID_E',
        callback: () => new Promise<any>(
            (resolve) => {
                console.log('Callback E executed');
                resolve("ID_A resolved");
            }
        ),
        dependencies: ['ID_D' ],
    } 
]