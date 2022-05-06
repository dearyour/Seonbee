import axios from "axios";
const GetMemberurl = process.env.NEXT_PUBLIC_BACK;

export const GetLoginState = (token: string | null) => {
  return axios({
    method: "GET",
    url: GetMemberurl + "member/auth",
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      console.log(res.data.memberAuthDto);
      return res.data.memberAuthDto;
    })
    .catch((err) => {
      return console.log(err.response);
    });
};

export const GetMyProfileState = (
  memberId: object | null,
  token: string | null
) => {
  return axios({
    method: "GET",
    url: GetMemberurl + "profile/" + memberId,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      console.log(res.data.member);
      return res.data.member;
    })
    .catch((err) => {
      return console.log(err.response);
    });
};
