import React from 'react';
import { useRouter } from 'next/router';
import { useEffectOnce } from 'store/hook/useEffectOnce';
import Image from 'next/image';
import Hobee from 'public/seonbee.png';
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
import { Stack } from '@mui/material';
import Btn from 'components/commons/Btn';
import { AiOutlineLogin, AiOutlineSave } from 'react-icons/ai';
import EllipsisText from 'react-ellipsis-text';

const dummyProductList = [
  {
    productId: 1,
    name: '상품 이름 1 그런데 상품 이름이 너무 길어요!! 너무너무너무너무 너무너무너무 길어요',
    price: 10000,
    buyUrl: 'https://www.naver.com',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    productId: 2,
    name: '상품 이름 2 상품 이름이 조금 길어요.. 조금',
    price: 20000,
    buyUrl: 'https://www.naver.com',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    productId: 3,
    name: '상품 이름이 짧아요',
    price: 30000,
    buyUrl: 'https://www.naver.com',
    imageUrl: 'https://picsum.photos/200/300',
  },
];
function Recommend() {
  const router = useRouter();

  useEffectOnce(() => {
    if (Object.keys(router.query).length === 0) {
      router.push('/404');
      return;
    }

    console.log(router.query);
    console.log('age', typeof router.query.age);
    console.log('mbti', typeof router.query.mbti);
    console.log('price', typeof router.query.price);
  });

  const renderProducts = (list: any) => {
    // console.log(dummyProductList);

    const listItems = list.map((item: any) => (
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
            <EllipsisText text={item.name} length={'30'} />
          </h2>
          {/* <p>{item.name}</p> */}
          <Price>
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
          </Price>
          <Stack direction="row" spacing={2}>
            <a href={item.buyUrl}>
              <Btn>상품 구경하기</Btn>
            </a>
            {sessionStorage.getItem('Token') && <Btn>추천 내역 저장하기</Btn>}
          </Stack>
        </CardContent>
      </Card>
    ));

    return <ProductsContent>{listItems}</ProductsContent>;
  };

  // const renderProducts = (dummyProductList: any[]) => {
  //   const result = [];

  //   for (let i = 0; i < dummyProductList.length; i++) {
  //     result.push(
  //       <Card key={dummyProductList[i].productId}>
  //         <CardImg>
  //           <Image
  //             src={dummyProductList[i].imageUrl}
  //             alt="item-imageUrl"
  //             width={200}
  //           />
  //         </CardImg>
  //         <CardHeader>
  //           <h2>{dummyProductList[i].name}</h2>
  //           <p>{dummyProductList[i].name}</p>
  //           <Price>
  //             {dummyProductList[i].price}
  //             <span>
  //               <BiWon />
  //             </span>
  //           </Price>
  //           <Btn>상품 보러가기</Btn>
  //         </CardHeader>
  //       </Card>
  //     );
  //   }

  //   return result;
  // };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={4}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Image src={Hobee} alt="hobee" width={100} height={100} />
        <LeftSpeechBubble>엣헴, 오다 주웠소.</LeftSpeechBubble>
      </Stack>
      {sessionStorage.getItem('Token') ? (
        <Btn filled={true}>
          <AiOutlineSave /> &nbsp; 추천 내역 전체 저장하기
        </Btn>
      ) : (
        <Btn filled={true}>
          <AiOutlineLogin />
          &nbsp; 로그인하고 추천 내역 저장하기
        </Btn>
      )}
      <>{renderProducts(dummyProductList)}</>
    </Stack>
  );
}

export default Recommend;
