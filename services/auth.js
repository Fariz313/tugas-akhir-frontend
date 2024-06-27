import axios from 'axios';

const API_URL = "http://localhost:8000"; // Replace with your actual API URL

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    return response.data;
};

export const register = async (name, email, password, role) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, role });
    return response.data;
};