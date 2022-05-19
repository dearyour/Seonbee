import React from 'react';
import Join from 'components/account/Join';
import Head from 'next/head';
function login() {
  return (
    <>
      <Head>
        <title>선비 | 로그인</title>
      </Head>
      <Join />
    </>
  );
}

export default login;
