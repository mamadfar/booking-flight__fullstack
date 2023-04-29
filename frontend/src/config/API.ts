import axios from "axios";
import {getCookie} from "typescript-cookie";

// const BASE_URL = "https://test.bilifo.com/api/v3/flight";
const BASE_URL = "http://localhost:5000/api/v1";

//! base url to set the request api url
axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(
    async (config) => {
        const Token = getCookie("flightAccess");
        // const controller = new AbortController();
        // config.signal = controller.signal;
        // controller.abort("Request canceled by user.");

        config.headers["Content-Type"] = "application/json";
        config.headers["Accept"] = "*/*";
        config.headers["Accept-Language"] = "en";
        config.headers["Access-Control-Allow-Origin"] = "*";

        if (Token) {
            config.headers["Authorization"] = `${Token}`;
        }

        return config;
    },
    (error) => {
        if (error) console.log("Something went wrong!");
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error && typeof error.response === "undefined") {
            console.log("Something went wrong.");
        } else {
            switch (error.response.status) {
                case 429:
                    console.log("Too many request.");
                    break;
                case 422:
                    console.log("Please check your data.");
                    break;
                case 403:
                    console.log("Invalid authorization");
                    break;
                default:
                    console.log("Something went wrong.");
            }
            const expectedError =
                error.response &&
                error.response.status >= 400 &&
                error.response.status < 500;
            if (!expectedError) {
                console.log("Something went wrong.");
            }
        }
        return Promise.reject(error);
    }
)

export default {
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    delete: axios.delete,
    put: axios.put,
}
