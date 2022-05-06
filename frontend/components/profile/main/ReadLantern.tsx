/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileMain.module.css";
import { lanternImages } from "styles/profile/LanternElements";
import { Lantern } from "store/interface/Lantern";
import Image from "next/image";

type Props = {
  onClick?: Function;
  lantern: Lantern;
};

const ReadLantern = (props: Props) => {
  return (
    <>
      {/* <img className={styles.read_lantern} src={lanternImages[props.lantern.lanternType]} alt="" /> */}
      <div className={styles.read_lantern}>
        <Image
          src={lanternImages[props.lantern.lanternType]}
          alt={`lantern${props.lantern.lanternType}`}
          width={200}
          height={240}
        />
      </div>
    </>
  );
};

export default ReadLantern;
