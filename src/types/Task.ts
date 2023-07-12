import { TaskStatus } from "./TaskStatus.enum";

export type TaskCallback = () => Promise<any>;

export interface Task {
    id: string,
    callback: TaskCallback,
    dependencies: string[] | [],
    status?: TaskStatus,
    data?: any
}