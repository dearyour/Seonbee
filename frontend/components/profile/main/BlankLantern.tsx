/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileMain.module.css";
import { lanternImages } from "styles/profile/LanternElements";
import { Lantern } from "store/interface/Lantern";
import Image from "next/image";

type Props = {
  onClick?: Function;
};

const BlankLantern = (props: Props) => {
  return (
    <>
      {/* <img className={styles.read_lantern} src={lanternImages[props.lantern.lanternType]} alt="" /> */}
      <div className={styles.blank_lantern}>.</div>
    </>
  );
};

export default BlankLantern;
