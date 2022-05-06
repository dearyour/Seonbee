import React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMember from "store/interface/social/cardmember";
import Btn from "components/commons/Btn";
import styled from "@emotion/styled";
import GetImage from "utils/GetImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

const UserCard = ({
  nickname,
  verse,
  imageString,
  wishlist,
  scheduleList,
}: CardMember) => {
  return (
    <Card className="">
      <CardContent>
        <div className="row">
          <div className="col-4 py-auto">
            <Profile src={GetImage(imageString)} alt="" />
            <div className="text-center">{nickname}</div>
          </div>
          <div className="col-8">
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={20}
              slidesPerView={2.3}
            >
              {scheduleList.map((now, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Btn small={true} className="w-100">
                      {now.title} {now.dday}
                    </Btn>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="my-1">&quot;{verse}&quot;</div>
            <div className="my-1">
              <span>{nickname}</span>님의 갖고싶소
            </div>
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={20}
              slidesPerView={4}
            >
              {wishlist.map((now: any, index: number) => {
                return (
                  <SwiperSlide className="" key={index}>
                    <ProductImg src={now} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="mt-1">
              <Btn className="me-2" filled={true}>
                선물 추천받기
              </Btn>
              <Btn filled={true}>축하 서신</Btn>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Profile = styled.img`
  border-radius: 100%;
  width: 100%;
  /* height: 100%; */
  object-fit: scale-down;
`;

const ProductImg = styled.img`
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
  opacity: 50%;
`;

export default UserCard;
