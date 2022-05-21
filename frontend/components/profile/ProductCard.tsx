import { Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import {
  ProductsContent,
  Card,
  CardImg,
  CardContent,
  Price,
} from 'styles/chat/ProductsElements';
import EllipsisText from 'react-ellipsis-text';
import Btn from 'components/commons/Btn';
import { useRouter } from 'next/router';
import useProfile from 'store/hook/profileHooks';
import axiosConnector from 'utils/axios-connector';

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
      method: 'POST',
      url: 'profile/wish/reserve',
      data: { receiverId: memberId, wishlistId: props.wishlistId },
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
        method: 'DELETE',
        url: 'profile/wish/' + String(props.wishlistId),
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
    <Card className="background-image-1 w-100">
      <CardImg>
        <Image
          src={
            props.imageUrl ? props.imageUrl : 'https://picsum.photos/250/250'
          }
          alt="item-imageUrl"
          width={150}
          height={150}
          style={{ borderRadius: '5px' }}
        />
      </CardImg>
      <CardContent>
        <h2>
          <EllipsisText text={props.name} length={'14'} />
        </h2>
        {/* <p>{item.name}</p> */}
        <Price>{props.price} 원</Price>
        <Stack direction="row" spacing={2}>
          <a href={props.buyUrl}>
            <Btn>상품 구경하기</Btn>
          </a>
          {sessionStorage.getItem('Token') && <Btn>추천 내역 저장하기</Btn>}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
