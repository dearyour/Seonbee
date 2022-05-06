import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import WsAlarm from "WsClient/wsAlarm";

type Props = {};

const Alarm = (props: Props) => {
  // WsAlarm.activate();
  return (
    <div className="px-2">
      <Card>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default Alarm;
