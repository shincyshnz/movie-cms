// Interceptors : Act as a middleware between client and server. Access token attached when sending request to server.
// Check authentication every time making API calls

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_AUTH_URL}`
});


// 401 - Unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.status == 401) {
            localStorage.clear();
        }
        return Promise.reject(error);
    });

// Attach accesstoken
axiosInstance.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem("x-token");
        if (token) {
            request.headers.accessToken = token;
        }
    return request;
    },
    (error) => error
);