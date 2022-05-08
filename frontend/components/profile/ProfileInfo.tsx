/* eslint-disable @next/next/no-img-element */
import Btn from "components/commons/Btn";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/slice";
import styles from "styles/profile/profileComp.module.css";

type Props = {};

const ProfileInfo = (props: Props) => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const infoNames = ["생일", "MBTI", "직업", "관심사", "좋아하는", "싫어하는"];
  const infoKeys = [
    "birthday",
    "mbit",
    "job",
    "interest",
    "likelist",
    "banlist",
  ]; // 회원 받을 때 직업 추가 필요

  const infos = () => {
    const infoNamesLen = infoNames.length;
    const result = [];
    for (let i = 0; i < infoNamesLen; i++) {
      const infoName = infoNames[i];
      const infoKey = infoKeys[i];
      const infoContent = profile[infoKey];
      if (infoContent) {
        result.push(
          <div className={styles.info}>
            <span className={styles.name}>{infoName}</span>
            <span className={styles.content}>{infoContent}</span>
          </div>
        );
      }
    }
    return result;
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-between ps-4 py-4 text-center">
        <div>
          <img
            src={"data:image/png;base64," + profile.imageString}
            alt="프로필 이미지"
            className={styles.profile_img}
          />
          <div className="font_2 font_color mt-3">{profile.nickname}</div>
          <div className={styles.infos + " d-flex flex-column mt-3 mb-3"}>
            {infos()}
          </div>
        </div>
        <div>
          <Btn filled={true} className="me-2 mb-3">
            벗 맺기 신청
          </Btn>
          <Btn filled={true} className="ms-2 mb-3">
            선물 추천
          </Btn>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
