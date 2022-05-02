import React from "react";
import Navbar from "components/commons/bars/Navbar";
import type { NextPage } from "next";
import Head from "next/head";

import Btn from "components/commons/Btn";
import HeroSection from "components/main/HeroSection";
import { Button } from "@mui/material";
import Router from "next/router";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>당신의 선물비서, 선비</title>
      </Head>

      <div>
        <Navbar />
        <HeroSection />
        <Button onClick={() => Router.push("/chat")}>선물 추천받기</Button>

      <div className="container">
        <div className="row">
          <div className="col-8">
            <h3>
              당신의 선물비서, <span>선비</span>가
            </h3>
            <h3>선물을 추천 해드립니다.</h3>
            <h5>당신의 소중한 사람만을 위한 맞춤형 선물을 추천 받으세요!</h5>
            <div>
              <Btn>지금 추천받기</Btn>
              <Btn>선비에 가입하기</Btn>
            </div>
          </div>
          <div className="col"></div>
        </div>

        <div>
          <HeroSection />
          <Button onClick={() => Router.push("/chat")}>선물 추천받기</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
