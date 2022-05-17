import React from "react";
import sad from "public/characters/sad.png";
import Image from "next/image";

type Props = {};

const Custom404 = (props: Props) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="">404 Not Found</div>
      <Image src={sad} width={833} height={500} alt="404" className=""></Image>
    </div>
  );
};

export default Custom404;
