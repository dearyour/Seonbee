import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axiosConnector from "utils/axios-connector";
import Image from "next/image";
import GetImage from "utils/GetImage";
import Btn from "components/commons/Btn";
import Swal from "sweetalert2";
import styled from "@emotion/styled";

type Props = {};

class Member {
  friendId: number;
  nickname: string;
  imageString: string;

  constructor(data: any) {
    this.friendId = data.friendId || 0;
    this.nickname = data.nickname || "";
    this.imageString = data.imageString || "";
  }
}
function MemberList(data: Array<Member>): Member[] {
  return data.map((people) => {
    return new Member(people);
  });
}

const Alarm = (props: Props) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [reset, setReset] = useState<boolean>(false);
  // WsAlarm.activate();
  useEffect(() => {
    axiosConnector({
      method: "GET",
      url: "friend/follow",
    })
      .then((res) => {
        setMembers(res.data.friends);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [reset]);

  interface Allow {
    id: number;
    allow: String;
  }

  const FriendRes: Function = (data: Allow) => {
    axiosConnector({
      method: "POST",
      url: "friend/follow/allow",
      data: { friendId: data.id, allow: data.allow },
    }).then((res) => {
      Swal.fire({
        icon: "success",
        title: "성공적으로 처리되었습니다.",
      });
      setReset(!reset);
    });
  };
  const Nick = styled.div`
    /* white-space: nowrap; */
    /* position: absolute; */
    /* font-size: 12px; */
  `;

  const Blank = styled.div`
    width: 70px;
  `;

  const Wrap = styled.div``;
  return (
    <div className="px-2">
      <Card>
        <CardContent>
          <div className="row">
            {members.map((now, index) => {
              return (
                <div key={index} className="d-flex align-items-center">
                  <Wrap className="d-flex flex-column  align-items-center me-4 py-1">
                    <Image
                      src={GetImage(now.imageString)}
                      className="rounded-circle"
                      alt="profile"
                      width={"100%"}
                      height={"100%"}
                    ></Image>
                    <Nick className="">{now.nickname}</Nick>
                    <Blank></Blank>
                  </Wrap>

                  <div className=" mx-3 d-flex">
                    <Btn
                      onClick={FriendRes}
                      param={{ id: now.friendId, allow: "OK" }}
                      className="me-3"
                    >
                      수락
                    </Btn>
                    {/* </div>
                  <div className=""> */}
                    <Btn
                      onClick={FriendRes}
                      param={{ id: now.friendId, allow: "NO" }}
                    >
                      거절
                    </Btn>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alarm;
