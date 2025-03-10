import ApiService from '@/lib/api';

class ChatService {
  static getChatMessages(recipient_id) {
    return ApiService.get(`api/v1/chat/messages/?recipient_id=${recipient_id}`);
  }
  
  static async sendMessage(data) {
    try {
      const response = await ApiService.post('api/v1/chat/messages/', data);
      // Ensure we're returning the actual message data
      return response;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
}

export default ChatService;