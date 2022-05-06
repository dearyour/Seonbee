/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileMain.module.css";

type Props = {
  onClick?: Function;
};

const CreateLantern = (props: Props) => {
  return (
    <>
      <div className={styles.create_lantern}>연등 달기</div>
    </>
  );
};

export default CreateLantern;
