/* eslint-disable @next/next/no-img-element */
import Btn from "components/commons/Btn";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/slice";
import { profileActions } from "store/slice/profile";
import styles from "styles/profile/profileComp.module.css";
import axiosConnector from "utils/axios-connector";

type Props = {};

const ProfileInfo = (props: Props) => {
  const dispatch = useDispatch();
  const hostId = useSelector((state: RootState) => state.profile.hostId);
  const uid = useSelector((state: RootState) => state.member.info.memberId);
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
  const friendId = hostId;

  useEffect(() => {
    dispatch(profileActions.getProfile(hostId));
  }, []);

  const onClickFriendRequest = () => {
    if (!profile.isFriend) {
      axiosConnector({
        method: "GET",
        url: `friend/follow/${friendId}`,
      })
        .then((res) => {
          dispatch(profileActions.getProfile(hostId));
        })
        .catch((err) => {
          // console.log(err.response);
        });
    }
  };

  const onClickAllow = (allow: string) => {
    const formData = {
      friendId,
      allow,
    };
    axiosConnector({
      method: "POST",
      url: `friend/follow/allow`,
      data: formData,
    })
      .then((res) => {
        dispatch(profileActions.getProfile(hostId));
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };

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
        {hostId != uid ? (
          <div>
            {profile.friendStatus === "requested" ? (
              <div>
                <Btn
                  filled={true}
                  className="me-2 mb-3"
                  onClick={() => onClickAllow("OK")}
                >
                  벗 맺기 수락
                </Btn>
                <Btn
                  filled={true}
                  isDisabled={true}
                  className="me-2 mb-3"
                  onClick={() => onClickAllow("NO")}
                >
                  벗 맺기 거절
                </Btn>
              </div>
            ) : profile.friendStatus === "unfriend" ? (
              <Btn
                filled={true}
                className="me-2 mb-3"
                onClick={onClickFriendRequest}
              >
                벗 맺기 신청
              </Btn>
            ) : profile.friendStatus === "requesting" ? (
              <Btn filled={true} isDisabled={true} className="me-2 mb-3">
                벗 맺기 요청중
              </Btn>
            ) : null}
            {/* {profile.friendStatus !== "requested" ? (
              <Btn filled={true} className="ms-2 mb-3">
                선물 추천
              </Btn>
            ) : null} */}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProfileInfo;
