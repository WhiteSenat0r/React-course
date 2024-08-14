export interface IHttpResponse<T> {
    status: number | undefined;
    data: T | undefined;
    error?: string;
}