import axios from "axios";

axios.defaults.baseURL = "https://test.bilifo.com/api/v3/flight";

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
    patch: axios.patch,
}