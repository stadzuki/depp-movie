import axios from "axios"
// import axiosRetry from "axios-retry";

export const API_URL = 'https://b730-87-255-2-107.ngrok.io'

const $api = axios.create({
    // withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})
// axiosRetry($api, {
//         retries: 3,
//         retryDelay: (retryCount) => retryCount * 1000
// });

export default $api;
