import React from "react";
import styles from "styles/profile/profileLantern.module.css";
import { LanternFestivalType } from "store/interface/lantern";
import { lanternBackgroundImages } from "styles/profile/LanternElements";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "store/slice/profile";
import { RootState } from "store/slice";

type Props = {
  lanternFestival: LanternFestivalType;
};

const LanternFestivalCard = (props: Props) => {
  const dispatch = useDispatch();
  const lanternBackground =
    lanternBackgroundImages[props.lanternFestival.background];
  const lanternFestivals = useSelector(
    (state: RootState) => state.profile.lanternFestivals
  );
  const lanternFestivalsLen = lanternFestivals ? lanternFestivals.length : 0;
  const onClickLanternFestivalCard = () => {
    for (let i = 0; i < lanternFestivalsLen; i++) {
      if (lanternFestivals[i].scheduleId === props.lanternFestival.scheduleId) {
        const newLanternFestival = lanternFestivals[i];
        dispatch(profileActions.setLanternFestival(newLanternFestival));
        dispatch(profileActions.setShowLanternFestival(true));
        break;
      }
    }
  };
  return (
    <>
      <div onClick={() => onClickLanternFestivalCard()}>
        <div className={styles.lantern_card + " font_2 shadow_s"}>
          <div className={styles.lantern_text}>
            <div style={{ zIndex: 2 }}>
              {props.lanternFestival.scheduleDate}
            </div>
            <div style={{ zIndex: 2 }}>
              {props.lanternFestival.title
                ? props.lanternFestival.title
                : "제목없음"}
            </div>
          </div>
          <Image
            src={lanternBackground}
            alt={`lanternBackground${props.lanternFestival.background}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </>
  );
};

export default LanternFestivalCard;
