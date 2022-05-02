import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { InputAdornment, TextField } from "@mui/material";
import { BsSearch } from "react-icons/bs";

type Props = {};
class SearchedMember {
  friendId: number;
  nickname: string;
  imageString: string;
  isFriend: boolean;

  constructor(data: any) {
    this.friendId = data.friendId || 0;
    this.nickname = data.nickname || "";
    this.imageString = data.imageString || "";
    this.isFriend = data.isFriend || false;
  }
}

const SearchUser = (props: Props) => {
  const [members, setMembers] = useState<SearchedMember[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const handleChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // console.log(event.target.value)
    setKeyword(event.target.value);
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BsSearch />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            {members.map((member, index) => {
              <div key={index}></div>;
            })}
          </>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchUser;
