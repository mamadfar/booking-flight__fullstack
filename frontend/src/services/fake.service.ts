import API from "../config/API";

export const fakeService = (id: number, signal: AbortSignal) => {
    return API.get(`https://dummyjson.com/products/${id}`, {
        signal
    });
};
