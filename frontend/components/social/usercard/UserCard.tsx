import React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMember from "store/interface/social/cardmember";
import Btn from "components/commons/Btn";
import styled from "@emotion/styled";

const UserCard = ({
  nickname,
  verse,
  imageString,
  product,
  schedule,
}: CardMember) => {
  return (
    <Card className="">
      <CardContent>
        <div className="row">
          <div className="col-3">
            <Profile src={imageString} alt="" />
            <div className="text-center">{nickname}</div>
          </div>
          <div className="col">
            <div className="">
              <Btn className="me-2">asd</Btn>
              <Btn>asd</Btn>
            </div>
            <div>&quot;{verse}&quot;</div>
            <div>
              <span>{nickname}</span>님의 갖고싶소
            </div>
            <div className="row">
              {product.map((now: any, index: number) => {
                return (
                  <div className="col-3" key={index}>
                    <ProductImg src={now.imageUrl} alt="" />
                  </div>
                );
              })}
            </div>
            <div className="mt-1">
              <Btn className="me-2" filled={true}>
                선물 추천받기
              </Btn>
              <Btn filled={true}>축하 서신</Btn>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const Profile = styled.img`
  border-radius: 100%;
  width: 100%;
`;

const ProductImg = styled.img`
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
  opacity: 50%;
`;

export default UserCard;
