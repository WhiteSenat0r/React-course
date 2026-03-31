import { ITodoStatus } from './iTodoStatus';
import { ITodoPriority } from './iTodoPriority';

export interface ITodo {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    priority: ITodoPriority;
    status: ITodoStatus;
}
