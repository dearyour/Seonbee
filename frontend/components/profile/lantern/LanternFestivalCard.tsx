import React from "react";
import styles from "styles/profile/profileLantern.module.css";
import { LanternFestival } from "store/interface/Lantern";
import { lanternBackgroundImages } from "styles/profile/LanternElements";
import Image from "next/image";

type Props = {
  lanternFestival: LanternFestival;
};

const LanternFestivalCard = (props: Props) => {
  const lantern = lanternBackgroundImages[props.lanternFestival.backgroud];
  return (
    <>
      <div className={styles.lantern_card + " font_2 shadow_s"}>
        <div className={styles.lantern_text}>
          <div style={{ zIndex: 2 }}>{props.lanternFestival.scheduleDate}</div>
          <div style={{ zIndex: 2 }}>{props.lanternFestival.title}</div>
        </div>
        <Image
          src={lantern}
          alt={`lanternBackground${props.lanternFestival.backgroud}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </>
  );
};

export default LanternFestivalCard;
