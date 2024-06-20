import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Get Token
const getToken = () => {
    return localStorage.getItem('token');
};

// Initiate Bearer token
const authHeader = () => {
    const token = getToken();
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const login = (userId, password) => {
    return axios.post(`${API_URL}/auth/login`, { userId, password });
};

export const register = (user) => {
    return axios.post(`${API_URL}/auth/register`, user);
};

export const getTransactions = (status) => {
    return axios.get(`${API_URL}/transactions?status=${status}`, authHeader());
};

export const getTransactionDetail = (id) => {
    return axios.get(`${API_URL}/transactions/${id}`, authHeader());
};

export const createTransaction = (transaction) => {
    return axios.post(`${API_URL}/transactions`, transaction, authHeader());
};

export const auditTransaction = (id, status) => {
    return axios.put(`${API_URL}/transactions/${id}/audit`, { status }, authHeader());
};

export const getTransactionOverview = () => {
    return axios.get(`${API_URL}/transactions/overview`, authHeader());
};
