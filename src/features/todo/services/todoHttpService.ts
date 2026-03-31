import HttpService from "../../../shared/services/http/httpService.ts";
import { ITodo } from "../interfaces/iTodo.ts";
import { ITodoStatus } from "../interfaces/iTodoStatus.ts";
import { ITodoPriority } from "../interfaces/iTodoPriority.ts";

const STORAGE_KEY = 'todos_data';

// Mock data initialization
const initializeMockData = (): ITodo[] => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        return JSON.parse(storedData);
    }

    const initialTodos: ITodo[] = [
        {
            id: 1,
            title: 'Complete project documentation',
            description: 'Write comprehensive documentation for the new feature',
            dueDate: '2026-04-15',
            priority: ITodoPriority.HIGH,
            status: ITodoStatus.TODO
        },
        {
            id: 2,
            title: 'Code review',
            description: 'Review pull requests from team members',
            dueDate: '2026-04-05',
            priority: ITodoPriority.MEDIUM,
            status: ITodoStatus.IN_PROGRESS
        },
        {
            id: 3,
            title: 'Fix bug in authentication',
            description: 'Resolve the login timeout issue',
            dueDate: '2026-04-02',
            priority: ITodoPriority.HIGH,
            status: ITodoStatus.IN_PROGRESS
        },
        {
            id: 4,
            title: 'Update dependencies',
            description: 'Update npm packages to latest versions',
            dueDate: '2026-04-01',
            priority: ITodoPriority.LOW,
            status: ITodoStatus.DONE
        }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTodos));
    return initialTodos;
};

export default class TodoHttpService extends HttpService {
    private mockData: ITodo[];

    constructor() {
        super('http://localhost:3000'); // Mock base URL
        this.mockData = initializeMockData();
    }

    // Simulate network delay
    private async delay(ms: number = 300): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Save to localStorage
    private saveToStorage(): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.mockData));
    }

    async getTodos(): Promise<ITodo[]> {
        await this.delay();
        // Refresh from localStorage to ensure sync across instances
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            this.mockData = JSON.parse(storedData);
        }
        return [...this.mockData];
    }

    async getTodoById(id: number): Promise<ITodo | null> {
        await this.delay();
        const todo = this.mockData.find(t => t.id === id);
        return todo ? { ...todo } : null;
    }

    async createTodo(todo: Omit<ITodo, 'id'>): Promise<ITodo> {
        await this.delay();
        const newId = this.mockData.length > 0
            ? Math.max(...this.mockData.map(t => t.id)) + 1
            : 1;

        const newTodo: ITodo = {
            ...todo,
            id: newId
        };

        this.mockData.push(newTodo);
        this.saveToStorage();
        return { ...newTodo };
    }

    async updateTodo(todo: ITodo): Promise<ITodo> {
        await this.delay();
        const index = this.mockData.findIndex(t => t.id === todo.id);

        if (index === -1) {
            throw new Error(`Todo with id ${todo.id} not found`);
        }

        this.mockData[index] = { ...todo };
        this.saveToStorage();
        return { ...todo };
    }

    async deleteTodo(id: number): Promise<boolean> {
        await this.delay();
        const index = this.mockData.findIndex(t => t.id === id);

        if (index === -1) {
            return false;
        }

        this.mockData.splice(index, 1);
        this.saveToStorage();
        return true;
    }

    async updateTodoStatus(id: number, status: ITodoStatus): Promise<ITodo> {
        await this.delay();
        const index = this.mockData.findIndex(t => t.id === id);

        if (index === -1) {
            throw new Error(`Todo with id ${id} not found`);
        }

        this.mockData[index] = {
            ...this.mockData[index],
            status
        };
        this.saveToStorage();
        return { ...this.mockData[index] };
    }
}
