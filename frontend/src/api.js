import axios from 'axios';

function getUrl() {
    if (process.env.REACT_APP_API_BASE_URL) {
        return process.env.REACT_APP_API_BASE_URL;
    } else {
        // Fallback for local development outside Docker
        return `http://localhost:5300`;
    }
}

const baseURL = getUrl();

const api = axios.create({
    baseURL
});

export const trackExercise = payload => api.post(`/exercises/add`, payload);
