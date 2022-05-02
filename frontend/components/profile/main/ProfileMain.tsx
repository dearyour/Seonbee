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
        <div>
          <img
            src="https://dthezntil550i.cloudfront.net/3q/latest/3q1708081746157540000130612/1280_960/a34307ac-b2ac-4fa7-b816-31d231253cdf.png"
            alt="연등회 배경"
            className={styles.lantern_bg}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
