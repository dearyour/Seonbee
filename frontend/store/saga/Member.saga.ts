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
import { GetLoginState, GetMemberState } from "../api/Member.api";

function* getLoginState() {
  try {
    const token = sessionStorage.getItem("Token");
    // if (token) {
    console.log("유저통신전");
    const userdata: AxiosResponse = yield call(GetLoginState, token);
    console.log("유저통신후");
    // console.log(userdata);
    yield put(memberActions.setMember(userdata));
    // }
  } catch (err) {
    console.log(err);
  }
}

function* watchMemberState() {
  yield takeLatest(memberActions.getMember, getLoginState);
}

export default function* MemberSaga() {
  yield all([fork(watchMemberState)]);
}
