import React, { Suspense, useEffect, useState } from "react";
import axiosConnector from "utils/axios-connector";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from "swiper";
import {
  ProductsContent,
  Card as CardP,
  CardImg,
  CardContent,
  Price,
} from "styles/chat/ProductsElements";
import EllipsisText from "react-ellipsis-text";
import Btn from "components/commons/Btn";
import Recommend from "pages/recommend";
import Image from "next/image";
import { Card, Skeleton, Stack } from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import hobee from "public/characters/hobee_body.png";
import { ClipLoader, BounceLoader } from "react-spinners";
import styled from "@emotion/styled";

type Props = {};

interface Recommended {
  recommendId: number;
  receiverName: string;
  name: string;
  price: number;
  buyUrl: string;
  imageUrl: string;
  isSaved: boolean;
}

const Chat = (props: Props) => {
  const [products, setProducts] = useState<Recommended[]>([]);
  const [reset, setReset] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    axiosConnector({
      method: "GET",
      url: "profile/recommend",
    })
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data.recommendList.reverse());
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err.response);
        setIsLoading(false);
      });
  }, [reset]);

  const SaveProduct = (id: number) => {
    axiosConnector({
      method: "GET",
      url: "profile/recommend/give/" + String(id),
    })
      .then((res) => {
        // console.log(res);
        // setReset(!reset);
        setProducts(() => {
          return products.map((now) => {
            if (now.recommendId === id) {
              return { ...now, isSaved: !now.isSaved };
            } else {
              return now;
            }
          });
        });
        Swal.fire({
          icon: "success",
          title: "성공적으로 처리되었습니다.",
        });
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };
  return (
    <div className="overflow-scroll w-100 h-100 ms-3 mt-3 pt-3">
      {!isLoading && products.length > 0 ? (
        <Swiper
          modules={[Mousewheel, Scrollbar]}
          mousewheel={true}
          scrollbar={{ draggable: true }}
          slidesPerView={4}
          spaceBetween={50}
          className="h-100 ps-3"
        >
          {products.map((now, index) => {
            return (
              <SwiperSlide className="h-100 mt-3 mx-" key={index}>
                <CardP className="background-image-1 w-100 mt-5">
                  <div>
                    <span className="fw-bold">For</span> {now.receiverName}
                  </div>
                  <CardImg>
                    <Image
                      src={
                        now.imageUrl
                          ? now.imageUrl
                          : "https://picsum.photos/250/250"
                      }
                      alt="item-imageUrl"
                      width={150}
                      height={150}
                      style={{ borderRadius: "5px" }}
                    />
                  </CardImg>
                  <CardContent>
                    <h2>
                      <EllipsisText text={now.name} length={"15"} />
                    </h2>
                    {/* <p>{item.name}</p> */}
                    <Price>{now.price.toLocaleString()} 원</Price>
                    <Stack direction="row" spacing={2}>
                      <a
                        href={now.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Btn>상품 구경하기</Btn>
                      </a>
                      {now.isSaved ? null : (
                        <Btn
                          onClick={() => {
                            SaveProduct(now.recommendId);
                          }}
                        >
                          저장하기
                        </Btn>
                      )}
                    </Stack>
                  </CardContent>
                </CardP>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : !isLoading ? (
        <Card className="w-50 ms-5">
          <div className="p-5 m-3">
            <div>추천받은 상품이 없습니다.</div>
            <div>
              지금 선물을{" "}
              <span
                className="text-primary clickable"
                onClick={() => {
                  router.push("/chat");
                }}
              >
                추천
              </span>
              받아보세요!
            </div>
            <Image
              src={hobee}
              width={57.4 * 2}
              height={99 * 2}
              alt="hobee"
            ></Image>
          </div>
        </Card>
      ) : (
        <Loading className="">
          <BounceLoader size={70}></BounceLoader>
          <div className="mt-5 pt-5">Loading...</div>
        </Loading>
      )}
    </div>
  );
};

const Loading = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
`;

export default Chat;
