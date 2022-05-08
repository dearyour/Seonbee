import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "../interface/Member";
import {
  LanternType,
  LanternFestivalType,
  DdayType,
} from "../interface/Lantern";
import { calDday } from "utils/utils";

const initialState: any = {
  hostId: 0,
  profile: {} as Member,
  lanterns: [] as LanternType[], // 연등회 1개 정보
  showLanternFestival: false,
  lanternFestival: {} as LanternFestivalType,
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
      console.log("getLanternFestivals");
      state.isLoading = true;
    },
    setLanternFestivals: (state, { payload }) => {
      state.lanternFestivals = payload;
      const ddays = [];
      for (let i = 0; i < payload.length; i++) {
        const lanternFestival = payload[i];
        const ddayCnt = calDday(lanternFestival.scheduleDate);
        console.log("ddayCnt", ddayCnt);
        if (ddayCnt < 7) {
          const dday = {
            scheduleId: lanternFestival.scheduleId,
            scheduleDate: ddayCnt,
            title: lanternFestival.title,
          };
          ddays.push(dday);
        }
      }
      console.log("setLanternFestivals ddays", ddays);
      state.ddays = ddays;
      if (state.lanternFestival) {
        for (let i = 0; i < payload.length; i++) {
          if (payload[i].scheduleId === state.lanternFestival.scheduleId) {
            state.lanternFestival = payload[i];
            break;
          }
        }
      } else {
        state.lanternFestival = payload[0];
      }
    },
    setLanternFestivalsFail: (state, { payload: error }) => {
      state.error = error;
    },
    // 연등회 정보(1개) 조회
    setLanternFestival: (state, { payload }) => {
      state.lanternFestival = payload;
    },
    setLanternFestivalWithId: (state, { payload }) => {
      for (let i = 0; i < state.lanternFestivals.length; i++) {
        if (payload === state.lanternFestivals[i].scheduleId) {
          state.lanternFestival = state.lanternFestivals[i];
          break;
        }
      }
    },
    setShowLanternFestival: (state) => {
      state.showLanternFestival = !state.showLanternFestival;
    },

    reset: (state) => {
      state = initialState;
    },
  },
});

const { actions, reducer } = profileSlice;
export const profileActions = actions;
export default reducer;
