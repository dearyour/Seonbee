/* eslint-disable @next/next/no-img-element */
import Btn from "components/commons/Btn";
import React, { Suspense, useEffect, useState } from "react";
import styles from "styles/profile/profileMain.module.css";
import LanternCreateModal from "./LanternCreateModal";
import LanternList from "./LanternList";
import { LanternFestivalType } from "store/interface/lantern";
import { lanternBackgroundImages } from "styles/profile/LanternElements";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/slice";
import Image from "next/image";
import axiosConnector from "utils/axios-connector";
import { profileActions } from "store/slice/profile";
import LanternReadModal from "./LanternReadModal";
import { LanternType } from "store/interface/lantern";
import { Skeleton } from "@mui/material";

type Props = {
  lanternFestival: LanternFestivalType;
};

const LanternFestival = (props: Props) => {
  const dispatch = useDispatch();
  const hostId = useSelector((state: RootState) => state.profile.hostId);

  const [mode, setMode] = useState<string>("read");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [showLanternReadModal, setShowLanternReadModal] =
    useState<boolean>(false);
  const [lantern, setLantern] = useState<LanternType>({
    lanternId: 0,
    guestId: 0,
    nickname: "",
    content: "",
    position: 0,
    lanternType: 0,
  });

  const onClickBtn = (e: React.MouseEvent) => {
    if (mode === "read") {
      setMode("create");
    } else {
      setMode("read");
      setShowCreateModal(false);
    }
  };

  const onClickLanternCreate = (index: number) => {
    if (mode === "create") {
      setShowCreateModal(true);
      setPosition(index);
    }
  };

  const onClickLanternRead = (lantern: LanternType) => {
    if (mode === "read") {
      setShowLanternReadModal(true);
      setLantern(lantern);
    }
  };

  const onClickClose = () => {
    if (showCreateModal) {
      setShowCreateModal(false);
    } else {
      setShowLanternReadModal(false);
    }
  };

  const onClickComplete = (content: string, lanternType: number) => {
    const formData = {
      hostId,
      scheduleId: props.lanternFestival.scheduleId,
      content,
      position,
      lanternType,
    };
    // console.log(formData);
    axiosConnector({
      method: "POST",
      url: `profile/lantern`,
      data: formData,
    })
      .then((res) => {
        setMode("read");
        onClickClose();
        dispatch(profileActions.getLanternFestivals(hostId));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onClickDelete = (lanterId: number | undefined) => {
    if (lanterId) {
      axiosConnector({
        method: "DELETE",
        url: `profile/lantern/${lanterId}`,
      })
        .then((res) => {
          setMode("read");
          onClickClose();
          dispatch(profileActions.getLanternFestivals(hostId));
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  return (
    <>
      <div className={styles.lantern_festival}>
        <div className={styles.lantern_bg}>
          <Image
            src={
              lanternBackgroundImages[props.lanternFestival.background]
                ? lanternBackgroundImages[props.lanternFestival.background]
                : lanternBackgroundImages[0]
            }
            alt="연등회 배경"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* 라인 */}
        <div className={styles.line1} />
        <div className={styles.line2} />
        <div className={styles.line3} />
        {/* 연등 */}
        {mode === "create" ? (
          <LanternList mode="create" onClickLantern={onClickLanternCreate} />
        ) : (
          <LanternList mode="read" onClickLantern={onClickLanternRead} />
        )}
        <div className={styles.create_btn + " shadow"}>
          <Btn
            filled={true}
            isDisabled={mode === "create" ? true : false}
            onClick={onClickBtn}
          >
            {mode === "create" ? "달기 종료" : "연등 달기"}
          </Btn>
        </div>
      </div>
      {showCreateModal ? (
        <LanternCreateModal
          onClickClose={onClickClose}
          onClickComplete={onClickComplete}
        />
      ) : null}
      {showLanternReadModal ? (
        <LanternReadModal
          onClickClose={onClickClose}
          onClickDelete={onClickDelete}
          lantern={lantern}
        />
      ) : null}
    </>
  );
};

export default LanternFestival;
