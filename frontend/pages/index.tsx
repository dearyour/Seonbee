import React from "react";
import Navbar from "components/commons/bars/Navbar";
import type { NextPage } from "next";
import Head from "next/head";
import HeroSection from "components/main/HeroSection";
import { Button } from "@mui/material";
import Router from "next/router";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>당신의 선물비서, 선비</title>
      </Head>
      <div>
        <Navbar />
        <HeroSection />
        <Button onClick={() => Router.push("/chat")}>선물 추천받기</Button>
      </div>
    </>
  );
};

export default Home;
