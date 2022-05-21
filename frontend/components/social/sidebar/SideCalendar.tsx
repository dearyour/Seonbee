import styled from "@emotion/styled";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import Calendar, {
  CalendarTileProperties,
  OnChangeDateCallback,
} from "react-calendar";
import FriendSchedule from "store/interface/social/friendschedule";
import axiosConnector from "utils/axios-connector";
import SideCalendarDate from "./SideCalendarDate";

type Props = {};

const SideCalendar = (props: Props) => {
  const [value, onChange] = useState<Date>();
  const [days, setDays] = useState<string[]>([]);
  const [data, setData] = useState<FriendSchedule[]>([]);
  const [showdate, setShowDate] = useState<FriendSchedule[]>([]);

  // 달력 날짜 변경 시 해당하는 기념일 보여주기
  const date_change: OnChangeDateCallback = (
    v: Date,
    e?: ChangeEvent<HTMLInputElement>
  ) => {
    onChange(v);
    // const now = moment(v).format("YYYY.MM.DD");
    // setShowDate(
    //   data.filter((schedule: FriendSchedule) => {
    //     return schedule.scheduleDate === now;
    //   })
    // );
  };
  // 처음 접속 시 오늘 기념일 안 보여주던 것 수정하기 위해 useEffect로 변경
  useEffect(() => {
    if (!value) {
      return;
    }
    const now = moment(value).format("YYYY.MM.DD");
    setShowDate(
      data.filter((schedule: FriendSchedule) => {
        return schedule.scheduleDate === now;
      })
    );
  }, [value]);

  useEffect(() => {
    axiosConnector({
      method: "GET",
      url: "friend/schedule",
    })
      .then((res) => {
        // console.log(res);
        setDays(
          res.data.friends.map((friend: FriendSchedule) => {
            return friend.scheduleDate;
          })
        );
        setData(res.data.friends);
        onChange(new Date());
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  // react18 react-calendar 버그 수정
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // 달력에 점 추가
  const Dot = styled.div`
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 40%;
  `;

  const addDot = ({ activeStartDate, date, view }: CalendarTileProperties) => {
    if (days.find((x) => x === moment(date).format("YYYY.MM.DD"))) {
      return (
        <>
          <div className="position-relative">
            <Dot></Dot>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="px-2 rounded">
      <Calendar
        onChange={date_change}
        value={value}
        formatMonthYear={(locale, date) => moment(date).format("YY.MM")}
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={addDot}
        className="mx-auto rounded"
      />
      <SideCalendarDate props={showdate}></SideCalendarDate>
    </div>
  );
};

export default SideCalendar;
