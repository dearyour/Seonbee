import React, { useEffect, useState } from "react";
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
import { Stack } from "@mui/material";
import Swal from "sweetalert2";

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
  useEffect(() => {
    axiosConnector({
      method: "GET",
      url: "profile/recommend",
    })
      .then((res) => {
        setProducts(res.data.recommendList);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [reset]);

  const SaveProduct = (id: number) => {
    axiosConnector({
      method: "GET",
      url: "profile/recommend/give/" + String(id),
    })
      .then((res) => {
        console.log(res);
        setReset(!reset);
        Swal.fire({
          icon: "success",
          title: "성공적으로 처리되었습니다.",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="overflow-scroll w-100 h-100 ms-3">
      <Swiper
        modules={[Mousewheel, Pagination]}
        mousewheel={true}
        pagination
        slidesPerView={4}
        spaceBetween={50}
        className="h-100 "
      >
        {products.map((now, index) => {
          return (
            <SwiperSlide className="h-100 mt-3 mx-" key={index}>
              <CardP className="background-image-1 w-100 mt-5">
                <div>for {now.receiverName}</div>
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
                  <Price>{now.price} 원</Price>
                  <Stack direction="row" spacing={2}>
                    <a href={now.buyUrl}>
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
    </div>
  );
};

export default Chat;
