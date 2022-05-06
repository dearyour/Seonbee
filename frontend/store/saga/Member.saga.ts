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
import { memberActions } from "../slice/member";
import { GetLoginState, GetMyProfileState } from "../api/Member.api";

// 마이페이지 사가
function* getMyProfileState(memberId: any) {
  const token = sessionStorage.getItem("Token");
  // console.log(memberId.payload);
  // console.log("##memberId");
  try {
    // console.log("마이페이지 통신전");
    const userdata: AxiosResponse = yield call(
      GetMyProfileState,
      memberId.payload,
      token
    );
    // console.log("마이페이지 통신후");
    yield put(memberActions.setMyProfile(userdata));
  } catch (err) {
    console.log(err);
    yield put(memberActions.setMyProfileFail(err));
  }
}

function* watchMyProfileState() {
  yield takeLatest(memberActions.getMyProfile, getMyProfileState);
}
// 로그인 사가
function* getLoginState() {
  try {
    const token = sessionStorage.getItem("Token");
    // console.log("유저통신전");
    const userdata: AxiosResponse = yield call(GetLoginState, token);
    // console.log("유저통신후");
    yield put(memberActions.setMember(userdata));
  } catch (err) {
    console.log(err);
    yield put(memberActions.setMemberFail(err));
  }
}

function* watchMemberState() {
  yield takeLatest(memberActions.getMember, getLoginState);
}

export default function* MemberSaga() {
  yield all([fork(watchMemberState), fork(watchMypageState)]);
}
