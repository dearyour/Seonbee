import styled from '@emotion/styled';
import moment from 'moment';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Calendar, { OnChangeDateCallback } from 'react-calendar';

type Props = {}

const SideCalendar = (props: Props) => {
  const [value, onChange] = useState<Date>(new Date());
  const [days, setDays] = useState<string[]>([]);
  const date_change: OnChangeDateCallback = (v: Date, e: ChangeEvent<HTMLInputElement>) => {
    onChange(v)
    console.log(v)
  }


  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const Dot = styled.div`
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    margin-left: 1px;
  `
  return (
    <div className='px-2'>

      <Calendar
        onChange={date_change}
        value={value}
        formatMonthYear={(locale, date) => moment(date).format("YY.MM")}
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={({ activeStartDate, date, view }) => {
          if (days.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  <Dot ></Dot>
                </div>
              </>
            );
          } else {
            return null
          }
        }}
      />
    </div>

  )
}

export default SideCalendar

