import styled from "@emotion/styled";
import React from "react";
import Alarm from "./Alarm";
import SideCalendar from "./SideCalendar";
import SearchUser from "./SearchUser";

type Props = {};
const Blue = styled.span`
  color: #38508c;
`;
const SidebarWrap = styled.div`
  border: 1.6px solid #64543e;
  padding: 5px;
  border-radius: 5px;
`;
const SideBar = (props: Props) => {
  return (
    <SidebarWrap className="">
      <div className="p-1 mb-1">
        나의 벗 맺기 <Blue>전보</Blue>
      </div>
      <Alarm></Alarm>
      <div className="p-1 my-1">
        <Blue>벗</Blue>의 연동회
      </div>
      <SideCalendar></SideCalendar>

      <div className="p-1 my-1">
        다른 <Blue>벗</Blue>도 찾아보시오
      </div>
      <SearchUser></SearchUser>
    </SidebarWrap>
  );
};

export default SideBar;
