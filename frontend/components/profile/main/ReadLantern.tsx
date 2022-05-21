/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileMain.module.css";
import {
  lanternImages,
  blinkLanternImages,
} from "styles/profile/LanternElements";
import { LanternType } from "store/interface/lantern";
import Image from "next/image";

type Props = {
  lantern: LanternType;
  blinkType: number;
};

const ReadLantern = (props: Props) => {
  return (
    <>
      <div className={styles.read_lantern}>
        <Image
          src={lanternImages[props.lantern.lanternType]}
          alt={`lantern${props.lantern.lanternType}`}
          layout="fill"
          objectFit="contain"
        />
        <Image
          src={blinkLanternImages[props.lantern.lanternType]}
          alt={`lantern${props.lantern.lanternType}`}
          layout="fill"
          objectFit="contain"
          className={
            props.blinkType === 1
              ? styles.lantern_blink1
              : props.blinkType === 2
              ? styles.lantern_blink2
              : styles.lantern_blink3
          }
        />
      </div>
    </>
  );
};

export default ReadLantern;
