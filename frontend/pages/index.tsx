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
      <HeroSection />
    </div>
  );
};

export default Home;
