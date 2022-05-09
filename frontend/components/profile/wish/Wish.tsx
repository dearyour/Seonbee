import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "components/cards/Productcard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import styled from "@emotion/styled";
import axiosConnector from "utils/axios-connector";
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
  const temp = {
    wishlistId: 1,
    name: "test",
    imageUrl: "https://picsum.photos/250/250",
    buyUrl: "",
    giverId: 2,
    giverName: "test1",
    price: 10000,
  };
  const tempL = [temp, temp, temp, temp, temp, temp];
  useEffect(() => {
    setProducts(tempL);
    axiosConnector({
      method: "GET",
      url: "profile/wish/" + props.hostId,
    })
      .then((res) => {
        console.log(res);
        setProducts(res.data.wishes);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    // <div>
    //   <Swiper modules={[Navigation, Pagination, A11y]} slidesPerView={5}>
    //     {tempL.map((now, index) => {
    //       return (
    //         <SwiperSlide className="" key={index}>
    //           <ProductCard {...now}></ProductCard>
    //         </SwiperSlide>
    //       );
    //     })}
    //     <ProductCard {...products[0]}></ProductCard>
    //   </Swiper>
    // </div>

    <ProductWrap>
      <div className="d-flex flex-nowrap p-3">
        {tempL.map((now, index) => {
          return (
            <div className="mx-2" key={index}>
              <ProductCard {...now}></ProductCard>
            </div>
          );
        })}
        {/* <ProductCard {...products[0]}></ProductCard> */}
      </div>
    </ProductWrap>
  );
};

const ProductWrap = styled.div`
  overflow-x: scroll;
`;
export default Wish;
