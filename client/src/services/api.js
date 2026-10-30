import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to inject JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillswap_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor to handle session expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        localStorage.removeItem('skillswap_token');
        localStorage.removeItem('skillswap_user');
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email })
};

export const profileAPI = {
  getAll: (params) => api.get('/profiles', { params }),
  getById: (id) => api.get(`/profiles/${id}`),
  updateMe: (data) => api.put('/profiles/me', data),
  getColleges: () => api.get('/profiles/colleges'),
  getSkillsCatalog: () => api.get('/profiles/skills')
};

export const swapAPI = {
  sendRequest: (data) => api.post('/swaps', data),
  getMyRequests: () => api.get('/swaps/my'),
  respond: (id, status) => api.put(`/swaps/${id}/status`, { status }),
  cancel: (id) => api.delete(`/swaps/${id}`)
};

export const connectionAPI = {
  getMyConnections: () => api.get('/connections')
};

export const messageAPI = {
  getByConnection: (connectionId) => api.get(`/messages/${connectionId}`),
  sendMessage: (connectionId, content) => api.post(`/messages/${connectionId}`, { content })
};

export const matchAPI = {
  getSmartMatches: () => api.get('/matches')
};

export const statsAPI = {
  getGlobalStats: () => api.get('/stats')
};

export default api;
