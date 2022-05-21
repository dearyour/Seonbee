import React, { useEffect, useState } from "react";
import { Card, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMember from "store/interface/social/cardmember";
import Btn from "components/commons/Btn";
import styled from "@emotion/styled";
import GetImage from "utils/GetImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useRouter } from "next/router";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const UserCard = ({
  nickname,
  verse,
  imageString,
  wishlist,
  scheduleList,
  friendId,
}: CardMember) => {
  const router = useRouter();
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    // console.log(error);
    if (isNaN(price)) {
      setError("숫자만 입력해주세요.");
    } else {
      setError("");
    }
  }, [price]);
  return (
    <ProfileCard className="shadow-none">
      {/* 선물 추천받기 모달 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            선물 추천 받기
          </Typography>
          <div className="my-1">원하시는 가격을 입력해주세요. </div>
          <Typography id="modal-modal-description" className="d-flex">
            <TextField
              id="outlined-basic"
              label="ex) 10000"
              variant="outlined"
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !error) {
                  router.push(
                    {
                      pathname: "/recommend",
                      query: {
                        friendId: friendId,
                        price: price,
                        name: nickname,
                      },
                    },
                    { pathname: "/recommend" }
                  );
                }
              }}
            />
            <Btn
              className="my-auto ms-2"
              onClick={() => {
                if (error) {
                  return;
                }
                router.push(
                  {
                    pathname: "/recommend",
                    query: { friendId: friendId, price: price, name: nickname },
                  },
                  { pathname: "/recommend" }
                );
              }}
            >
              추천
            </Btn>
          </Typography>
          <div className="p-1 text-danger">{error}</div>
        </Box>
      </Modal>
      {/* 본문 */}
      <CardContent>
        <div className="row">
          <div className="col-4">
            <Profile src={GetImage(imageString)} alt="" />
            <div className="text-center">{nickname}</div>
          </div>
          <div className="col-8">
            {/* {scheduleList.length > 0 ? (
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
            )} */}
            {verse ? (
              <Card className="my-1">
                <div className="my-1 fw-bold p-1">&quot;{verse}&quot;</div>
              </Card>
            ) : (
              <Card className="my-1 p-2">아직 등록된 문구가 없습니다</Card>
            )}
            {wishlist.length > 0 ? (
              <Card className="">
                <div className="my-1 p-1">
                  <span>{nickname}</span>님의 갖고싶소
                </div>
                <Swiper
                  modules={[Navigation, A11y]}
                  spaceBetween={20}
                  slidesPerView={4}
                  className="p-1"
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
              </Card>
            ) : (
              <Card className="my-3 p-4 ps-2">
                아직 갖고싶은 선물이 없습니다.
              </Card>
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
                둘러보기
              </Btn>
              <Btn filled={true} onClick={handleOpen}>
                선물 추천받기
              </Btn>
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
