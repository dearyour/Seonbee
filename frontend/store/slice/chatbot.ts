import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Messages {
  messages: any[];
}

const initialState: Messages = {
  messages: [],
};

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.messages = [];
    },
    saveMessage: (state, action: PayloadAction<any>) => {
      state.messages = state.messages.concat(action.payload);
    },
  },
});

const { actions, reducer } = chatbotSlice;
export const chatbotActions = actions;
export default reducer;
