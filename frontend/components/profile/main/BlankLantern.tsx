/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileMain.module.css";

type Props = {
  onClick?: Function;
};

const BlankLantern = (props: Props) => {
  return (
    <>
      <div className={styles.blank_lantern}></div>
    </>
  );
};

export default BlankLantern;
