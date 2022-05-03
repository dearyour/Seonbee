import React from "react";
import Navbar from "components/commons/bars/Navbar";
import type { NextPage } from "next";
import Head from "next/head";
import Btn from "components/commons/Btn";

import HeroSection from "components/main/HeroSection";
import { Button } from "@mui/material";
import Router from "next/router";
import styled from "@emotion/styled";

const Home: NextPage = () => {
  return (
    <Asd className="mx-5">
      <Head>
        <title>당신의 선물비서, 선비</title>
      </Head>
      <HeroSection />
    </Asd>
  );
};

const Asd = styled.div`
  margin-top: -70px;
  padding-top: 70px;
  padding-bottom: 50px;
  border: #baa68b solid 2px;
`;

export default Home;
