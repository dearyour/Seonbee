import { useCallback } from "react";
import axiosConnector from "utils/axios-connector";

export const GetProfileState = (memberId: any) => {
  return axiosConnector({
    method: "GET",
    url: `profile/${memberId}`,
  })
    .then((res) => {
      console.log("GetProfileState", res.data);
      return res.data.member;
    })
    .catch((err) => {
      return 0;
    });
};

export const GetLanternFestivalsState = (hostId: any) => {
  return axiosConnector({
    method: "GET",
    url: `profile/lantern/${hostId}`,
  })
    .then((res) => {
      return res.data.scheduleDtos;
    })
    .catch((err) => {
      return console.log(err.response);
    });
};
