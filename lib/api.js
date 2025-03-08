import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or other storage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    // Handle errors globally
    const { response } = error;
    
    // Handle specific status codes
    if (response && response.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      if (typeof window !== 'undefined') {
        // Clear auth data and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API service class
class ApiService {
  // GET request
  static async get(url, params = {}, config = {}) {
    try {
      const response = await apiClient.get(url, { params, ...config });
      return this.createResponseObject(response);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // POST request
  static async post(url, data = {}, config = {}) {
    try {
      const response = await apiClient.post(url, data, config);
      return this.createResponseObject(response);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // PUT request
  static async put(url, data = {}, config = {}) {
    try {
      const response = await apiClient.put(url, data, config);
      return this.createResponseObject(response);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // DELETE request
  static async delete(url, config = {}) {
    try {
      const response = await apiClient.delete(url, config);
      return this.createResponseObject(response);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // PATCH request
  static async patch(url, data = {}, config = {}) {
    try {
      const response = await apiClient.patch(url, data, config);
      return this.createResponseObject(response);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Helper method to create a fully backward-compatible response object
  static createResponseObject(response) {
    // Create a custom object that inherits from response.data
    const responseObj = Array.isArray(response.data) 
      ? [...response.data]  // Handle array responses
      : typeof response.data === 'object' && response.data !== null
        ? { ...response.data }  // Handle object responses
        : response.data;  // Handle primitive responses
    
    // For non-primitive responses, add metadata properties
    if (typeof responseObj === 'object' && responseObj !== null) {
      // Add response metadata
      Object.defineProperties(responseObj, {
        _status: { value: response.status, enumerable: false },
        _statusText: { value: response.statusText, enumerable: false },
        _headers: { value: response.headers, enumerable: false },
        getStatus: { 
          value: function() { return this._status; }, 
          enumerable: false 
        },
        getStatusText: { 
          value: function() { return this._statusText; }, 
          enumerable: false 
        },
        getHeaders: { 
          value: function() { return this._headers; }, 
          enumerable: false 
        }
      });
    }
    
    return responseObj;
  }

  // Error handler
  static handleError(error) {
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
  }
}

export default ApiService;