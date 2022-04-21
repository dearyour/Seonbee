import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {
  nickname: "",
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    profileEdit: (state) => { },
  },
});

const { actions, reducer } = memberSlice;
export const userActions = actions;
export default reducer;
