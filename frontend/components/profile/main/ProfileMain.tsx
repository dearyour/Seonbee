/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { RootState } from "store/slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "styles/profile/profileMain.module.css";
import DDays from "./DDays";
import LanternFestival from "./LanternFestival";
import { profileActions } from "store/slice/profile";

type Props = {
  hostId: any;
};

const ProfileMain = (props: Props) => {
  const dispatch = useDispatch();
  const lanternFestival = useSelector(
    (state: RootState) => state.profile.lanternFestival
  );
  const lanternFestivals = useSelector(
    (state: RootState) => state.profile.lanternFestivals
  );
  const ddays = useSelector((state: RootState) => state.profile.ddays);
  const ddaysLen = ddays.length;

  useEffect(() => {
    for (let i = 0; i < ddaysLen; i++) {
      if (lanternFestivals[i].scheduleId === ddays[0].scheduleId) {
        const newLanternFestival = lanternFestivals[i];
        dispatch(profileActions.setLanternFestival(newLanternFestival));
        break;
      }
    }
    dispatch(profileActions.getLanternFestivals(props.hostId));
  }, []);

  return (
    <>
      <div>
        {lanternFestivals.length > 0 ? (
          <div>
            <DDays ddays={ddays} />
            <LanternFestival lanternFestival={lanternFestival} />
          </div>
        ) : (
          <div
            className={
              styles.lantern_festival +
              " d-flex justify-content-center align-items-center"
            }
          >
            현재 열린 연등회가 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileMain;
