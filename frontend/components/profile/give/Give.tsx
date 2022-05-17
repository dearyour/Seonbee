import { Card, InputAdornment, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosConnector from "utils/axios-connector";
import { useSelector } from "react-redux";
import { RootState } from "store/slice";
import ProductCard from "../ProductCard";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import GetImage from "utils/GetImage";
import styled from "@emotion/styled";
import Fuse from "fuse.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from "swiper";
import {
  ProductsContent,
  Card as CardP,
  CardImg,
  CardContent,
  Price,
} from "styles/chat/ProductsElements";
import EllipsisText from "react-ellipsis-text";
import Btn from "components/commons/Btn";
import { useRouter } from "next/router";
import useProfile from "store/hook/profileHooks";

type Props = {};
interface Member {
  receiverId: number;
  name: string;
  imageString: string;
}

interface GiveResponse {
  nonMemberList: Member[];
  memberList: Member[];
}

interface Product {
  productId: number;
  name: string;
  imageUrl: string;
  buyUrl: string;
  price: number;
}

interface Selected {
  receiverId: number;
  isFriend: boolean;
}

const Give = (props: Props) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [nonmembers, setNonMembers] = useState<Member[]>([]);
  const [searchmembers, setSearchMembers] = useState<Member[]>([]);
  const [searchnonmembers, setSearchNonMembers] = useState<Member[]>([]);
  const [selected, setSelected] = useState<Selected>();
  const [products, setProducts] = useState<Product[]>([]);
  const { hostId, memberId } = useProfile();
  const router = useRouter();

  useEffect(() => {
    axiosConnector({
      method: "GET",
      url: "profile/give/",
    })
      .then((res) => {
        console.log(res);
        setMembers(res.data.receiverList.memberList);
        setNonMembers(res.data.receiverList.noneMemberList);
        setSearchMembers(res.data.receiverList.memberList);
        setSearchNonMembers(res.data.receiverList.noneMemberList);
      })
      .catch((err) => {
        console.log(err.response);
      });
    // setMembers([temp, temp]);
    // setNonMembers([temp, temp]);
  }, []);

  const FriendSelect: Function = (id: number) => {
    setSelected({ receiverId: id, isFriend: true });
    const gw = document.getElementById("give_wrap");
    gw?.scrollTo(0, 0);
  };
  const NonFriendSelect: Function = (id: number) => {
    setSelected({ receiverId: id, isFriend: false });
    const gw = document.getElementById("give_wrap");
    gw?.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!selected) {
      return;
    }
    axiosConnector({
      method: "POST",
      url: "profile/give",
      data: selected,
    })
      .then((res) => {
        console.log(res);
        setProducts(res.data.productList);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [selected]);

  const SearchChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (!e.target.value) {
      setSearchMembers(members);
      setSearchNonMembers(nonmembers);
      return;
    }
    const options = {
      // Search in `author` and in `tags` array
      keys: ["name"],
    };

    const fuseM = new Fuse(members, options);
    const fuseNM = new Fuse(nonmembers, options);

    const resultM = fuseM.search(e.target.value);
    const resultNM = fuseNM.search(e.target.value);
    const mem = resultM.map((now) => {
      return now.item;
    });
    const nonmem = resultNM.map((now) => {
      return now.item;
    });
    setSearchMembers(mem);
    setSearchNonMembers(nonmem);
  };
  return (
    <Wrap id="give_wrap" className="row w-100 h-100">
      {/* 왼쪽 유저 선택 부분 */}
      <div className="col-3 overflow-scroll">
        <TextField
          id="input-with-icon-textfield"
          className="my-1"
          onChange={SearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsSearch />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <MemberWrap className="p-2">전체보기</MemberWrap>
        <div className="w-100 bg-secondary bg-opacity-50 rounded my-1 p-1 text-white">
          비회원
        </div>
        {searchnonmembers && searchnonmembers.length > 0 ? (
          searchnonmembers.map((now, index) => {
            return (
              <MemberWrap
                key={index}
                className="row mx-1"
                onClick={() => {
                  NonFriendSelect(now.receiverId);
                }}
              >
                <div className="col-5">
                  <Profile
                    src={GetImage(now.imageString)}
                    width={"100%"}
                    height={"100%"}
                    alt="profile"
                  ></Profile>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <span className="">{now.name}</span>
                </div>
              </MemberWrap>
            );
          })
        ) : (
          <div className="p-3">비어있어요</div>
        )}
        <div className="w-100 bg-secondary bg-opacity-50 rounded my-1 p-1 text-white">
          회원
        </div>
        {searchmembers && searchmembers.length > 0 ? (
          searchmembers.map((now, index) => {
            return (
              <MemberWrap
                key={index}
                className="row mx-1"
                onClick={() => {
                  FriendSelect(now.receiverId);
                }}
              >
                <div className="col-5">
                  <Profile
                    src={GetImage(now.imageString)}
                    width={"100%"}
                    height={"100%"}
                    alt="profile"
                  ></Profile>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <span className="">{now.name}</span>
                </div>
              </MemberWrap>
            );
          })
        ) : (
          <div className="p-3">비어있어요</div>
        )}
      </div>
      {/* 오른쪽 제품목록 표시부분 */}
      <div className="col-9 h-100">
        {/* <ProductWrap>
          <div className="d-flex flex-nowrap p-3">
            {products.map((now, index) => {
              return (
                <div className="mx-2" key={index}>
                  <ProductCard {...now}></ProductCard>
                </div>
              );
            })}
          </div>
        </ProductWrap> */}
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={3}
          spaceBetween={50}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="h-100 "
          pagination
        >
          {products.map((now, index) => {
            return (
              <SwiperSlide className="h-100 mt-3" key={index}>
                <CardP className="background-image-1 w-100 mt-5">
                  <CardImg>
                    <Image
                      src={
                        now.imageUrl
                          ? now.imageUrl
                          : "https://picsum.photos/250/250"
                      }
                      alt="item-imageUrl"
                      width={150}
                      height={150}
                      style={{ borderRadius: "5px" }}
                    />
                  </CardImg>
                  <CardContent>
                    <h2>
                      <EllipsisText text={now.name} length={"15"} />
                    </h2>
                    {/* <p>{item.name}</p> */}
                    <Price>{now.price.toLocaleString()} 원</Price>
                    <Stack direction="row" spacing={2}>
                      <a
                        href={now.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Btn>상품 구경하기</Btn>
                      </a>
                    </Stack>
                  </CardContent>
                </CardP>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  overflow-y: scroll;
`;

const Profile = styled(Image)`
  border-radius: 100%;
`;

const MemberWrap = styled.div`
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #a09b9b;
    opacity: 70%;
  }
`;

export default Give;
