import HttpService from "../../../shared/services/http/httpService.ts";
import { ITodo } from "../interfaces/iTodo.ts";
import { ITodoStatus } from "../interfaces/iTodoStatus.ts";

// Mock data storage (in-memory)
const mockTodos: ITodo[] = [
    {
        id: 1,
        title: "Setup project structure",
        description: "Create initial folder structure and configuration",
        status: ITodoStatus.DONE
    },
    {
        id: 2,
        title: "Implement authentication",
        description: "Add login and signup functionality",
        status: ITodoStatus.IN_PROGRESS
    },
    {
        id: 3,
        title: "Design database schema",
        description: "",
        status: ITodoStatus.TODO
    },
    {
        id: 4,
        title: "Write API documentation",
        description: "Document all API endpoints",
        status: ITodoStatus.TODO
    },
    {
        id: 5,
        title: "Setup CI/CD pipeline",
        description: "Configure automated testing and deployment",
        status: ITodoStatus.TODO
    }
];

let nextId = 6;

const BASE_URL = "http://localhost:3000/api"; // Mock base URL

export default class TodosHttpService extends HttpService {
    constructor() {
        super(BASE_URL);
    }

    /**
     * Fetch all todos (mock implementation)
     */
    async getTodos(): Promise<ITodo[]> {
        // Simulate network delay
        await this.simulateDelay(300);

        return [...mockTodos];
    }

    /**
     * Create a new todo (mock implementation)
     */
    async createTodo(todo: Omit<ITodo, 'id'>): Promise<ITodo> {
        // Simulate network delay
        await this.simulateDelay(400);

        const newTodo: ITodo = {
            ...todo,
            id: nextId++
        };

        mockTodos.push(newTodo);

        return newTodo;
    }

    /**
     * Update an existing todo (mock implementation)
     */
    async updateTodo(todo: ITodo): Promise<boolean> {
        // Simulate network delay
        await this.simulateDelay(350);

        const index = mockTodos.findIndex(t => t.id === todo.id);

        if (index === -1) {
            return false;
        }

        mockTodos[index] = { ...mockTodos[index], ...todo };

        return true;
    }

    /**
     * Delete a todo (mock implementation)
     */
    async deleteTodo(id: number): Promise<boolean> {
        // Simulate network delay
        await this.simulateDelay(300);

        const index = mockTodos.findIndex(t => t.id === id);

        if (index === -1) {
            return false;
        }

        mockTodos.splice(index, 1);

        return true;
    }

    /**
     * Simulate network delay for mock responses
     */
    private simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
