import axios from "axios";

export const JsonPlaceholderClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // timeout: 5000, // 5 seconds
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
});