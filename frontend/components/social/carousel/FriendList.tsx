import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import axiosConnector from "utils/axios-connector";
import GetImage from "utils/GetImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from "swiper";
import Image from "next/image";
import { Card, Skeleton } from "@mui/material";
import hobeetobee from "public/characters/hobeetobee.png";
import { Router, useRouter } from "next/router";
type Props = {};
class DdayFriends {
  nickname: string;
  dday: string;
  imageString: string;
  title: string;
  friendId: number;

  constructor(data: any) {
    this.imageString = data.imageString || "";
    this.nickname = data.nickname || "";
    this.dday = data.dday || "";
    this.title = data.title || "";
    this.friendId = data.friendId || 0;
  }
}
function DdayList(data: Array<DdayFriends>): DdayFriends[] {
  return data.map((people) => {
    return new DdayFriends(people);
  });
}

const FriendList = (props: Props) => {
  const [members, setMembers] = useState<DdayFriends[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    axiosConnector({
      method: "GET",
      url: "friend/dday",
    })
      .then((res) => {
        // console.log(res);
        setMembers(DdayList(res.data.friends));
      })
      .catch((err) => {
        console.log(err.response);
      });
    setIsLoading(false);
  }, []);

  return (
    <div>
      {!isLoading && members.length > 0 ? (
        <Swiper
          modules={[A11y, Mousewheel, Scrollbar]}
          spaceBetween={30}
          mousewheel={true}
          scrollbar={{ draggable: true }}
          slidesPerView={3}
          breakpoints={{
            // when window width is >= 640px
            // when window width is >= 768px
            768: {
              // width: 768,
              slidesPerView: 4,
            },
            1280: {
              // width: 1280,
              spaceBetween: 50,
              slidesPerView: 5,
            },
          }}
        >
          {members.map((member, index) => {
            return (
              <SwiperSlide key={index}>
                <ImgWrap className="mx-2 ">
                  <FriendImg
                    src={GetImage(member.imageString)}
                    onClick={() => {
                      router.push("/profile/" + String(member.friendId));
                    }}
                    alt=""
                  />
                  <Content>{member.dday}</Content>
                  <Dday>{member.title}</Dday>
                </ImgWrap>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : !isLoading ? (
        <Card>
          <div className="m-4 p-5">
            <Image
              src={hobeetobee}
              width={83 * 2}
              height={50 * 2}
              alt="sad"
            ></Image>
            <div>등록된 친구들의 기념일이 없어요</div>
          </div>
        </Card>
      ) : (
        <Skeleton
          variant="rectangular"
          width={"80%"}
          height={"80%"}
          className="rounded p-5 fw-bold"
        >
          Loading...
        </Skeleton>
      )}
    </div>
  );
};

const ImgWrap = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: black;
    opacity: 60%;
  }
`;
const FriendImg = styled.img`
  border-radius: 10px;
  object-fit: scale-down;
  width: 100%;
  /* height: 150px; */
  opacity: 70%;
  border: 1.6px solid #64543e;
  ${ImgWrap} &:hover {
    opacity: 50%;
  }
`;

const Content = styled.div`
  position: absolute;
  font-size: 1rem;
  top: 30%;
  left: 30%;
  /* right: 40%; */
  z-index: 2;
  color: white;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  font-weight: bold;
`;
const Dday = styled.div`
  position: absolute;
  top: 50%;
  left: 30%;
  /* right: 40%; */
  z-index: 2;
  color: white;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  font-weight: 700;
`;

export default FriendList;
