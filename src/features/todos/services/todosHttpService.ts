import HttpService from "../../../shared/services/http/httpService.ts";
import {ITodo} from "../interfaces/iTodo.ts";
import {ITodosResponse} from "../interfaces/iTodosResponse.ts";
import {ITodoStatus} from "../interfaces/iTodoStatus.ts";

const STORAGE_KEY = "todos_mock_data";

export default class TodosHttpService extends HttpService {
    constructor() {
        super("http://localhost:3000"); // Mock base URL - not used
        this.initializeMockData();
    }

    /**
     * Initialize mock data in localStorage if not exists
     */
    private initializeMockData(): void {
        const existingData = localStorage.getItem(STORAGE_KEY);
        if (!existingData) {
            const initialTodos: ITodo[] = [
                {
                    id: "1",
                    title: "Setup project structure",
                    description: "Create feature folders and base components",
                    status: ITodoStatus.DONE,
                    createdAt: new Date().toISOString(),
                },
                {
                    id: "2",
                    title: "Implement drag and drop",
                    description: "Add @hello-pangea/dnd library",
                    status: ITodoStatus.IN_PROGRESS,
                    createdAt: new Date().toISOString(),
                },
                {
                    id: "3",
                    title: "Add authentication",
                    description: "Implement user authentication flow",
                    status: ITodoStatus.TODO,
                    createdAt: new Date().toISOString(),
                },
            ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTodos));
        }
    }

    /**
     * Get todos from localStorage
     */
    private getTodosFromStorage(): ITodo[] {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Save todos to localStorage
     */
    private saveTodosToStorage(todos: ITodo[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }

    /**
     * Mock API: Get all todos
     */
    async getTodos(): Promise<ITodosResponse> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const todos = this.getTodosFromStorage();

        return {
            data: todos,
        };
    }

    /**
     * Mock API: Create a new todo
     */
    async createTodo(todo: Omit<ITodo, 'id' | 'createdAt'>): Promise<ITodo> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const todos = this.getTodosFromStorage();
        const newTodo: ITodo = {
            ...todo,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };

        todos.push(newTodo);
        this.saveTodosToStorage(todos);

        return newTodo;
    }

    /**
     * Mock API: Update a todo
     */
    async updateTodo(id: string, updates: Partial<ITodo>): Promise<ITodo | null> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const todos = this.getTodosFromStorage();
        const todoIndex = todos.findIndex(t => t.id === id);

        if (todoIndex === -1) {
            return null;
        }

        todos[todoIndex] = {
            ...todos[todoIndex],
            ...updates,
        };

        this.saveTodosToStorage(todos);

        return todos[todoIndex];
    }

    /**
     * Mock API: Delete a todo
     */
    async deleteTodo(id: string): Promise<boolean> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const todos = this.getTodosFromStorage();
        const filteredTodos = todos.filter(t => t.id !== id);

        if (filteredTodos.length === todos.length) {
            return false;
        }

        this.saveTodosToStorage(filteredTodos);

        return true;
    }
}
