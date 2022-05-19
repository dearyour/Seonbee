import styled from '@emotion/styled';
import { Card, Skeleton } from '@mui/material';
import axios from 'axios';
import FriendList from 'components/social/carousel/FriendList';
import SideBar from 'components/social/sidebar/SideBar';
import UserCard from 'components/social/usercard/UserCard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CardMember from 'store/interface/social/cardmember';
import axiosConnector from 'utils/axios-connector';
import sad from 'public/characters/sad.png';
import Image from 'next/image';
import Head from 'next/head';

type Props = {};

const Blue = styled.span`
  color: #38508c;
`;
const Social = (props: Props) => {
  const [members, setMembers] = useState<CardMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const temp_member = {
    nickname: 'asd',
    schedule: [
      { dday: -10, content: '수능' },
      { dday: -10, content: '수능' },
    ],
    verse: 'asd',
    wishlist: [{ imageUrl: 'https://picsum.photos/150/150' }],
    imageString: 'https://picsum.photos/150/150',
  };
  useEffect(() => {
    // setMembers([temp_member, temp_member, temp_member, temp_member]);
    setIsLoading(true);
    if (!sessionStorage.getItem('Token')) {
      router.push('/login');
    }
    // axiosConnector({
    //   method: "GET",
    //   url: "member/auth",
    // })
    //   .then((res) => {})
    //   .catch((err) => {
    //     router.push("/login");
    //   });
    axiosConnector({
      method: 'GET',
      url: 'friend',
    })
      .then((res) => {
        // console.log(res);
        setMembers(res.data.friends);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>선비 | 사랑방</title>
      </Head>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-lg-6 col-xl-3">
            <SideBar></SideBar>
          </div>
          <div className="col-12 col-lg-6 col-xl-9">
            <div className="mb-3  fs-5 fw-bold">
              벗에게 안성맞춤인 선물과 함께 <Blue>응원과 축하</Blue>를
              건네보시오
            </div>
            <FriendList></FriendList>
            <div className="my-3 fs-5 fw-bold">
              벗의 <Blue>안부</Blue> 확인하기
            </div>
            <div className="row">
              {!isLoading && members.length > 0 ? (
                members.map((now: any, index: any) => {
                  return (
                    <div className="col-24 col-md-6 mt-2" key={index}>
                      <UserCard {...now}></UserCard>
                    </div>
                  );
                })
              ) : !isLoading ? (
                <Card>
                  <div className="m-4 p-5">
                    <Image
                      src={sad}
                      alt="sad"
                      width={83 * 2}
                      height={50 * 2}
                    ></Image>
                    <div>
                      등록된 친구가 없어요. 친구 검색을 통해 친구를
                      추가해보세요!
                    </div>
                  </div>
                </Card>
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={'80%'}
                  height={'80%'}
                  className="rounded p-5  fw-bold"
                >
                  Loading...
                </Skeleton>
              )}
            </div>
          </div>
        </div>
        <div className="my-5 py-5"></div>
      </div>
    </>
  );
};

export default Social;
