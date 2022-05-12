import React, { useEffect } from "react";
import styles from "styles/profile/profileLantern.module.css";
import { RootState } from "store/slice";
import { useDispatch, useSelector } from "react-redux";
import LanternFestivalCard from "./LanternFestivalCard";
import axiosConnector from "utils/axios-connector";
import { profileActions } from "store/slice/profile";

type Props = {};

const LanternFestivalCardList = (props: Props) => {
  const dispatch = useDispatch();
  const hostId = useSelector((state: RootState) => state.profile.hostId);
  const lanternFestivals = useSelector(
    (state: RootState) => state.profile.lanternFestivals
  );
  const lanternFestivalsLen = lanternFestivals ? lanternFestivals.length : 0;

  useEffect(() => {
    dispatch(profileActions.getLanternFestivals(hostId));
  }, []);

  const lanternFestivalCards = () => {
    const result = new Array(lanternFestivalsLen).fill(null);
    for (let i = 0; i < lanternFestivalsLen; i++) {
      const lanternFestival = lanternFestivals[i];
      result[i] = (
        <div className="me-3">
          <LanternFestivalCard lanternFestival={lanternFestival} />
        </div>
      );
    }
    return result;
  };

  return (
    <>
      <div className={styles.lantern_festivals}>{lanternFestivalCards()}</div>
    </>
  );
};

export default LanternFestivalCardList;
