import React from "react";
import { test } from "../../store/api/Member.api";
import Image from "next/image";
import Link from "next/link";
import kakao_login_medium_narrow from "public/images/kakao_login_medium_narrow.png";
import styled from "@emotion/styled";

const Login = () => {
  return (
    <a href={test} className="w-100">
      <KaKao src={kakao_login_medium_narrow} className=""></KaKao>
    </a>
  );
};

const KaKao = styled(Image)``;

export default Login;
