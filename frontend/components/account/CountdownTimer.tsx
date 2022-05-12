import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function CountdownTimer(props: any) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(3);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (Number(seconds) > 0) {
        setSeconds(Number(seconds) - 1);
      }
      if (Number(seconds) === 0) {
        if (Number(minutes) === 0) {
          clearInterval(countdown);
          props.changeTimerHandle(false, "timer");
        } else {
          setMinutes(Number(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <Typography sx={{ fontSize: "12px", display: "inline" }}>
      &nbsp;남은 시간&nbsp;{minutes}:
      {Number(seconds) < 10 ? "0" + seconds : seconds}
    </Typography>
  );
}
