import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "../interface/Member";
const initialState: Member | any = {
  info: [],
  isLoading: false,
  error: null,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    profileEdit: (state) => {},

    //로그인 리듀서
    getMember: (state) => {
      state.isLoading = true;
    },
    setMember: (state, { payload }) => {
      state.isLoading = false;
      state.info = payload;
    },
    setMemberFail: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },

    //호패 리듀서
    // state는 리듀서 상태, payload 는 인자
    // 요청할때 dispatch에 인자를 넣어 보내고 싶다면 payload까지 작성해줘야함
    getMypage: (state, { payload }: any) => {
      state.isLoading = true;
    },
    setMypage: (state, { payload }) => {
      state.isLoading = false;
      state.info = payload;
    },
    setMypageFail: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },

    reset: (state) => {
      state.info = initialState.info;
    },
  },
});

const { actions, reducer } = memberSlice;
export const memberActions = actions;
export default reducer;
