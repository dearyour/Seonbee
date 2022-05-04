import { Card, CardContent } from "@mui/material";
import React from "react";
import FriendSchedule from "store/interface/social/friendschedule";

const SideCalendarDate = ({ props }: { props: FriendSchedule[] }) => {
  return (
    <div className="mt-2">
      <Card>
        <CardContent>
          {props.length > 0
            ? props.map((schedule: FriendSchedule, index: number) => {
                return (
                  <div key={index} className="row">
                    <div className="col">{schedule.nickname}</div>
                    <div className="col">{schedule.title}</div>
                  </div>
                );
              })
            : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default SideCalendarDate;
