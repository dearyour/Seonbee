import React from 'react';
import ProductCard from 'components/cards/ProductCard';
import Shop from 'components/Shop/Home';
import Head from 'next/head';
type Props = {};

const shop = (props: Props) => {
  return (
    <>
      <Head>
        <title>선비 | 저잣거리</title>
      </Head>
      <Shop />
    </>
  );
};

export default shop;
