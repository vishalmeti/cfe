import ApiService from '@/lib/api';

class UserService {
  static login(credentials) {
    return ApiService.post('/auth/login', credentials);
  }

  static register(userData) {
    return ApiService.post('/auth/register', userData);
  }

  static getCurrentUser() {
    return ApiService.get('/users/me');
  }

  static updateProfile(userData) {
    return ApiService.put('/users/profile', userData);
  }

  static getUsers(params) {
    return ApiService.get('/users', params);
  }
}

export default UserService;