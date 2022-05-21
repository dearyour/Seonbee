/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "styles/profile/profileLantern.module.css";
import TextField from "@mui/material/TextField";
import { lanternBackgroundImages } from "styles/profile/LanternElements";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import Btn from "components/commons/Btn";
import axiosConnector from "utils/axios-connector";
import { profileActions } from "store/slice/profile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/slice";

type Props = {
  onClick: Function;
};

const LanternFestivalCreateModal = (props: Props) => {
  const dispatch = useDispatch();
  const hostId = useSelector((state: RootState) => state.profile.hostId);
  const [content, setContent] = useState<string>("");
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [selectedLanternBackground, setSelectedLanternBackground] =
    useState<number>(0);

  useEffect(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);

    const dateString = year + "-" + month + "-" + day;
    setScheduleDate(dateString);
  }, []);

  const lanternBackgrounds = () => {
    const result = new Array(8).fill(null);
    for (let i = 0; i < 8; i++) {
      const lantern = lanternBackgroundImages[i];
      result[i] = (
        <div
          key={i}
          className={
            (i === selectedLanternBackground
              ? styles.selected_lantern_background
              : styles.unselected_lantern_background) + " mb-2 me-3 clickable"
          }
          onClick={() => setSelectedLanternBackground(i)}
        >
          <Image
            src={lantern}
            alt={`lantern${i}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      );
    }
    return result;
  };

  const onClickComplete = () => {
    const newScheduleDate = scheduleDate.replace(/-/g, ".");
    const formData = {
      title: content,
      scheduleDate: newScheduleDate,
      background: selectedLanternBackground,
    };
    axiosConnector({
      method: "POST",
      url: `profile/lantern/schedule`,
      data: formData,
    })
      .then((res) => {
        props.onClick();
        dispatch(profileActions.getLanternFestivals(hostId));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <div
        className={
          styles.create_lantern_festival_modal + " d-flex flex-column p-4"
        }
      >
        <div
          onClick={() => props.onClick()}
          className={styles.icon + " font_hover clickable"}
        >
          <MdOutlineClose size="24" />
        </div>
        <div className="font_2 font_color text-center mt-3 mb-4">
          <span className="bold me-1">나의</span>
          <span>연등회 열기</span>
        </div>
        {/* 연등회명 */}
        <TextField
          id="outlined-multiline-static"
          label="연등회명"
          color="primary"
          onChange={(e) => setContent(e.target.value)}
        />
        {/* 연등회 날짜 */}
        {scheduleDate && (
          <TextField
            id="date"
            label="날짜 선택"
            className="mt-4"
            type="date"
            defaultValue={scheduleDate}
            color="primary"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setScheduleDate(e.target.value)}
          />
        )}
        {/* 연등회 배경 선택 */}
        <div className="semi_bold font_3 font_color my-3">연등회 배경 선택</div>
        <div>
          <div className={styles.lantern_background_box}>
            <div className={styles.lantern_background_choices + " d-flex"}>
              {lanternBackgrounds()}
            </div>
          </div>
        </div>
        <div className="text-end mt-2">
          {content ? (
            <Btn filled={true} onClick={() => onClickComplete()}>
              연등회 열기
            </Btn>
          ) : (
            <Btn filled={true} isDisabled={true}>
              연등회 열기
            </Btn>
          )}
        </div>
      </div>
    </>
  );
};

export default LanternFestivalCreateModal;
