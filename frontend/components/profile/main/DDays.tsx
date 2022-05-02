/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileMain.module.css";

type Props = {};

const ProfileMain = (props: Props) => {
  return (
    <>
      <div>
        <div className="mb-3">
          <span className="tag clickable">생일 D-13</span>
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
