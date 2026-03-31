import { ITodoStatus } from "./iTodoStatus.ts";

export interface ITodo {
    id: number;
    title: string;
    description?: string;
    status: ITodoStatus;
}
