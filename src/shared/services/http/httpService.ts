import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {IHttpResponse} from "./interfaces/iHttpResponse.ts";

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

    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
        const axiosResponse: AxiosResponse<T> | AxiosError<T> = await this.axiosInstance.get(url, config);
        if (axiosResponse instanceof AxiosError) {
            return this.mapFailureResponse(axiosResponse as AxiosError<T>);
        }
        return this.mapSuccessResponse<T>(axiosResponse as AxiosResponse<T>);
    }

    protected async post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
        const axiosResponse: AxiosResponse<T> | AxiosError<T> = await this.axiosInstance.post(url, data, config);
        if (axiosResponse instanceof AxiosError) {
            return this.mapFailureResponse(axiosResponse as AxiosError<T>);
        }
        return this.mapSuccessResponse<T>(axiosResponse as AxiosResponse<T>);
    }

    protected async put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
        const axiosResponse: AxiosResponse<T> | AxiosError<T> = await this.axiosInstance.put(url, data, config);
        if (axiosResponse instanceof AxiosError) {
            return this.mapFailureResponse(axiosResponse as AxiosError<T>);
        }
        return this.mapSuccessResponse<T>(axiosResponse as AxiosResponse<T>);
    }

    protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
        const axiosResponse: AxiosResponse<T> | AxiosError<T> = await this.axiosInstance.delete(url, config);
        if (axiosResponse instanceof AxiosError) {
            return this.mapFailureResponse(axiosResponse as AxiosError<T>);
        }
        return this.mapSuccessResponse<T>(axiosResponse as AxiosResponse<T>);
    }

    private setupInterceptors(): void {
        this.axiosInstance.interceptors.response.use(
            (response) => {
                console.log('Response intercepted:', response.data);
                return response;
            },
            (error: AxiosError ) => {
                console.error('Error intercepted:', error);
                if (error.response!.status >= 500) {
                    return Promise.reject(error);
                }
                return error;
            }
        );
    }

    private mapSuccessResponse<T>(axiosResponse: AxiosResponse<T>): IHttpResponse<T> {
        return {
            status: axiosResponse.status,
            data: axiosResponse.data,
        };
    }

    private mapFailureResponse<T>(axiosError: AxiosError<T>): IHttpResponse<T> {
        return {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
            error: axiosError.message,
        };
    }
}

export default HttpService;