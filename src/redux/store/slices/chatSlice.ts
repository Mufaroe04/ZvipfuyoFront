import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { chatService } from '../../../services/chatService';

// The Thunk that talks to the Service
export const sendMessageToAI = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, animalId }: { message: string; animalId?: number }) => {
    const data = await chatService.askExpert(message, animalId);
    return data.text; // Return the string response from Gemini
  }
);

const chatSlice = createSlice({
  name: 'chat',
initialState: {
  messages: [
    {
      id: 'welcome',
      text: "Hello! I'm your Zvipfuyo AI Consultant. I can see your herd stats, inventory, and local weather. How can I help your farm today?",
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ],
  isLoading: false,
},
  reducers: {
    addLocalMessage: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToAI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessageToAI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push({
          id: Date.now().toString(),
          text: action.payload,
          sender: 'ai',
          timestamp: new Date().toISOString()
        });
      })
      .addCase(sendMessageToAI.rejected, (state) => {
        state.isLoading = false;
        state.messages.push({
          id: Date.now().toString(),
          text: "I'm having trouble connecting to the kraal right now. Please try again.",
          sender: 'ai',
          timestamp: new Date().toISOString()
        });
      });
  }
});

export const { addLocalMessage } = chatSlice.actions;
export default chatSlice.reducer;