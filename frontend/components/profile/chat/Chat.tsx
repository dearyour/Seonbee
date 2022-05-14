import React from "react";

type Props = {};

interface Recommended {
  recommendId: number;
  receiverName: string;
  name: string;
  price: number;
  buyUrl: string;
  imageUrl: string;
  isSaved: boolean;
}

const Chat = (props: Props) => {
  return (
    <>
      <div className="overflow-scroll">추천내역</div>
    </>
  );
};

export default Chat;
