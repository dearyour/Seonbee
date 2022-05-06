import React from "react";
import Image from "next/image";
type Props = {};
import imageURL from "public/shoes.png";
import Btn from "components/commons/Btn";
const Card = (props: Props) => {
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
              src={imageURL}
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
    </div>
  );
};

export default Card;
