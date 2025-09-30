import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Smart Card APIs
export const smartCardAPI = {
  create: (data) => api.post('/smartcard', data),
  getAll: () => api.get('/smartcard'),
  getById: (id) => api.get(`/smartcard/${id}`),
};

// Calculator APIs
export const calculatorAPI = {
  calculateArea: (data) => api.post('/calculator/area', data),
  calculatePercentage: (data) => api.post('/calculator/percentage', data),
};

// Customer APIs
export const customerAPI = {
  createCustomer: (data) => api.post('/customer/customer', data),
  getCustomers: () => api.get('/customer/customers'),
  createDaySale: (data) => api.post('/customer/daysale', data),
  getDaySales: (date) => api.get('/customer/daysales', { params: { date } }),
  createExpense: (data) => api.post('/customer/expense', data),
  getExpenses: (month, year) => api.get('/customer/expenses', { params: { month, year } }),
  getDailyReport: (date) => api.get('/customer/reports/daily', { params: { date } }),
};

export default api;