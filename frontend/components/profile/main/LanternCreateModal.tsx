/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileMain.module.css";
import TextField from "@mui/material/TextField";
import lantern1 from "public/images/lantern1.png";
import lantern2 from "public/images/lantern2.png";
import lantern3 from "public/images/lantern3.png";
import lantern4 from "public/images/lantern4.png";
import lantern5 from "public/images/lantern5.png";
import lantern6 from "public/images/lantern6.png";
import lantern7 from "public/images/lantern7.png";
import lantern0 from "public/images/lantern0.png";
import Image from "next/image";
// import CloseIcon from "@mui/icons-material/Close";

type Props = {
  onClick: Function;
};

const LanternCreateModal = (props: Props) => {
  const lanternImages = [
    lantern0,
    lantern1,
    lantern2,
    lantern3,
    lantern4,
    lantern5,
    lantern6,
    lantern7,
  ];
  const lanterns = () => {
    const result = new Array(8).fill(null);
    for (let i = 0; i < 8; i++) {
      const lantern = lanternImages[i];
      result[i] = (
        // <img src={`${process.env.PUBLIC_URL}/images/lantern${i}.png`} alt="" />
        <div className={styles.select_lantern + " me-3"}>
          <Image src={lantern} alt={`lantern${i}`} width={200} height={240} />
        </div>
      );
    }
    return result;
  };

  return (
    <>
      <div className={styles.create_lantern_modal + " d-flex flex-column p-4"}>
        {/* <CloseIcon /> */}
        <div onClick={(e) => props.onClick()}>X</div>
        <div className="font_2 font_color text-center bold mb-3">
          오연서님에게 연등 달기
        </div>
        <TextField
          id="outlined-multiline-static"
          label="축하 메시지"
          multiline
          rows={8}
          variant="filled"
        />
        <div className="semi_bold font_3 font_color my-2">연등 선택</div>
        {/* 연등 Create Modal */}
        <div className={styles.lantern_box + " d-flex"}>
          <div className={styles.select_lanterns + " d-flex"}>{lanterns()}</div>
        </div>
      </div>
    </>
  );
};

export default LanternCreateModal;
