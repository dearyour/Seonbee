/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "styles/profile/profileMain.module.css";
import { DdayType } from "store/interface/lantern";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/slice";
import { profileActions } from "store/slice/profile";

type Props = {
  ddays: DdayType[];
};

const DDays = (props: Props) => {
  const dispatch = useDispatch();
  const ddaysLen = props.ddays ? props.ddays.length : 0;
  const lanternFestivals = useSelector(
    (state: RootState) => state.profile.lanternFestivals
  );
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>(0);

  useEffect(() => {
    if (props.ddays && props.ddays.length > 0) {
      setSelectedScheduleId(props.ddays[0].scheduleId);
    }
  }, [props.ddays]);

  const ddays = () => {
    const result = new Array(ddaysLen).fill(null);
    for (let i = 0; i < ddaysLen; i++) {
      const dday = props.ddays[i];
      const title = dday.title ? dday.title : "제목없음";
      const scheduleDate =
        dday.scheduleDate > 0
          ? "+" + String(dday.scheduleDate)
          : dday.scheduleDate < 0
          ? String(dday.scheduleDate)
          : "-" + String(dday.scheduleDate);
      result[i] = (
        <div
          className={
            (selectedScheduleId === dday.scheduleId ? "selected_tag" : "tag") +
            " clickable me-2 my-1"
          }
          onClick={() => {
            onClickDday(i);
            setSelectedScheduleId(dday.scheduleId);
          }}
        >
          {title} D{scheduleDate}
        </div>
      );
    }
    return result;
  };
  const lanternFestivalLen = lanternFestivals.length;
  const onClickDday = (index: number) => {
    for (let i = 0; i < lanternFestivalLen; i++) {
      if (lanternFestivals[i].scheduleId === props.ddays[index].scheduleId) {
        const newLanternFestival = lanternFestivals[i];
        dispatch(profileActions.setLanternFestival(newLanternFestival));
        break;
      }
    }
  };
  return (
    <>
      <div className={styles.ddays_container + " mb-3 d-flex tags"}>
        {ddays()}
      </div>
    </>
  );
};

export default DDays;
