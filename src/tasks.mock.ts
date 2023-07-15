import { Task } from './types/Task.js';

export const TasksMock: Task[] = [
    {
        id: 'ID_A',
        callback: () => new Promise<any>(
            (resolve, reject) => {
                setTimeout(() => {
                    console.log('Callback A executed');
                    resolve("ID_A resolved");
                }, 1000);
            }
        ),
        dependencies: [],
    },
    {
        id: 'ID_B',
        callback: () => new Promise<any>(
            (resolve, reject) => {
                setTimeout(() => {
                    console.log('Callback B executed');
                    resolve("ID_B resolved");
                }, 2000);
            }
        ),
        dependencies: [],
    },
    {
        id: 'ID_C',
        callback: () => new Promise<any>(
            (resolve, reject) => {
                setTimeout(() => {
                    console.log('Callback C executed');
                    resolve("ID_C resolved");
                }, 3000);
            }
        ),
        dependencies: [],
    },
    {
        id: 'ID_D',
        callback: () => new Promise<any>(
            (resolve, reject) => {
                setTimeout(() => {
                    console.log('Callback D executed');
                    resolve("ID_D resolved");
                }, 4000);
            }
        ),
        dependencies: ['ID_A', 'ID_B'],
    },
    {
        id: 'ID_E',
        callback: () => new Promise<any>(
            (resolve, reject) => {
                setTimeout(() => {
                    console.log('Callback E executed');
                    resolve("ID_E resolved");
                }, 5000);
            }
        ),
        dependencies: ['ID_D' ], 
    } 
]