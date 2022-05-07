import React from "react";
import styles from "styles/profile/profileLantern.module.css";
import { RootState } from "store/slice";
import { useDispatch, useSelector } from "react-redux";
import LanternFestivalCard from "./LanternFestivalCard";
import axiosConnector from "utils/axios-connector";

type Props = {};

const LanternFestivalCardList = (props: Props) => {
  const hostId = useSelector((state: RootState) => state.member.hostId);
  const lanternFestivals = useSelector(
    (state: RootState) => state.member.lanternFestivals
  );
  const lanternFestivalsLen = lanternFestivals ? lanternFestivals.length : 0;

  const getLanternFestivals = () => {
    axiosConnector({
      method: "GET",
      url: `profile/lantern/${hostId}`,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const lanternFestivalCards = () => {
    const result = new Array(lanternFestivalsLen).fill(null);
    for (let i = 0; i < lanternFestivalsLen; i++) {
      const lanternFestival = lanternFestivals[i];
      result[i] = (
        <div>
          <LanternFestivalCard lanternFestival={lanternFestival} />
        </div>
      );
    }
    return result;
  };

  return <>{lanternFestivalCards()}</>;
};

export default LanternFestivalCardList;
