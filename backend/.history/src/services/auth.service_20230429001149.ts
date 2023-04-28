import API from "../config/API";

export const AuthService = (user: any) => {
    return API.post("/auth", user);
};