import {ITodoStatus} from "./iTodoStatus.ts";

export interface ITodo {
    id: string;
    title: string;
    description?: string;
    status: ITodoStatus;
    createdAt: string;
}
