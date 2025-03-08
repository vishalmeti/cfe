import ApiService from '@/lib/api';

class ChatService {
  static getChatMessages(recipient_id) {
    return ApiService.get(`api/v1/chat/messages/?recipient_id=${recipient_id}`);
  }
  static sendMessage(data) {
    return ApiService.post('api/v1/chat/messages/', data);
  }
  

}

export default ChatService ;