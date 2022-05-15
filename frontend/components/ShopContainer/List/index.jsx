import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Router from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
const List = ({ list }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const __getHitCount = () => {
    const token = sessionStorage.getItem("Token");
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACK + "shop/hit/" + list.productId,
      // headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const __Wishlist = () => {
    const token = sessionStorage.getItem("Token");
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACK + "shop/wish/" + list.productId,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "갖고싶소에 추가 되었습니다.",
          text: "♥",
          icon: "success",
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {}, [list]);

  return (
    <div className="postCardWrp">
      <div className="postCard">
        <div className="post__img" onClick={__getHitCount}>
          <div
            className="ImagecardWrp"
            onClick={() => {
              // Router.replace(`${list.buyUrl}`);
              Router.push(`${list.buyUrl}`);
            }}
          >
            <Image
              src={list.imageUrl}
              alt="cardImage"
              width={500}
              // width={200}
              height={400}
              // height={100}
            />
          </div>
        </div>
        <div className="post__info">
          <div className="post__date">
            <span>
              카테고리 : {list.category1} &gt; {list.category2} &gt;{" "}
              {list.category3}
            </span>
          </div>
          <h1 className="post__title">{list.name}</h1>
          <div className="post__date">
            <span>조회수 : {list.hit}</span>
            <br />
            <span>추천 수 : {list.recommend}</span>
            <br />
            <span>주고싶소 수 : {list.give}</span>
            <br />
            <span>갖고싶소 수 : {list.wish}</span>
          </div>
          <p className="post__text">
            가격 : {list.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            원
          </p>
          <div className="longCardBtnWrp">
            <a className="post_cta" onClick={__Wishlist}>
              내가 갖고 싶소
            </a>

            <a className="post_ctas">벗에게 주고 싶소</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
