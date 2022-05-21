import React from 'react';
import sad from 'public/characters/sad.png';
import Image from 'next/image';
import Head from 'next/head';

type Props = {};

const Custom404 = (props: Props) => {
  return (
    <>
      <Head>
        <title>선비 | 404 Not Found</title>
      </Head>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="">잘못된 접근이거나 페이지를 찾을 수 없어요.</div>
        <Image
          src={sad}
          width={833}
          height={500}
          alt="404"
          className=""
        ></Image>
      </div>
    </>
  );
};

export default Custom404;
