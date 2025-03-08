import ApiService from '@/lib/api';

class UserService {
  static login(credentials) {
    return ApiService.post('/api/token/', credentials);
  }

  static register(userData) {
    return ApiService.post('/auth/register', userData);
  }

  static getCurrentUser() {
    return ApiService.get('/api/me/');
  }

  static updateProfileImage(userData) {
    return ApiService.post('api/v1/users/profile/', userData , {headers: {'Content-Type': 'multipart/form-data'}});
  }

  static getUsers(params) {
    return ApiService.get('/users', params);
  }
  static getRecipientConversation(recipient_id) {
    return ApiService.get(`api/v1/chat/conversations/recipient/${recipient_id}`);
  }
}

export default UserService;