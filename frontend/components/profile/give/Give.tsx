import { Card, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import axiosConnector from "utils/axios-connector";
import { useSelector } from "react-redux";
import { RootState } from "store/slice";
import ProductCard from "components/cards/ProductCard";
import { BsSearch } from "react-icons/bs";

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

const Give = (props: Props) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [nonmembers, setNonMembers] = useState<Member[]>([]);
  useEffect(() => {
    axiosConnector({
      method: "GET",
      url: "profile/give/",
    })
      .then((res) => {
        console.log(res);
        setMembers(res.data.memberList);
        setNonMembers(res.data.nonMemberList);
      })
      .catch((err) => {
        console.log(err.response);
      });
  });
  return (
    <div className="row">
      <div className="col-3">
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsSearch />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>
      <div className="col-9"></div>
    </div>
  );
};

export default Give;
