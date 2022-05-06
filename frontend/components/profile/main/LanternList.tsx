/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Lantern } from "store/interface/Lantern";
import styles from "styles/profile/profileMain.module.css";
import BlankLantern from "./BlankLantern";
import CreateLantern from "./CreateLantern";
import ReadLantern from "./ReadLantern";

type Props = {
  onClick: Function;
  mode: string;
  lanterns: Array<Lantern>;
};

const LanternList = (props: Props) => {
  const lanternsLen = props.lanterns ? props.lanterns.length : 0;
  console.log("lanternsLen", props.lanterns);
  // 모드에 따라 반환 연등 구분
  const lantern = () => {
    if (props.mode === "create") {
      return <CreateLantern />;
    } else {
      return <BlankLantern />;
    }
  };
  // 연등 리스트
  const lanterns = () => {
    const result = new Array(15).fill(null);
    const styleList = new Array(15).fill(null);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        const top = String(1 + 12 * i + 0.9 * j) + "vh";
        const left = String(2 + j * 9) + "vw";
        const index = i * 6 + j;
        const style = {
          top,
          left,
          position: "absolute",
          zIndex: 5 + i,
        } as const;
        styleList[index] = style;
        result[index] = (
          <div style={style} onClick={(e) => props.onClick(index)}>
            {lantern()}
          </div>
        );
      }
    }
    for (let i = 0; i < lanternsLen; i++) {
      const lantern = props.lanterns[i];
      result[lantern.position] = (
        <div
          style={styleList[lantern.position]}
          onClick={(e) => props.onClick(props.lanterns[i])}
        >
          <ReadLantern lantern={lantern} />;
        </div>
      );
    }
    return result;
  };

  return <>{lanterns()}</>;
};

export default LanternList;
