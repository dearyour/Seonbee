import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "../interface/Member";
import { Lantern } from "../interface/Lantern";
const initialState: any = {
  nickname: "",
  member: [],

  hostId: 0,
  myProfile: {} as Member,
  lanterns: [
    {
      lanternId: 1,
      guestId: 1,
      nickname: "김선비",
      content: "ㅊㅊㅊ",
      position: 1,
      lanternType: 4,
    },
  ] as Lantern[], // 연등회 1개 정보
  lanternFestivals: [
    {
      scheduleId: 1,
      scheduleDate: "2022.11.30",
      title: "수능",
      backgroud: 1,
      lanternList: [
        {
          lanternId: 1,
          guestId: 1,
          nickname: "김기솔",
          content: "ㅊㅊㅊ",
          position: 13,
          lanternType: 4,
        },
      ],
    },
  ], // 연등회 전체 정보

  info: [],
  isLoading: false,
  error: null,
  session: "",
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    profileEdit: (state) => {},

    //카카오 리듀서
    getKakaoKey: (state) => {
      state.isLoading = true;
    },
    getKakaoKeySuccess: (state, { payload }) => {
      state.session = payload;
      state.isLoading = false;
      sessionStorage.setItem("Token", payload);
    },
    getKakaoKeyError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
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

    // [호패 리듀서]
    // state는 리듀서 상태, payload 는 인자
    // 요청할때 dispatch에 인자를 넣어 보내고 싶다면 payload까지 작성해줘야함
    // hostId
    setHostId: (state, { payload }) => {
      state.hostId = payload;
    },
    // 내 프로필 정보
    resetMyProfile: (state) => {
      state.myProfile = initialState.myProfile;
    },
    getMyProfile: (state, { payload }: any) => {
      state.isLoading = true;
    },
    setMyProfile: (state, { payload }) => {
      state.isLoading = false;
      state.myProfile = payload;
      state.info = payload;
    },
    setMyProfileFail: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },

    // 연등회 정보
    resetLanternFestivals: (state) => {
      state.lanternFestivals = initialState.lanternFestivals;
    },
    getLanternFestivals: (state) => {
      state.isLoading = true;
    },
    setLanternFestivals: (state, { payload }) => {
      state.lanternFestivals = payload;
    },
    setLanternFestivalsFail: (state, { payload: error }) => {
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
