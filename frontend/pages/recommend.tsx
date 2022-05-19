import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffectOnce } from "store/hook/useEffectOnce";
import Image from "next/image";
import Hobee from "public/seonbee.png";
import {
  LeftSpeechBubble,
  RecommendContainer,
} from "styles/chat/RecommendElements";
import {
  ProductsContent,
  Card,
  CardImg,
  CardContent,
  Price,
} from "styles/chat/ProductsElements";
import { Button, Stack } from "@mui/material";
import Btn from "components/commons/Btn";
import { AiOutlineLogin, AiOutlineSave } from "react-icons/ai";
import EllipsisText from "react-ellipsis-text";
import axiosConnector from "utils/axios-connector";

const dummyProductList = [
  {
    recommendId: 10,
    productId: 1,
    name: "상품 이름 1 그런데 상품 이름이 너무 길어요!! 너무너무너무너무 너무너무너무 길어요",
    price: 10000,
    buyUrl: "https://www.naver.com",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    recommendId: 20,
    productId: 2,
    name: "상품 이름 2 상품 이름이 조금 길어요.. 조금",
    price: 20000,
    buyUrl: "https://www.naver.com",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    recommendId: 30,
    productId: 3,
    name: "상품 이름이 짧아요",
    price: 30000,
    buyUrl: "https://www.naver.com",
    imageUrl: "https://picsum.photos/200/300",
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
  const [isMember, setIsMember] = useState<boolean>(false);

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
    if (Object.keys(router.query).length === 0) {
      router.push("/404");
      return;
    }

    console.log(router.query);
    console.log("age", typeof router.query.age);
    console.log("mbti", typeof router.query.mbti);
    console.log("price", typeof router.query.price);

    const { age, name, price, gender, mbti, interest, relation, purpose } =
      router.query;

    axiosConnector({
      method: "POST",
      url: "recommend/receiver",
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
      })
      .catch((err) => {
        console.log(err.response);
      });
  });

  const saveAll = () => {
    console.log("saved all");

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
    console.log(rid, "saved");

    // TODO: 주고싶소 저장 api
  };

  const renderProducts = (list: any) => {
    // console.log(dummyProductList);

    const listItems = list.map((item: any, i: number) => (
      <Card key={item.productId} className="background-image-1">
        <CardImg>
          <Image
            src={item.imageUrl}
            alt="item-imageUrl"
            width={150}
            height={150}
            style={{ borderRadius: "5px" }}
          />
        </CardImg>
        <CardContent>
          <h2>
            <EllipsisText text={item.name} length={"30"} />
          </h2>
          {/* <p>{item.name}</p> */}
          <Price>
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
          </Price>
          <Stack direction="row" spacing={2}>
            <a href={item.buyUrl} target="_blank" rel="noopener noreferrer">
              <Btn>상품 구경하기</Btn>
            </a>
            {sessionStorage.getItem("Token") &&
              (isSaved[i].state ? (
                <Button
                  disabled
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "rgba(0,0,0,0.4)",
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
        <LeftSpeechBubble>
          엣헴, 오다 주웠소.
          <br />
          {router.query.name}님이 기뻐할 것이오.
        </LeftSpeechBubble>
      </Stack>
      {sessionStorage.getItem("Token") ? (
        <Btn filled={true}>
          <AiOutlineSave /> &nbsp; 추천 내역 전체 저장하기
        </Btn>
      ) : (
        <Btn filled={true}>
          <AiOutlineLogin />
          &nbsp; 로그인하고 추천 내역 저장하기
        </Btn>
      )}
      <>{renderProducts(productList)}</>
    </Stack>
  );
}

export default Recommend;
