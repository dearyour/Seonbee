import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "../interface/Member";
const initialState: Member | any = {
  nickname: "",
  member: [],
  myPage: [],
  isLoading: false,
  error: null,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    profileEdit: (state) => {},
    getMember: (state) => {
      state.isLoading = true;
    },
    setMember: (state, { payload }) => {
      state.isLoading = false;
      state.member = payload;
    },
    setMemberFail: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },
  },
});

const { actions, reducer } = memberSlice;
export const memberActions = actions;
export default reducer;
