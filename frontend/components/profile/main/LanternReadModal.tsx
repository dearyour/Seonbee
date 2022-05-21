/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "styles/profile/profileMain.module.css";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import Btn from "components/commons/Btn";
import { LanternType } from "store/interface/lantern";
import letterBg from "public/images/letter3.jpg";
import { useSelector } from "react-redux";
import { RootState } from "store/slice";

type Props = {
  onClickClose: Function;
  onClickDelete: Function;
  lantern: LanternType;
};

const LanternReadModal = (props: Props) => {
  const uid = useSelector((state: RootState) => state.member.info.memberId);

  return (
    <>
      {props.lantern ? (
        <div className={styles.read_lantern_modal}>
          <div className={styles.letter_text_container}>
            <div
              onClick={() => props.onClickClose()}
              className={styles.icon + " font_hover clickable"}
            >
              <MdOutlineClose size="24" />
            </div>
            <div
              className={
                styles.read_title + " font_2 font_color text-center mb-4"
              }
            >
              <span className="bold me-1">{props.lantern.nickname}</span>
              <span>님의 연등 메시지</span>
            </div>
            {/* 축하 메시지 */}
            <div className={styles.letter_text + " font_3 font_color"}>
              {props.lantern.content}
            </div>
          </div>
          {props.lantern.guestId === uid && props.lantern ? (
            <div
              className={styles.delete_btn_white + " font_hover_white"}
              onClick={() => props.onClickDelete(props.lantern.lanternId)}
            >
              연등 삭제
            </div>
          ) : null}
          <Image src={letterBg} alt="편지지" />
        </div>
      ) : null}
    </>
  );
};

export default LanternReadModal;
