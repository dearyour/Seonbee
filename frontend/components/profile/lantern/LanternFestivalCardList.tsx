import React from "react";
import styles from "styles/profile/profileLantern.module.css";
import { RootState } from "store/slice";
import { useDispatch, useSelector } from "react-redux";
import LanternFestivalCard from "./LanternFestivalCard";

type Props = {};

const LanternFestivalCardList = (props: Props) => {
  const lanternFestivals = useSelector(
    (state: RootState) => state.member.lanternFestivals
  );
  const lanternFestivalsLen = lanternFestivals ? lanternFestivals.length : 0;

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
