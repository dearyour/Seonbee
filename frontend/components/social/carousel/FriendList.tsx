import styled from "@emotion/styled";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import axiosConnector from "utils/axios-connector";
import GetImage from "utils/GetImage";

type Props = {};
class DdayFriends {
  nickname: string;
  dday: string;
  imageString: string;
  title: string;

  constructor(data: any) {
    this.imageString = data.imageString || "";
    this.nickname = data.nickname || "";
    this.dday = data.dday || "";
    this.title = data.title || "";
  }
}
function DdayList(data: Array<DdayFriends>): DdayFriends[] {
  return data.map((people) => {
    return new DdayFriends(people);
  });
}

const FriendList = (props: Props) => {
  const [members, setMembers] = useState<DdayFriends[]>([]);

  useEffect(() => {
    axiosConnector({
      method: "GET",
      url: "friend/dday",
    })
      .then((res) => {
        setMembers(DdayList(res.data.friends));
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Wrap
      centerMode={true}
      centerSlidePercentage={20}
      showThumbs={false}
      infiniteLoop={true}
      swipeable={true}
      showIndicators={false}
      showStatus={false}
    >
      {members.map((member, index) => {
        return (
          <ImgWrap key={index} className="mx-2">
            <FriendImg src={GetImage(member.imageString)} alt="" />
            <Content>{member.dday}</Content>
            <Dday>{member.title}</Dday>
          </ImgWrap>
        );
      })}
    </Wrap>
  );
};

const Wrap = styled(Carousel)`
  /* li {
    min-width: 10%;
  } */
`;
const ImgWrap = styled.div`
  overflow: hidden;
  position: relative;
`;
const FriendImg = styled.img`
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
  opacity: 50%;
`;

const Content = styled.div`
  position: absolute;
  font-size: 1rem;
  top: 30%;
  left: 30%;
  /* right: 40%; */
  z-index: 2;
`;
const Dday = styled.div`
  position: absolute;
  top: 50%;
  left: 30%;
  /* right: 40%; */
  z-index: 2;
`;

export default FriendList;
