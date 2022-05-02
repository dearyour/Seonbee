/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileComp.module.css";

type Props = {};

const ProfileInfo = (props: Props) => {
  const infoNames = ["생일", "MBTI", "직업", "관심사", "좋아하는", "싫어하는"];
  const infoContents = [
    "1990.01.31",
    "ESTJ",
    "배우",
    "#고양이 #운동 #다이어트",
    "애견용품 화장품 옷",
    "단거 화분",
  ];

  const infos = () => {
    const infoNamesLen = infoNames.length;
    const result = new Array(infoNamesLen).fill(null);
    for (let i = 0; i < infoNamesLen; i++) {
      const infoName = infoNames[i];
      const infoContent = infoContents[i];
      result[i] = (
        <div className={styles.info}>
          <span className={styles.name}>{infoName}</span>
          <span className={styles.content}>{infoContent}</span>
        </div>
      );
    }
    return result;
  };

  return (
    <>
      <div className="d-flex flex-column ps-4 py-4 text-center">
        <img
          src="http://file3.instiz.net/data/file3/2018/02/07/d/0/1/d0195222a4a450ce18689a54279204c4.jpg"
          alt="프로필 이미지"
          className={styles.profile_img}
        />
        <div className="d-flex flex-column my-4">{infos()}</div>
      </div>
    </>
  );
};

export default ProfileInfo;
