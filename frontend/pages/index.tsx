import React from 'react';
import Navbar from 'components/commons/bars/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';
import Btn from 'components/commons/Btn';

import HeroSection from 'components/main/HeroSection';
import { Button } from '@mui/material';
import Router from 'next/router';
import styled from '@emotion/styled';
import Features from 'components/main/Features';
import Content from 'components/main/Content';
import Footer from 'components/main/Footer';
import { heroOne, heroTwo, heroThree } from 'components/main/data/HeroData';

const Home: NextPage = () => {
  return (
    // <Asd className="mx-5">
    <>
      <Head>
        <title>당신의 선물비서, 선비</title>
      </Head>
      <HeroSection />
      <Features />
      <Content {...heroOne} />
      <Content {...heroTwo} />
      <Content {...heroThree} />
      <Footer />
    </>
    // </Asd>
  );
};

const Asd = styled.div`
  margin-top: -60px;
  padding-top: 70px;
  padding-bottom: 50px;
  border-bottom: #baa68b solid 2px;

  &:after {
    content: '';
    width: 60px;
    height: 4px;
    background: gray;
    position: absolute;
    bottom: 85px;
  }
`;

export default Home;
