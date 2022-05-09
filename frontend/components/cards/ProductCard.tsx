import React from "react";
import Image from "next/image";

import imageURL from "public/shoes.png";
import Btn from "components/commons/Btn";
import styled from "@emotion/styled";

interface Props {
  productId: number;
  name: string;
  price: number;
  buyUrl: string;
  imageUrl: string;
  giverId?: number;
  giverName?: String;
  isSaved?: boolean;
}

const ProductCard = (props: Props) => {
  return (
    <div>
      <div className="containerc">
        <div className="card">
          <div className="imgBx">
            <Image
              alt="cards"
              width={350}
              height={200}
              //   layout="fill"
              src={props.imageUrl}
            />
          </div>
          <div className="contentBx">
            <h2>녹색 짚신</h2>
            <div className="size">
              <h3>정보 :</h3>
              <span>7</span>
              {/* <span>8</span>
              <span>9</span>
              <span>10</span> */}
            </div>
            <div className="color">
              <h3>가격 : 90,000 냥</h3>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {/* <a href="#">상품 구경하기</a> */}
            <Btn filled={true}>상품 구경하기</Btn>
          </div>
        </div>
      </div>

      {/* {props.giverId && <div>{props.giverName}님이 선물하실 예정입니다.</div>} */}
    </div>
  );
};

export default ProductCard;
