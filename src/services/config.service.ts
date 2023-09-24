import axios from "axios";
import { getLocalStorage } from "../utils";
import { ACCESS_TOKEN, TOKEN_CYBERSOFT } from "../constants";
const BASE_URL = "https://elearningnew.cybersoft.edu.vn/api";
export const axiosWithoutAuth = axios.create({
    baseURL: BASE_URL,
    timeout: 180_000,
});
axiosWithoutAuth.interceptors.request.use(
    (config) => {
        config.headers[
            "TokenCybersoft"
        ] = TOKEN_CYBERSOFT;
        return config;
    },
    (e) => {
        return Promise.reject(e);
    }
);
export const axiosWithAuth = axios.create({ baseURL: BASE_URL, timeout: 180_000 })
axiosWithAuth.interceptors.request.use(
    (config) => {
        config.headers[ "TokenCybersoft"] = TOKEN_CYBERSOFT;
        config.headers['Authorization'] = 'Bearer ' + getLocalStorage(ACCESS_TOKEN)
        return config;
    }
)
