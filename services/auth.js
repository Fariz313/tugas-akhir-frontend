import axios from 'axios';

const API_URL = "http://localhost:8000"; // Replace with your actual API URL
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/api/login`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
};

export const register = async (name, email, password, role) => {
    const response = await axios.post(`${API_URL}/api/register`, { name, email, password, role }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
};

export const getUserProfile = async () => {
    const response = await axios.get(`${API_URL}/api/profile`, {
        headers: getAuthHeaders()
    });
    return response.data;
};

export const updateUserProfile = async (profileData) => {
    const response = await axios.put(`${API_URL}/api/profile`, profileData, {
        headers: getAuthHeaders()
    });
    return response.data;
};