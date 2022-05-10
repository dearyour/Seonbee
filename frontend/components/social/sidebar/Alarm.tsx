import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axiosConnector from "utils/axios-connector";
import Image from "next/image";
import GetImage from "utils/GetImage";
import Btn from "components/commons/Btn";

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
  }, []);

  interface Allow {
    id: number;
    allow: String;
  }

  const FriendRes: Function = (data: Allow) => {
    axiosConnector({
      method: "POST",
      url: "friend/follow/allow",
      data: { friendId: data.id, allow: data.allow },
    });
  };
  return (
    <div className="px-2">
      <Card>
        <CardContent>
          <div className="row">
            {members.map((now, index) => {
              return (
                <div key={index} className="row">
                  <div className="col-2">
                    <Image
                      src={GetImage(now.imageString)}
                      alt="profile"
                      width={"100%"}
                      height={"100%"}
                    ></Image>
                  </div>
                  <div className="col-4">{now.nickname}</div>
                  <div className="col-3">
                    <Btn
                      onClick={FriendRes}
                      param={{ id: now.friendId, allow: "OK" }}
                    >
                      수락
                    </Btn>
                  </div>
                  <div className="col-3">
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
