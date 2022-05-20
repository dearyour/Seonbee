import { Card, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import styled from "@emotion/styled";
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
import Image from "next/image";
import Btn from "components/commons/Btn";
import useProfile from "store/hook/profileHooks";
import { useRouter } from "next/router";
import { BsX } from "react-icons/bs";
import Swal from "sweetalert2";
import sad from "public/characters/sad.png";

interface Props {
  hostId: any;
}

interface WishResponse {
  wishlistId: number;
  name: string;
  price: number;
  buyUrl: string;
  imageUrl: string;
  giverId: number;
  giverName: string;
}

const Wish = ({ props }: { props: any }) => {
  const [products, setProducts] = useState<WishResponse[]>([]);
  const { hostId, memberId } = useProfile();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reset, setReset] = useState<boolean>(false);
  const router = useRouter();
  const wishReserve = (id: number) => {
    axiosConnector({
      method: "POST",
      url: "profile/wish/reserve",
      data: { receiverId: hostId, wishlistId: id },
    })
      .then((res) => {
        setReset(!reset);
        Swal.fire({
          title: "정상적으로 처리되었습니다.",
          text: "",
          icon: "success",
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const ProductDelete = (id: number) => {
    axiosConnector({
      method: "DELETE",
      url: "profile/wish/" + String(id),
    })
      .then((res) => {
        Swal.fire({
          title: "정상적으로 삭제되었습니다.",
          text: "",
          icon: "success",
          showConfirmButton: false,
        });
        setProducts(
          products.filter((now) => {
            return now.wishlistId != id;
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    // setProducts(tempL);
    setIsLoading(true);
    axiosConnector({
      method: "GET",
      url: "profile/wish/" + props,
    })
      .then((res) => {
        // console.log(res);
        setProducts(res.data.wishes);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setIsLoading(false);
  }, [reset]);
  return (
    <div className="w-100 h-100 ms-5 overflow-hidden mt-3 pt-3">
      {!isLoading && products.length > 0 ? (
        <Swiper
          modules={[Mousewheel, Scrollbar]}
          mousewheel={true}
          slidesPerView={3.3}
          spaceBetween={50}
          className="h-100 ps-3"
          scrollbar={{ draggable: true }}
        >
          {products.map((now, index) => {
            return (
              <SwiperSlide className="mt-3" key={index}>
                <CardP className="background-image-1 w-100 mt-5">
                  {String(memberId) === hostId && (
                    <Xicon
                      onClick={() => {
                        ProductDelete(now.wishlistId);
                      }}
                    ></Xicon>
                  )}
                  <CardImg className="">
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
                      className=""
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
                      {String(memberId) === hostId ? null : now.giverId ===
                        memberId ? (
                        <Btn
                          onClick={() => {
                            wishReserve(now.wishlistId);
                          }}
                        >
                          취소
                        </Btn>
                      ) : now.giverId ? null : (
                        <Btn
                          onClick={() => {
                            wishReserve(now.wishlistId);
                          }}
                          className="mb-4"
                        >
                          약속
                        </Btn>
                      )}
                    </Stack>
                    {now.giverName ? (
                      <div className="">
                        {now.giverName}님이 약속하셨습니다.
                      </div>
                    ) : null}
                  </CardContent>
                </CardP>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : !isLoading ? (
        <Card className="w-50 ms-5">
          <div className="p-5 m-3">
            <Image src={sad} width={249} height={150} alt="nondata"></Image>
            <div>등록된 물건이 없습니다</div>
            <span
              className="clickable text-primary "
              onClick={() => {
                router.push("/shop");
              }}
            >
              저잣거리
            </span>
            에서 추가해보세요
          </div>
        </Card>
      ) : (
        <Skeleton
          variant="rectangular"
          width={"80%"}
          height={"80%"}
          className="rounded p-5 m-5 fw-bold"
        >
          Loading...
        </Skeleton>
      )}
    </div>

    // <ProductWrap>
    //   <div className="d-flex flex-nowrap p-3">
    //     {products.length > 0 ? (
    //       products.map((now, index) => {
    //         return (
    //           <div className="mx-2" key={index}>
    //             <ProductCard {...now}></ProductCard>
    //           </div>
    //         );
    //       })
    //     ) : (
    //       <div className="p-5 m-5">비어있어요</div>
    //     )}
    //     {/* <ProductCard {...products[0]}></ProductCard> */}
    //   </div>
    // </ProductWrap>
  );
};

const ProductWrap = styled.div`
  overflow-x: scroll;
`;
const Xicon = styled(BsX)`
  font-size: 24px;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 21;
  cursor: pointer;
`;
export default Wish;
