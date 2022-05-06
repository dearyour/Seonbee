/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "styles/profile/profileMain.module.css";
import TextField from "@mui/material/TextField";
import { lanternImages } from "styles/profile/LanternElements";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import Btn from "components/commons/Btn";

type Props = {
  onClick: Function;
};

const LanternCreateModal = (props: Props) => {
  const [selectedLantern, setSelectedLantern] = useState<number>(0);
  const [msg, setMsg] = useState<string>("");

  const lanterns = () => {
    const result = new Array(8).fill(null);
    for (let i = 0; i < 8; i++) {
      const lantern = lanternImages[i];
      result[i] = (
        <div
          key={i}
          className={
            (i === selectedLantern
              ? styles.selected_lantern
              : styles.unselected_lantern) + " mb-2 me-3 clickable"
          }
          onClick={() => setSelectedLantern(i)}
        >
          <Image src={lantern} alt={`lantern${i}`} width={200} height={240} />
        </div>
      );
    }
    return result;
  };

  const onClickComplete = () => {
    console.log("onClickComplete");
  };

  return (
    <>
      <div className={styles.create_lantern_modal + " d-flex flex-column p-4"}>
        <div
          onClick={() => props.onClick()}
          className={styles.icon + " clickable"}
        >
          <MdOutlineClose size="24" color="#64543e" />
        </div>
        <div className="font_2 font_color text-center mt-3 mb-4">
          <span className="bold me-1">오연서</span>
          <span>님에게 연등 달기</span>
        </div>
        {/* 축하 메시지 */}
        <TextField
          id="outlined-multiline-static"
          label="축하 메시지"
          multiline
          rows={6}
          variant="filled"
          color="primary"
          onChange={(e) => setMsg(e.target.value)}
        />
        {/* 연등 Create Modal */}
        <div className="semi_bold font_3 font_color my-3">연등 선택</div>
        <div>
          <div className={styles.lantern_box}>
            <div className={styles.lantern_choices + " d-flex"}>
              {lanterns()}
            </div>
          </div>
        </div>
        <div className="text-end mt-2">
          {msg ? (
            <Btn filled={true} onClick={() => oncClickComplete()}>
              연등 달기
            </Btn>
          ) : (
            <Btn filled={true} isDisabled={true}>
              연등 달기
            </Btn>
          )}
        </div>
      </div>
    </>
  );
};

export default LanternCreateModal;
