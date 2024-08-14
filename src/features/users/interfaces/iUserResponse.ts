import {IUser} from "./iUser.ts";

export interface IUserResponse {
    page: number;
    per_page: number;
    total: number;
    data: IUser[];
}