import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, InputAdornment, TextField } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import axiosConnector from "utils/axios-connector";
import GetImage from "utils/GetImage";
import Image from "next/image";
import styled from "@emotion/styled";
import Btn from "components/commons/Btn";
import { useDispatch, useSelector } from "react-redux";
import { layoutAction } from "store/slice/layout";
import CartBtnSelect from "./CartBtnSelect";
// interface
type Props = {};

class SearchedMember {
  friendId: number;
  nickname: string;
  imageString: string;

  constructor(data: any) {
    this.friendId = data.friendId || 0;
    this.nickname = data.nickname || "";
    this.imageString = data.imageString || "";
  }
}
function SearchList(data: Array<SearchedMember>): SearchedMember[] {
  return data.map((people) => {
    return new SearchedMember(people);
  });
}

//
const SearchUser = (props: any) => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState<SearchedMember[]>([]);
  const [memberSearch, setMemberSearch] = useState<SearchedMember[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const handleChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // console.log(event.target.value);
    setKeyword(event.target.value);
  };

  const Search = () => {
    axiosConnector({
      method: "GET",
      url: "shop/friend",
    })
      .then((res) => {
        // console.log(res);
        setMembers(SearchList(res.data.friends));
        setMemberSearch(SearchList(res.data.friends));
        // console.log(members);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    Search();
  }, []);

  const applyFilters = () => {
    let updatedList = memberSearch;
    if (keyword) {
      updatedList = updatedList.filter(
        (item: any) =>
          item.nickname.toLowerCase().search(keyword.toLowerCase().trim()) !==
          -1
      );
    }
    setMembers(updatedList);
  };
  useEffect(() => {
    applyFilters();
  }, [keyword]);

  // const SearchUser = () => {
  //   if (!keyword) {
  //     setMembers([]);
  //     return;
  //   }
  //   axiosConnector({
  //     method: "GET",
  //     url: "member/search/" + keyword,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       setMembers(SearchList(res.data.members));
  //       //console.log(members);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

  return (
    <div className="px-2">
      <Card className="background-image-1">
        <CardContent>
          <>
            <TextField
              id="outlined-basic"
              value={keyword}
              onChange={handleChange}
              // onKeyPress={(e) => {
              //   if (e.key === "Enter") {
              //     SearchUser();
              //   }
              // }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BsSearch onClick={Search} className="clickable" />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            {members.length > 0 ? (
              members.map((member: any, index: number) => {
                return (
                  <div key={index}>
                    <div className="row mt-1">
                      <div className="col-2 col-lg-3">
                        <ProfileImage
                          src={GetImage(member.imageString)}
                          alt="profile"
                          width={"100%"}
                          height={"100%"}
                        ></ProfileImage>
                      </div>
                      <div className="col-5 clickable my-auto overflow-hidden">
                        {member.nickname}
                      </div>
                      <div className="col-4">
                        <div className="d-flex align-items-center h-100">
                          {/* <Btn
                          className=""
                          onClick={() =>
                            dispatch(layoutAction.updataGiveUser(member))
                          }
                          // param={() =>
                          //   dispatch(layoutAction.updataGiveUser(member))
                          // }
                        >
                          벗 선택
                        </Btn> */}
                          <CartBtnSelect
                            onClick={() =>
                              dispatch(layoutAction.updataGiveUser(member))
                            }
                            onDelete={() => dispatch(layoutAction.reset())}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>벗이 없습니다</div>
            )}
          </>
        </CardContent>
      </Card>
    </div>
  );
};

const FriendBtn = styled(Button)`
  margin-top: auto;
  margin-bottom: auto;
`;

const ProfileImage = styled(Image)`
  border-radius: 100%;
`;

export default SearchUser;
