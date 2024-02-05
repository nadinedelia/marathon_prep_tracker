import axios from 'axios';

function getUrl() {
    if (process.env.REACT_APP_API_GATEWAY_URL) {
        return process.env.REACT_APP_API_GATEWAY_URL;
    } else {
        return `http://localhost/activity/`;
    }
}

const baseURL = getUrl();

const api = axios.create({
    baseURL
});

export const trackExercise = payload => api.post(`/exercises/add`, payload);
