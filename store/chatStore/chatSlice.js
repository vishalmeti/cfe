// store/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ChatService from '@/services/chatService';
import forEach from 'lodash/forEach';
// --- Async Thunks (for API interaction) ---

// Fetch initial messages
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (reciever_id, { rejectWithValue }) => {  // Use rejectWithValue for proper error handling
    try {
      const response = await ChatService.getChatMessages(reciever_id); // Your API endpoint
      if (response.getStatus() !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = response;
      return data; // This becomes the `payload` of the fulfilled action
    } catch (error) {
      return rejectWithValue(error.message); // Send the error message to the reducer
    }
  }
);


// --- Slice ---

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages_by_id: {},
    messages_by_convId: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Add a message received via WebSocket (synchronous action)
    addReceivedMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        console.log('fetchMessages.pending')
        state.status = 'loading';
        state.error = null; // Clear previous errors
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let resp = action.payload;

        forEach(resp, (msg) => {
          state.messages_by_id[msg.id] = {...msg, text: msg.content, timestamp: new Date(msg.timestamp).toLocaleString()};
          state.messages_by_convId[msg.conversation] = [...(state.messages_by_convId[msg.conversation] || []), msg.id];
        });
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Store the error message
      })

  },
});

export const { addReceivedMessage } = chatSlice.actions; // Export synchronous actions
export default chatSlice.reducer;