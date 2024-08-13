import HttpService from "../../../shared/services/http/httpService.ts";

import {AxiosRequestConfig, HttpStatusCode} from "axios";
import {IUserResponse} from "../types/interfaces/iUserResponse.ts";
import {IUser} from "../types/interfaces/iUser.ts";

const BASE_URL = "https://reqres.in/api";
const GET_USERS_ENDPOINT = "/users";
const GET_USER_ENDPOINT = "/users/";

export default class UsersHttpService extends HttpService {
    constructor() {
        super(BASE_URL);
    }

    async getUsers(): Promise<IUserResponse> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            baseURL: BASE_URL,
            url: GET_USERS_ENDPOINT,
            params: {
                page: 0,
            }
        };

        const result: IUserResponse = {
            data: []
        }

        for (let i = 1; i < 3; i++) {
            config.params.page = i;

            const response = await super.get<IUserResponse>(GET_USERS_ENDPOINT, config);

            const userCollection = response.data!.data;
            result.data = [...result.data, ...userCollection];
        }

        return result;
    }

    async deleteUser(id: number): Promise<boolean> {
        const config: AxiosRequestConfig = {
            method: 'DELETE',
            baseURL: BASE_URL,
            url: `${GET_USER_ENDPOINT}${id}`,
        };

        const response = await super.delete<boolean>(`${GET_USER_ENDPOINT}${id}`, config);

        return response.status === HttpStatusCode.NoContent;
    }

    async createUser(user: IUser): Promise<boolean> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            baseURL: BASE_URL,
            url: GET_USERS_ENDPOINT,
        };

        const response = await super.post<boolean>(GET_USERS_ENDPOINT, user, config);

        return response.status === HttpStatusCode.Created;
    }

    async updateUser(user: IUser): Promise<boolean> {
        const config: AxiosRequestConfig = {
            method: 'PUT',
            baseURL: BASE_URL,
            url: `${GET_USER_ENDPOINT}${user.id}`,
        };

        const response = await super.put<boolean>(`${GET_USER_ENDPOINT}${user.id}`, user, config);

        return response.status === HttpStatusCode.Ok;
    }
}