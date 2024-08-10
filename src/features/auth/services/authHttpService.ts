import HttpService from "../../../shared/services/httpService.ts";

import {AxiosRequestConfig} from "axios";

import ILoginData from "../types/interfaces/iLoginData.ts";
import IAuthToken from "../types/interfaces/iAuthToken.ts";

const BASE_URL = "https://reqres.in/api";
const LOGIN_ENDPOINT = "/login";

export default class AuthHttpService extends HttpService {
    constructor() {
        super(BASE_URL);
    }

    async loginWithCredentials(loginData: ILoginData): Promise<boolean> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            baseURL: BASE_URL,
            url: LOGIN_ENDPOINT,
        };

        const response = await super.post<IAuthToken>(LOGIN_ENDPOINT, loginData, config);
        console.log(response);

        return !!response.token && response.token.length > 0;
    }
}