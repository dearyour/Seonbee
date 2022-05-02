import axios from "axios";
const GetMemberurl = process.env.NEXT_PUBLIC_BACK + "member/";

export const GetLoginState = (token: string | null) => {
  return axios({
    method: "GET",
    url: GetMemberurl + "auth",
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

export const GetMemberState = (
  memberId: number | null,
  token: string | null
) => {
  return axios({
    method: "GET",
    url: GetMemberurl + memberId,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return console.log(err.response);
    });
};
