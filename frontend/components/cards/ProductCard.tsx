import React from "react";
import Image from "next/image";
import useProfile from "store/hook/profileHooks";
import imageURL from "public/shoes.png";
import Btn from "components/commons/Btn";
import styled from "@emotion/styled";
import axiosConnector from "utils/axios-connector";
import { useRouter } from "next/router";
import { BsX } from "react-icons/bs";

interface Props {
  name: string;
  price: number;
  buyUrl: string;
  imageUrl: string;
  wishlistId?: number;
  productId?: number;
  giverId?: number;
  giverName?: String;
  isSaved?: boolean;
}

const ProductCard = (props: Props) => {
  const { hostId, memberId } = useProfile();
  const router = useRouter();

  const wishReserve = () => {
    axiosConnector({
      method: "POST",
      url: "profile/wish/reserve",
      data: { receiverId: hostId, wishlistId: props.wishlistId },
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };

  const ProductDelete = () => {
    if (props.wishlistId) {
      axiosConnector({
        method: "DELETE",
        url: "profile/wish/" + String(props.wishlistId),
      })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err.response);
        });
    }
  };
  return (
    <div>
      <div className="containerc">
        <div className="card">
          {memberId === hostId && <Xicon onClick={ProductDelete}></Xicon>}

          <div className="imgBx d-flex justify-content-center">
            <Image
              alt="cards"
              width={250}
              height={400}
              // layout="fill"
              src={props.imageUrl}
              className="rounded"
            />
          </div>
          <div className="contentBx">
            <h2>{props.name}</h2>

            <div className="color">
              <h3>가격 : {props.price} 원</h3>
            </div>
            {/* <a href="#">상품 구경하기</a> */}
            <Btn
              className="mx-2"
              filled={true}
              onClick={() => {
                router.push(props.buyUrl);
              }}
            >
              상품 구경하기
            </Btn>
            {memberId === hostId ? null : props.giverId === memberId ? (
              <Btn onClick={wishReserve}>취소</Btn>
            ) : props.giverId ? null : (
              <Btn onClick={wishReserve}>예약</Btn>
            )}
            {props.giverId && (
              <div className="text-white">
                {props.giverName}님이 예약하셨습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Xicon = styled(BsX)`
  font-size: 24px;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 21;
  cursor: pointer;
`;

export default ProductCard;
