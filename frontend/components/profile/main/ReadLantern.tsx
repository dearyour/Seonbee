/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "styles/profile/profileMain.module.css";
import { lanternImages } from "styles/profile/LanternElements";
import { LanternType } from "store/interface/Lantern";
import Image from "next/image";
import LanternReadModal from "./LanternReadModal";

type Props = {
  lantern: LanternType;
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
      </div>
    </>
  );
};

export default ReadLantern;
