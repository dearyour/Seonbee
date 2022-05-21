import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import Image from "next/image";
import Router from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { layoutAction } from "store/slice/layout";
const List = ({ list, toggleCart, isCartOpen }) => {
  const dispatch = useDispatch();
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
        // console.log(res);
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
        // console.log(res);
        if (res.status == 200) {
          Swal.fire({
            title: "갖고싶소에 추가 되었습니다.",
            text: "",
            icon: "success",
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 500) {
          Swal.fire({
            title: "로그인 후 이용 하실 수 있습니다.",
            text: "",
            icon: "error",
            showConfirmButton: false,
          });
        }
        if (err.response.status === 402) {
          Swal.fire({
            title: "이미 갖고싶소에 추가된 상품입니다.",
            text: "",
            icon: "error",
            showConfirmButton: false,
          });
        }
      });
  };
  const __giveList = () => {
    //만약 그냥 열고닫게하려면 그냥 toggleCart 쓰도록,조건문안쓰고
    if (isCartOpen === true) {
    } else if (isCartOpen === false) {
      toggleCart();
    }
    dispatch(layoutAction.updateCartData(list));
  };
  useEffect(() => {}, [list]);

  // const __whenKeyDown = useCallback(
  //   (e) => {
  //     const code = e.code;
  //     if (code === "Escape") {
  //       __closeDetail();
  //     }
  //   },
  //   [__closeDetail]
  // );
  // useEffect(() => {
  //   window.addEventListener("keydown", __whenKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", __whenKeyDown);
  //   };
  // }, [__whenKeyDown]);
  return (
    <div className="postCardWrp">
      <div className="postCard">
        <div className="post__img" onClick={__getHitCount}>
          <a href={list.buyUrl} target="_blank" rel="noopener noreferrer">
            <div
              className="ImagecardWrp"
              onClick={() => {
                // Router.replace(`${list.buyUrl}`);
                // Router.push(`${list.buyUrl}`);
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
          </a>
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
            <span>선비 추천 수 : {list.recommend}</span>
            <br />
            <span>조회수 : {list.hit}</span>
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

            <a className="post_ctas" onClick={() => __giveList()}>
              벗에게 주고 싶소
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
