import styled from "@emotion/styled";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import Calendar, {
  CalendarTileProperties,
  OnChangeDateCallback,
} from "react-calendar";
import SideCalendarDate from "./SideCalendarDate";

type Props = {};

const SideCalendar = (props: Props) => {
  const [value, onChange] = useState<Date>(new Date());
  const [days, setDays] = useState<string[]>([]);

  const date_change: OnChangeDateCallback = (
    v: Date,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    onChange(v);
    console.log(v);
  };

  useEffect(() => {
    setDays(["2022-05-02", "2022-05-03"]);
  }, []);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

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
    if (days.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
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
    <div className="px-2">
      <Calendar
        onChange={date_change}
        value={value}
        formatMonthYear={(locale, date) => moment(date).format("YY.MM")}
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={addDot}
      />
      <SideCalendarDate></SideCalendarDate>
    </div>
  );
};

export default SideCalendar;
