import api from './authInterceptor';

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  const { token, refreshToken } = response.data;
  
  // Store tokens
  localStorage.setItem('authToken', token);
  localStorage.setItem('refreshToken', refreshToken);
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};
