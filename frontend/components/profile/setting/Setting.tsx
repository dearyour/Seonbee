import React, { useEffect, useState } from "react";
import useProfile from "store/hook/profileHooks";
import axiosConnector from "utils/axios-connector";

type Props = {};

interface Data {
  memberId: number;
  birthday: string;
  email: string;
  nickname: string;
  gender: string;
  mbti: string;
  interest: string;
  likelist: string;
  banlist: string;
  isAdmin: boolean;
  isKakao: boolean;
  image: File;
  verse: string;
}

const Setting = (props: Props) => {
  const [mydata, setMydata] = useState<Data>();
  const { hostId } = useProfile();
  useEffect(() => {
    axiosConnector({
      method: "GET",
      url: "profile/" + String(hostId),
    })
      .then((res) => {
        console.log(res);
        setMydata(res.data.member);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <div className="row w-100">
      <div className="col-12 col-md-4">test</div>
      <div className="col-12 col-md-8">test2</div>
    </div>
  );
};

export default Setting;
