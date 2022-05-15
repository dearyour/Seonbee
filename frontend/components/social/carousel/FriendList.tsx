import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import axiosConnector from "utils/axios-connector";
import GetImage from "utils/GetImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

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
    <div>
      {members.length > 0 ? (
        <Swiper
          modules={[A11y]}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            // when window width is >= 640px
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 4,
            },
            1280: {
              width: 1280,
              spaceBetween: 50,
              slidesPerView: 6,
            },
          }}
        >
          {members.map((member, index) => {
            return (
              <SwiperSlide key={index}>
                <ImgWrap className="mx-2 ">
                  <FriendImg src={GetImage(member.imageString)} alt="" />
                  <Content>{member.dday}</Content>
                  <Dday>{member.title}</Dday>
                </ImgWrap>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="m-4 p-5">비어있어요</div>
      )}
    </div>
  );
};

const ImgWrap = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  &:hover {
    background-color: black;
    opacity: 50%;
  }
`;
const FriendImg = styled.img`
  border-radius: 10px;
  object-fit: scale-down;
  width: 100%;
  /* height: 150px; */
  opacity: 70%;
  border: 1.6px solid #64543e;
`;

const Content = styled.div`
  position: absolute;
  font-size: 1rem;
  top: 30%;
  left: 30%;
  /* right: 40%; */
  z-index: 2;
  color: white;
  font-weight: bold;
`;
const Dday = styled.div`
  position: absolute;
  top: 50%;
  left: 30%;
  /* right: 40%; */
  z-index: 2;
  color: white;
  font-weight: bold;
`;

export default FriendList;
