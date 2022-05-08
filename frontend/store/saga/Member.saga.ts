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
import { GetLoginState, GetMypageState, KakaoLogin } from "../api/Member.api";
import Router from "next/router";

// 카카오 사가
function* getKakaoKey() {
  interface tokentype extends AxiosResponse {
    jwt: string;
    newUser: boolean;
  }
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response: tokentype = yield call(KakaoLogin, code);
    // console.log(response);
    // console.log("##카카오사가");
    // console.log(code);
    yield put(memberActions.getKakaoKeySuccess(response.jwt));
    yield call(getLoginState);
    Router.push("/");
    // if (response.newUser) {
    //   Router.push("/user/profileEdit")
    // } else {
    //   Router.push("/");
    // }
  } catch (err) {
    yield put(memberActions.getKakaoKeyError(err));
    Router.push("/");
  }
}

function* watchGetKakaoKey() {
  yield takeLatest(memberActions.getKakaoKey, getKakaoKey);
}

// 마이페이지 사가
// function* getMypageState(memberId: any) {
//   const token = sessionStorage.getItem("Token");
//   // console.log(memberId.payload);
//   // console.log("##memberId");
//   try {
//     // console.log("마이페이지 통신전");
//     const userdata: AxiosResponse = yield call(
//       GetMypageState,
//       memberId.payload,
//       token
//     );
//     // console.log("마이페이지 통신후");
//     yield put(memberActions.setMypage(userdata));
//   } catch (err) {
//     console.log(err);
//     yield put(memberActions.setMypageFail(err));
//   }
// }

// function* watchMypageState() {
//   yield takeLatest(memberActions.getMypage, getMypageState);
// }
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
  yield all([
    fork(watchMemberState),
    // fork(watchMypageState),
    fork(watchGetKakaoKey),
  ]);
}
