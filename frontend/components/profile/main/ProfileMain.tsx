/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileMain.module.css";
import DDays from "./DDays";
import LanternFestival from "./LanternFestival";

type Props = {};

const ProfileMain = (props: Props) => {
  return (
    <>
      <div>
        <DDays />
        <LanternFestival />
      </div>
    </>
  );
};

export default ProfileMain;
