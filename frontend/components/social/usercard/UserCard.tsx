import React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMember from "store/interface/social/cardmember";
import Btn from "components/commons/Btn";
import styled from "@emotion/styled";
import GetImage from "utils/GetImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useRouter } from "next/router";
import Image from "next/image";

const UserCard = ({
  nickname,
  verse,
  imageString,
  wishlist,
  scheduleList,
  friendId,
}: CardMember) => {
  const router = useRouter();
  return (
    <ProfileCard className="shadow-none">
      <CardContent>
        <div className="row">
          <div className="col-4 py-auto">
            <Profile src={GetImage(imageString)} alt="" />
            <div className="text-center">{nickname}</div>
          </div>
          <div className="col-8">
            {scheduleList.length > 0 ? (
              <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={20}
                slidesPerView={2}
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
            ) : (
              <div className="m-4"></div>
            )}
            {verse ? (
              <div className="my-1">&quot;{verse}&quot;</div>
            ) : (
              <br></br>
            )}
            <div className="my-1">
              <span>{nickname}</span>님의 갖고싶소
            </div>
            {wishlist.length > 0 ? (
              <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={20}
                slidesPerView={4}
              >
                {wishlist.map((now: any, index: number) => {
                  return (
                    <SwiperSlide className="" key={index}>
                      <ProductImg
                        width={"100%"}
                        height={"100%"}
                        src={now}
                        alt=""
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="my-3 py-2"></div>
            )}
            <div className="mt-1">
              <Btn
                className="me-2"
                filled={true}
                onClick={() => {
                  router.push({
                    pathname: "/profile/" + String(friendId),
                  });
                }}
              >
                선물 추천받기
              </Btn>
              <Btn filled={true}>축하 서신</Btn>
            </div>
          </div>
        </div>
      </CardContent>
    </ProfileCard>
  );
};

const Profile = styled.img`
  border-radius: 100%;
  width: 100%;
  /* height: 100%; */
  object-fit: scale-down;
`;

const ProductImg = styled(Image)`
  border-radius: 10px;
  object-fit: cover;
  /* width: 100%; */
  opacity: 100%;
  outline: 1px solid #64543e;
`;

const ProfileCard = styled(Card)`
  border-radius: 10px;
  border: 1.6px solid #64543e;
  height: 100%;
`;

export default UserCard;
