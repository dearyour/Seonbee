/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/profile/profileMain.module.css";
import Lantern from "./Lantern";

type Props = {
  onClick: Function;
};

const LanternList = (props: Props) => {
  const lanterns = () => {
    const result = new Array(15).fill(null);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        const top = String(1 + 12 * i + 0.9 * j) + "vh";
        const left = String(2 + j * 9) + "vw";
        const index = i * 6 + j;
        const style = {
          top,
          left,
          position: "absolute",
          zIndex: 5,
        } as const;
        result[index] = (
          <div style={style} onClick={(e) => props.onClick(index)}>
            <Lantern />
          </div>
        );
      }
    }
    return result;
  };

  return <>{lanterns()}</>;
};

export default LanternList;
