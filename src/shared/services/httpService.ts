import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

abstract class HttpService {
    private axiosInstance: AxiosInstance;

    protected constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    // TODO Add R generic for response model, T - for request

    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
        return response.data;
    }

    protected async post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
        return response.data;
    }

    protected async postFormData<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.post(url, formData, {
            ...config,
            headers: {
                ...config?.headers,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    protected async put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
        return response.data;
    }

    protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
        return response.data;
    }

    private setupInterceptors(): void {
        this.axiosInstance.interceptors.response.use(
            (response) => {
                console.log('Response intercepted:', response.data);
                return response;
            },
            (error) => {
                console.error('Error intercepted:', error);
                return Promise.reject(error);
            }
        );
    }
}

export default HttpService;