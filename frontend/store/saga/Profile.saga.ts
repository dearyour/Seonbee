import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  takeEvery,
  call,
  put,
  takeLatest,
  all,
  fork,
} from "redux-saga/effects";
import { profileActions } from "../slice/profile";
import { GetProfileState, GetLanternFestivalsState } from "../api/Profile.api";
import Router from "next/router";

// [profile]
// 마이페이지 사가
function* watchProfileState() {
  yield takeLatest(profileActions.getProfile, getProfileState);
}

function* getProfileState(memberId: any) {
  try {
    // console.log("마이페이지 통신전");
    const userdata: AxiosResponse = yield call(
      GetProfileState,
      memberId.payload
    );
    if (!userdata) {
      Router.push("/404");
    }
    // console.log("마이페이지 통신후");
    yield put(profileActions.setProfile(userdata));
  } catch (err) {
    console.log(err);

    yield put(profileActions.setProfileFail(err));
  }
}

// 연등회 사가
function* watchLanternFestivalsState() {
  yield takeLatest(
    profileActions.getLanternFestivals,
    getLanternFestivalsState
  );
}

function* getLanternFestivalsState(hostId: any) {
  // console.log("getLanternFestivalsState hostId", hostId);
  try {
    // console.log("getLanternFestivalsState 전");
    const lanternData: AxiosResponse = yield call(
      GetLanternFestivalsState,
      hostId.payload
    );
    // console.log("getLanternFestivalsState 후");
    yield put(profileActions.setLanternFestivals(lanternData));
  } catch (err) {
    // console.log(err);
    yield put(profileActions.setLanternFestivalsFail(err));
  }
}

export default function* ProfileSaga() {
  yield all([fork(watchProfileState), fork(watchLanternFestivalsState)]);
}
