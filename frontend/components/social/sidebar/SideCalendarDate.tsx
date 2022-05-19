import styled from "@emotion/styled";
import { Card, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import FriendSchedule from "store/interface/social/friendschedule";

const SideCalendarDate = ({ props }: { props: FriendSchedule[] }) => {
  const router = useRouter();
  const CardWrap = styled(Card)`
    &:hover {
      background-color: aliceblue;
    }
  `;
  return (
    <div className="mt-2">
      <Card>
        <CardContent>
          {props.length > 0
            ? props.map((schedule: FriendSchedule, index: number) => {
                return (
                  <CardWrap
                    key={index}
                    className="d-flex rounded my-2 p-2 border clickable"
                    onClick={() => {
                      router.push({
                        pathname: "/profile/" + String(schedule.friendId),
                      });
                    }}
                  >
                    <div className="me-4 text-success fw-bold">
                      {schedule.nickname}
                    </div>
                    <div className="">{schedule.title}</div>
                  </CardWrap>
                );
              })
            : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default SideCalendarDate;
