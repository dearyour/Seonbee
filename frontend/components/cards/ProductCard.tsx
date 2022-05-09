import React from "react";
import Image from "next/image";

import imageURL from "public/shoes.png";
import Btn from "components/commons/Btn";
import styled from "@emotion/styled";

interface Props {
  name: string;
  price: number;
  buyUrl: string;
  imageUrl: string;
  wishlistId?: number;
  productId?: number;
  giverId?: number;
  giverName?: String;
  isSaved?: boolean;
}

const ProductCard = (props: Props) => {
  return (
    <div>
      <div className="containerc">
        <div className="card">
          <div className="imgBx d-flex justify-content-center">
            <Image
              alt="cards"
              width={"100%"}
              height={"100%"}
              //   layout="fill"
              src={props.imageUrl}
              className="rounded"
            />
          </div>
          <div className="contentBx">
            <h2>{props.name}</h2>

            <div className="color">
              <h3>가격 : {props.price} 원</h3>
            </div>
            {/* <a href="#">상품 구경하기</a> */}
            <Btn className="mx-2" filled={true}>
              상품 구경하기
            </Btn>
            <Btn>test</Btn>
          </div>
        </div>
      </div>

      {/* {props.giverId && <div>{props.giverName}님이 선물하실 예정입니다.</div>} */}
    </div>
  );
};

export default ProductCard;
