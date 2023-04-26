import API from "../config/API";
import {IAuth, IResponse} from "../types/Auth.type";

export const authService = (payload: any, signal: AbortSignal): Promise<IResponse<IAuth>> => {
    return API.post("/auth", payload, {
        signal
    });
};
