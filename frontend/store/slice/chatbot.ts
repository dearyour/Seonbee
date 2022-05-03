import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  nickname: '',
};

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    saveMessage: (state, action: PayloadAction<any>) => {},
  },
});

const { actions, reducer } = chatbotSlice;
export const chatbotActions = actions;
export default reducer;
