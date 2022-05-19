import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffectOnce } from 'store/hook/useEffectOnce';
import Image from 'next/image';
import Hobee from 'public/characters/hobee_body.png';
import Gift from 'public/gif/gift.gif';
import {
  LeftSpeechBubble,
  RecommendContainer,
} from 'styles/chat/RecommendElements';
import {
  ProductsContent,
  Card,
  CardImg,
  CardContent,
  Price,
} from 'styles/chat/ProductsElements';
import { Button, Stack } from '@mui/material';
import Btn from 'components/commons/Btn';
import { RiKakaoTalkFill, RiArrowGoBackFill } from 'react-icons/ri';
import EllipsisText from 'react-ellipsis-text';
import axiosConnector from 'utils/axios-connector';
import Head from 'next/head';

declare global {
  interface Window {
    Kakao: any;
  }
}

const dummyProductList = [
  {
    recommendId: 10,
    productId: 1,
    name: '상품 이름 1 그런데 상품 이름이 너무 길어요!! 너무너무너무너무 너무너무너무 길어요',
    price: 10000,
    buyUrl: 'https://www.naver.com',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    recommendId: 20,
    productId: 2,
    name: '상품 이름 2 상품 이름이 조금 길어요.. 조금',
    price: 20000,
    buyUrl: 'https://www.naver.com',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    recommendId: 30,
    productId: 3,
    name: '상품 이름이 짧아요',
    price: 30000,
    buyUrl: 'https://www.naver.com',
    imageUrl: 'https://picsum.photos/200/300',
  },
];

interface ProductType {
  recommendId: number;
  productId: number;
  name: string;
  price: number;
  buyUrl: string;
  imageUrl: string;
}

function Recommend() {
  const router = useRouter();

  const [productList, setProductList] = useState<ProductType[]>([]);
  const [isPrepared, setIsPrepared] = useState<boolean>(false);

  const [isSaved, setIsSaved] = useState<{ rid: number; state: boolean }[]>([
    {
      rid: dummyProductList[0].recommendId,
      state: false,
    },
    {
      rid: dummyProductList[1].recommendId,
      state: false,
    },
    {
      rid: dummyProductList[2].recommendId,
      state: false,
    },
  ]);

  useEffectOnce(() => {
    setIsPrepared(false);

    // url을 통한 접근이 아니면 404로
    if (Object.keys(router.query).length === 0) {
      router.push('/404');
      return;
    }

    if (router.query.friendId) {
      // console.log(router.query.friendId);
      axiosConnector({
        method: 'POST',
        url: 'recommend/friend',
        data: { friendId: router.query.friendId, price: router.query.price },
      })
        .then((res) => {
          // console.log(res.data);
          setProductList(res.data.productList);
          setIsSaved(
            res.data.productList.map((now: any) => {
              return { rid: now.recommendId, state: false };
            })
          );
          setIsPrepared(true);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      // 추천 상품 뿌려주기
      const { age, name, price, gender, mbti, interest, relation, purpose } =
        router.query;

      axiosConnector({
        method: 'POST',
        url: 'recommend/receiver',
        data: {
          age: Number(age),
          name: name,
          price: Number(price),
          gender: gender,
          mbti: mbti,
          interest: interest,
          relation: relation,
          purpose: purpose,
        },
      })
        .then((res) => {
          setProductList(res.data.productList);
          setIsPrepared(true);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    // 카카오톡 공유하기를 위한
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });

  const kakaoShare = () => {
    // console.log(window.Kakao);

    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init('29238b0c437e1bd13d1681903254534f');
      }

      kakao.Link.sendCustom({
        templateId: 76817,
        templateArgs: {
          product1_name: productList[0].name,
          product1_price: productList[0].price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          product1_image: productList[0].imageUrl,
          product1_buy: productList[0].buyUrl.slice(34),

          product2_name: productList[1].name,
          product2_price: productList[1].price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          product2_image: productList[1].imageUrl,
          product2_buy: productList[1].buyUrl.slice(34),

          product3_name: productList[2].name,
          product3_price: productList[2].price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          product3_image: productList[2].imageUrl,
          product3_buy: productList[2].buyUrl.slice(34),
        },
      });
    }
  };

  const saveAll = () => {
    // console.log("saved all");

    for (let i = 0; i < productList.length; i++) {
      const rid = productList[i].recommendId;

      for (let j = 0; j < isSaved.length; j++) {
        if (rid === isSaved[j].rid && !isSaved[j].state) {
          // 주고싶소 저장 api
        }
      }
      setIsSaved(
        isSaved.map((v: { rid: number; state: boolean }) =>
          v.rid === rid && !v.state ? { ...v, state: !v.state } : v
        )
      );
    }
  };

  const saveRecommendation = (rid: number) => {
    setIsSaved(
      isSaved.map((v: { rid: number; state: boolean }) =>
        v.rid === rid ? { ...v, state: !v.state } : v
      )
    );
    // console.log(rid, "saved");
    // console.log(isSaved);

    // TODO: 주고싶소 저장 api
    axiosConnector({
      method: 'GET',
      url: 'profile/recommend/give/' + String(rid),
    })
      .then((res) => {
        // console.log(res);
        // setReset(!reset);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const renderProducts = (list: any) => {
    // console.log(dummyProductList);
    if (!list) {
      return;
    }
    const listItems = list.map((item: any, i: number) => (
      <Card key={item.productId} className="background-image-1">
        <CardImg>
          <Image
            src={item.imageUrl}
            alt="item-imageUrl"
            width={150}
            height={150}
            style={{ borderRadius: '5px' }}
          />
        </CardImg>
        <CardContent>
          <h2>
            <EllipsisText text={item.name} length={'24'} />
          </h2>
          {/* <p>{item.name}</p> */}
          <Price>
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
          </Price>
          <Stack direction="row" spacing={2}>
            <a href={item.buyUrl} target="_blank" rel="noopener noreferrer">
              <Btn>상품 구경하기</Btn>
            </a>
            {sessionStorage.getItem('Token') &&
              (isSaved[i].state ? (
                <Button
                  disabled
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: 'rgba(0,0,0,0.4)',
                  }}
                >
                  저장되었소
                </Button>
              ) : (
                <Btn onClick={saveRecommendation} param={item.recommendId}>
                  추천 내역 저장하기
                </Btn>
              ))}
          </Stack>
        </CardContent>
      </Card>
    ));

    return <ProductsContent>{listItems}</ProductsContent>;
  };

  return (
    <>
      <Head>
        <title>선비 | {router.query.name}님을 위한 선물 추천 결과</title>
      </Head>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Image src={Hobee} alt="hobee" width={86} height={149} />
          <LeftSpeechBubble>
            엣헴, 오다 주웠소.
            <br />
            {router.query.name}님이 기뻐할 것이오.
          </LeftSpeechBubble>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Btn filled={true} onClick={kakaoShare}>
            <RiKakaoTalkFill />
            &nbsp; 카카오톡 공유하기
          </Btn>
          {router.query.friendId ? (
            <Btn filled={true} onClick={() => history.go(-1)}>
              <RiArrowGoBackFill />
              &nbsp;사랑방으로 돌아가기
            </Btn>
          ) : (
            <Btn filled={true} onClick={() => history.go(-1)}>
              <RiArrowGoBackFill />
              &nbsp;다시 추천받기
            </Btn>
          )}
        </Stack>
        {isPrepared ? (
          <>{renderProducts(productList)}</>
        ) : (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Image src={Gift} alt="preparing" height={313} width={313} />
            <p>선물을 준비 중이오..</p>
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default Recommend;
