import axios from "axios";
const BASE_URL = "https://elearningnew.cybersoft.edu.vn/api";
export const axiosWithoutAuth = axios.create({
    baseURL: BASE_URL,
    timeout: 180_000,
});
axiosWithoutAuth.interceptors.request.use(
    (config) => {
        config.headers[
            "TokenCybersoft"
        ] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc`;
        return config;
    },
    (e) => {
        return Promise.reject(e);
    }
);
