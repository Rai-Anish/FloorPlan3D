import axios from "axios";
import { useAuthStore } from "../store/authStore.js";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api",
    withCredentials: true,
});

// request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken; // get directly from store
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// response interceptor with queue
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((p) => error ? p.reject(error) : p.resolve(token!));
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axiosInstance.post("auth/refresh");
                const newToken = response.data.data.accessToken;

                useAuthStore.getState().setAccessToken(newToken); // update store
                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError, null);
                useAuthStore.getState().logout(); // clear store
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;