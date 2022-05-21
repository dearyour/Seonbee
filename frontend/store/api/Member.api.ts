import axios from "axios";
import { useCallback } from "react";
import axiosConnector from "utils/axios-connector";

export const test = process.env.KAKAO_LOGIN;
const kakaoLoginurl = process.env.NEXT_PUBLIC_BACK + "member/kakao";
const GetMemberurl = process.env.NEXT_PUBLIC_BACK;
// 카카오 로그인
export const KakaoLogin = (code: string | null) => {
  return axios({
    method: "GET",
    url: kakaoLoginurl,
    params: {
      code: code,
    },
  })
    .then((response) => {
      // console.log(response);
      // sessionStorage.setItem("jwt", response.data.jwt);
      return response.data;
    })
    .catch((err) => {
      // console.log(err.response);
      return err;
    });
};
// 로그인 정보
export const GetLoginState = (token: string | null) => {
  return axios({
    method: "GET",
    url: GetMemberurl + "member/auth",
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      // console.log(res.data.memberAuthDto);
      return res.data.memberAuthDto;
    })
    .catch((err) => {
      return console.log(err.response);
    });
};

export const GetMypageState = (
  memberId: object | null,
  token: string | null
) => {
  return axios({
    method: "GET",
    url: GetMemberurl + "profile/" + memberId,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      // console.log(res.data.member);
      return res.data.member;
    })
    .catch((err) => {
      return console.log(err.response);
    });
};

// export const GetLoginState = (token: string | null) => {
//   return axiosConnector({
//     method: "GET",
//     url: "member/auth",
//     // headers: { Authorization: "Bearer " + token },
//   })
//     .then((res) => {
//       console.log(res.data.memberAuthDto);
//       return res.data.memberAuthDto;
//     })
//     .catch((err) => {
//       return console.log(err.response);
//     });
// };

export const GetLanternFestivalState = (hostId: number) => {
  return axiosConnector({
    method: "GET",
    url: `profile/lantern/${hostId}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return console.log(err.response);
    });
};
