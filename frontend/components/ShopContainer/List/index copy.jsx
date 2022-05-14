import React, { useState } from "react";
// import './styles.css';
import styles from "./list.module.css";
import styled from "@emotion/styled";
import Image from "next/image";
import Router from "next/router";
import { FaStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
const DEFAULT_IMAGE = "/images/wine2.png";
// const desc = ["1.0", "2.0", "3.0", "4.0", "5.0"];

// let state = {
//   value: 5,
// };

// let handleChange = (value) => {
//   setState({ value });
// };

// let { value } = state;
const CategoryIcon = styled(Image)`
  width: 14em;
  height: 14em;
  padding: 1em;
  margin-left: 0.5em;
  margin-right: 1em;
  cursor: pointer;
  margin-top: 30px;
  &:hover {
    width: 120px;
    height: 420px;
  }
`;

const Radio = styled.input`
  display: none;
`;

const SStar = styled(FaStar)`
  cursor: pointer;
  transition: color 200ms;
`;

const VVoid = styled.div`
  width: 140px;
`;
// const url =
//   // fileURL ||
//   DEFAULT_IMAGE;

const List = ({ list }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div
      className="list-wrap"
      onClick={() => {
        Router.push(`${list.buyUrl}`);
      }}
    >
      <li
        className={`${styles.card} 
`}
      >
        {/* <li className={styles.avatar}>
  </li> */}
        {/* <div
        className={styles.profileImage}
        style={{ backgroundImage: `url(${list.img})` }}
        onClick={() => {
          Router.push(`/user/${list.img}`);
        }}
      ></div> */}
        <VVoid></VVoid>
        <CategoryIcon
          src={list.imageUrl}
          alt="wineImage"
          width={500}
          height={350}
        />
        <VVoid></VVoid>
        {/* <img className={styles.avatar} src={url} alt="wineImage" /> */}
        <div className={styles.info}>
          <h1 className={styles.name}> {list.name}</h1>
          <p className={styles.title}> 스타일 : {list.category1}</p>
          <p className={styles.title}> 원산지 : {list.category2} </p>
          <p className={styles.title}> 품종 : {list.category3}</p>
          <p className={styles.company}> 제조 회사 : {list.recommend}</p>
          <p className={styles.message}>
            평균가 : ₩{" "}
            {list.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          </p>
        </div>
        <div className={styles.right}>
          {/* <h1 className={styles.name}></h1> */}
          <div className={styles.star}>
            <div className={styles.antdstar}>ddd</div>

            <span>
              {/* <Rate tooltips={desc} onChange={handleChange} value={value} /> */}
              {/* {value ? ( */}
              <div className={styles.ratetext} style={{}}>
                평점
              </div>
              {/* ) : (
              ""
            )} */}
            </span>
            <div className={styles.ratetext} style={{}}>
              {/* {desc[value - 1]}  */}
              {/* "ant-rate-text" */}
              최근 리뷰
            </div>
            {/* <span>🌟🌟🌟 {list.ratingAvg}</span> */}
          </div>
        </div>
      </li>
    </div>
  );
};

export default List;
