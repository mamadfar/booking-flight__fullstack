import API from "../config/API";

export const authService = (user: any) => {
    return API.post("/auth", user);
}