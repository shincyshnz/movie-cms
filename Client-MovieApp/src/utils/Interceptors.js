// Interceptors : Act as a middleware between client and server. Access token attached when sending request to server.
// Check authentication every time making API calls

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_AUTH_URL}`
});


// 401 - Unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            localStorage.clear();
            const response = await axiosInstance("/refresh-token");
            localStorage.setItem("x-token", response.data.accessToken);
            window.location.reload();
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    });

// Attach accesstoken
axiosInstance.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem("x-token");
        if (token) {
            // To make the refresh token stored inside cookie we specify withCredentials: true
            request.withCredentials = true;
            request.headers.accessToken = token;
        }
        return request;
    },
    (error) => error
);