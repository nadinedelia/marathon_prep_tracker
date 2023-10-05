import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5300'
});

export const createUser = payload => api.post(`/users/add`, payload);
