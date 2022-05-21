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
import Swal from "sweetalert2";

// interface
type Props = {};
class SearchedMember {
  memberId: number;
  nickname: string;
  imageString: string;
  friend: "friend" | "unfriend" | "requesting";

  constructor(data: any) {
    this.memberId = data.memberId || 0;
    this.nickname = data.nickname || "";
    this.imageString = data.imageString || "";
    this.friend = data.friend || "unfriend";
  }
}
function SearchList(data: Array<SearchedMember>): SearchedMember[] {
  return data.map((people) => {
    return new SearchedMember(people);
  });
}

//
const SearchUser = (props: Props) => {
  const [members, setMembers] = useState<SearchedMember[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const handleChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // console.log(event.target.value);
    setKeyword(event.target.value);
  };

  useEffect(() => {
    if (!keyword) {
      setMembers([]);
      return;
    }
    axiosConnector({
      method: "GET",
      url: "member/search/" + keyword,
    })
      .then((res) => {
        // console.log(res);
        setMembers(SearchList(res.data.members));
        //console.log(members);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [keyword]);

  const Search = () => {
    if (!keyword) {
      setMembers([]);
      return;
    }
    axiosConnector({
      method: "GET",
      url: "member/search/" + keyword,
    })
      .then((res) => {
        // console.log(res);
        setMembers(SearchList(res.data.members));
        //console.log(members);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const FriendRequest: Function = (id: number) => {
    // console.log("asd");
    axiosConnector({
      method: "GET",
      url: "friend/follow/" + String(id),
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "성공적으로 처리되었습니다.",
        });
        Search();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="px-2">
      <Card className="background-image-1">
        <CardContent>
          <>
            <TextField
              id="outlined-basic"
              // value={keyword}
              onChange={handleChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  Search();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BsSearch onClick={Search} className="clickable" />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            {members.map((member, index) => {
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
                        {member.friend === "friend" ? null : member.friend ===
                          "requesting" ? (
                          <Btn isDisabled>추가</Btn> // <Btn filled={true}>삭제</Btn>
                        ) : (
                          <Btn
                            className=""
                            onClick={FriendRequest}
                            param={member.memberId}
                          >
                            추가
                          </Btn>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
