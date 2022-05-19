import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "../interface/member";
import {
  LanternType,
  LanternFestivalType,
  DdayType,
  // LanternFestivalTypeList,
} from "../interface/lantern";
import { calDday } from "utils/utils";

const initialState: any = {
  hostId: 0,
  profile: new Member({}),
  lanterns: [] as LanternType[], // 연등회 1개 정보
  showLanternFestival: false,
  lanternFestival: new LanternFestivalType({}),
  lanternFestivals: [] as LanternFestivalType[], // 연등회 전체 정보
  ddays: [] as DdayType[],

  error: null,
  session: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // hostId
    setHostId: (state, { payload }) => {
      state.hostId = payload;
    },
    // 내 프로필 정보
    resetProfile: (state) => {
      state.Profile = initialState.profile;
    },
    getProfile: (state, { payload }: any) => {
      state.isLoading = true;
    },
    setProfile: (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload;
    },
    setProfileFail: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },

    // 연등회 정보(여러개)
    resetLanternFestivals: (state) => {
      state.lanternFestivals = initialState.lanternFestivals;
    },
    getLanternFestivals: (state, { payload }: any) => {
      state.isLoading = true;
    },
    setLanternFestivals: (state, { payload }) => {
      // console.log("zxczxczxczxczxczxczxcasdasdqweqwe", payload);
      state.lanternFestivals = payload;
      const ddays = [];
      for (let i = 0; i < payload.length; i++) {
        const lanternFestival = payload[i];
        const ddayCnt = calDday(lanternFestival.scheduleDate);
        if (ddayCnt < 7) {
          const dday = {
            scheduleId: lanternFestival.scheduleId,
            scheduleDate: ddayCnt,
            title: lanternFestival.title,
          };
          ddays.push(dday);
        }
      }
      state.ddays = ddays;
      let flag = false;
      // console.log("testestsetssdfsd");
      // if (state.lanternFestival) {
      //   for (let i = 0; i < payload.length; i++) {
      //     if (payload[i].scheduleId === state.lanternFestival.scheduleId) {
      //       console.log("state.lanternFestival", payload[i].title);
      //       state.lanternFestival = payload[i];
      //       flag = true;
      //       break;
      //     }
      //   }
      // }

      if (ddays.length) {
        for (let i = 0; i < ddays.length; i++) {
          if (payload[i].scheduleId === state.lanternFestival.scheduleId) {
            // console.log("state.lanternFestival", payload[i].title);
            state.lanternFestival = payload[i];
            flag = true;
            break;
          }
        }
      } else {
        state.lanternFestival = initialState.lanternFestival;
      }
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      if (!flag) {
        for (let i = 0; i < payload.length; i++) {
          if (
            ddays.length > 0 &&
            payload[i].scheduleId === ddays[0].scheduleId
          ) {
            // console.log("state.lanternFestival X", payload[i].title);
            state.lanternFestival = payload[i];
            break;
          }
        }
      }
    },
    setLanternFestivalsFail: (state, { payload: error }) => {
      state.error = error;
    },
    // 연등회 정보(1개) 조회
    setLanternFestival: (state, { payload }) => {
      state.lanternFestival = new LanternFestivalType(payload);
      // state.lanternFestival = payload;
    },
    resetLanternFestival: (state, { payload }) => {
      state.lanternFestival = initialState.lanternFestival;
    },
    setLanternFestivalWithId: (state, { payload }) => {
      for (let i = 0; i < state.lanternFestivals.length; i++) {
        if (payload === state.lanternFestivals[i].scheduleId) {
          state.lanternFestival = state.lanternFestivals[i];
          break;
        }
      }
    },
    setShowLanternFestival: (state, { payload }) => {
      state.showLanternFestival = payload;
    },

    reset: (state) => {
      state = initialState;
    },
  },
});

const { actions, reducer } = profileSlice;
export const profileActions = actions;
export default reducer;
