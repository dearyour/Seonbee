import { Card, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosConnector from "utils/axios-connector";
import { useSelector } from "react-redux";
import { RootState } from "store/slice";
import ProductCard from "components/cards/ProductCard";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import GetImage from "utils/GetImage";
import styled from "@emotion/styled";
import Fuse from "fuse.js";

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
  const temp = {
    receiverId: 1,
    name: "test",
    imageString: "asd",
  };
  const tempP = {
    productId: 1,
    name: "test",
    imageUrl: "https://picsum.photos/250/250",
    buyUrl: "",
    price: 10000,
  };
  const tempL = [tempP, tempP, tempP, tempP];
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
  };
  const NonFriendSelect: Function = (id: number) => {
    setSelected({ receiverId: id, isFriend: false });
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
    <div className="row w-100">
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
        {searchnonmembers &&
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
          })}
        <div className="w-100 bg-secondary bg-opacity-50 rounded my-1 p-1 text-white">
          회원
        </div>
        {searchmembers &&
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
          })}
      </div>
      {/* 오른쪽 제품목록 표시부분 */}
      <div className="col-9">
        <ProductWrap>
          <div className="d-flex flex-nowrap p-3">
            {products.map((now, index) => {
              return (
                <div className="mx-2" key={index}>
                  <ProductCard {...now}></ProductCard>
                </div>
              );
            })}
            {/* <ProductCard {...products[0]}></ProductCard> */}
          </div>
        </ProductWrap>
      </div>
    </div>
  );
};

const ProductWrap = styled.div`
  overflow-x: scroll;
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
