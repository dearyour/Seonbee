import React from "react";
import Image from "next/image";
import seonbee from "../../public/seonbee.png";
type Props = {};
import styled from "@emotion/styled";
const ImageWrapper = styled(Image)`
  object-fit: cover;
`;
const Signin = (props: Props) => {
  return (
    <div className="form signinForm">
      <ImageWrapper src={seonbee} alt={`image`} height={170} width={200} />
      <form>
        <h3>납시오</h3>
        <input type="text" name="" placeholder="이메일" />
        <input type="password" name="" placeholder="비밀번호" />
        <input type="submit" name="" value="등장" />
        <a href="#" className="forgot">
          비밀스러운 번호를 까먹었소?
        </a>
      </form>
    </div>
  );
};

export default Signin;
