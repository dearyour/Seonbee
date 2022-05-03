/* eslint-disable @next/next/no-img-element */
import Btn from "components/commons/Btn";
import React, { useState } from "react";
import styles from "styles/profile/profileMain.module.css";
import LanternCreateModal from "./LanternCreateModal";
import LanternList from "./LanternList";

type Props = {};

const LanternFestival = (props: Props) => {
  const [mode, setMode] = useState<string>("read");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const onClickBtn = (e: React.MouseEvent) => {
    if (mode === "read") {
      setMode("create");
    } else {
      setMode("read");
    }
  };

  const onClickLantern = (index: number) => {
    if (mode === "read") {
    } else {
      setShowCreateModal(true);
    }
  };

  const onClickCancel = (e: React.MouseEvent) => {
    console.log("onClickCancel");
    setShowCreateModal(false);
  };

  return (
    <>
      <div className={styles.lantern_festival}>
        <img
          src="https://dthezntil550i.cloudfront.net/3q/latest/3q1708081746157540000130612/1280_960/a34307ac-b2ac-4fa7-b816-31d231253cdf.png"
          alt="연등회 배경"
          className={styles.lantern_bg}
        />
        {/* 라인 */}
        <div className={styles.line1} />
        <div className={styles.line2} />
        <div className={styles.line3} />
        {/* 연등 */}
        {mode === "create" ? <LanternList onClick={onClickLantern} /> : null}
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
      {showCreateModal ? <LanternCreateModal onClick={onClickCancel} /> : null}
    </>
  );
};

export default LanternFestival;
