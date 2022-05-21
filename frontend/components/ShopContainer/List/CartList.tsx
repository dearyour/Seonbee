import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import Image from "next/image";
import Router from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { layoutAction } from "store/slice/layout";
import { RootState } from "store/slice";
export class ShopType {
  productId: number;
  price: number;
  name: string;
  brand: string;
  category1: string;
  category2: string;
  category3: string;
  wish: boolean;
  give: string;
  hit: string;
  recommend: string;
  buyUrl: string;
  imageUrl: string;

  constructor(data: any) {
    this.productId = data.productId || 0;
    this.price = data.price || 0;
    this.name = data.name || "";
    this.brand = data.brand || "";
    this.category1 = data.category1 || "";
    this.category2 = data.category2 || "";
    this.category3 = data.category3 || "";
    this.wish = data.wish || "";
    this.give = data.give || "";
    this.hit = data.hit || "";
    this.recommend = data.recommend || "";
    this.buyUrl = data.buyUrl || "";
    this.imageUrl = data.imageUrl || "";
  }
}
const List = ({}) => {
  const dispatch = useDispatch();
  const CartData = useSelector((state: RootState) => state.layout.cartData);

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const __getHitCount = () => {
    const token = sessionStorage.getItem("Token");
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACK + "shop/hit/" + CartData.productId,
      // headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="postCardWrps">
      {/* {CartData.length && ( */}
      <div className="postCards">
        <div className="post__imgs" onClick={__getHitCount}>
          <a href={CartData.buyUrl} target="_blank" rel="noopener noreferrer">
            <div
              className="ImagecardWrp"
              onClick={() => {
                // Router.replace(`${list.buyUrl}`);
                // Router.push(`${CartData.buyUrl}`);
              }}
            >
              {CartData.imageUrl && (
                <Image
                  src={CartData.imageUrl}
                  alt="cardImage"
                  width={400}
                  // width={200}
                  height={520}
                  // height={100}
                />
              )}
            </div>
          </a>
        </div>
        <div className="post__info">
          <div className="post__date">
            <span>
              카테고리 : {CartData.category1} &gt; {CartData.category2} &gt;{" "}
              {CartData.category3}
            </span>
          </div>
          <h1 className="post__title">{CartData.name}</h1>
          <div className="post__date">
            <span>조회수 : {CartData.hit}</span>
            <br />
            <span>추천 수 : {CartData.recommend}</span>
            <br />
            <span>주고싶소 수 : {CartData.give}</span>
            <br />
            <span>갖고싶소 수 : {CartData.wish}</span>
          </div>
          <p className="post__text">
            가격 :{" "}
            {CartData.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            원
          </p>
          <div className="longCardBtnWrp">
            {/* <a
              className="post_cta"
              onClick={() => {
                dispatch(layoutAction.reset());
              }}
            >
              배낭에서 지우기
            </a> */}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default List;
