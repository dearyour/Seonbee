import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import seonbee from "../../public/seonbee.png";
import styled from "@emotion/styled";
import axios from "axios";

type Props = {};
// const __Login = useCallback(() => {
//   return axios({
//     method: "POST",
//     url: process.env.BACK_EC2 + "member/login",
//     // url: "https://localhost:8000/api/member/login",
//     // url: "http://j6a101.p.ssafy.io:8000/api/member/login",
//   })
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       return err;
//     });
// }, []);

// useEffect(() => {
//   __Login();
// }, [__Login]);

// const ID_REGEX = new RegExp(
//   "^([\\w._-])[a-zA-Z0-9]+([\\w._-])([a-zA-Z0-9])+([\\w._-])+@([a-zA-Z0-9]+.)+[a-zA-Z0-9]{2,8}$"
// );
// const ID_REGEX = new RegExp("^[a-z0-9_-]{5,20}$");
const ID_REGEX = new RegExp(
  "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
);
// const PW_REGEX = new RegExp("^(?=.*[a-zA-Z])(?=.*d)(?=.*W).{8,16}$");
const PW_REGEX = new RegExp("^[a-zA-Z0-9]{8,16}$");
// 비밀번호 정규표현식 : 최소 8자, 최대 16자, 하나 이상의 문자, 하나 이상의 숫자, 하나 이상의 특수문자

const ERROR_MSG: any = {
  required: "비어있소.",
  invalidId: "유효하지 않는 이메일 양식입니다.",
  validId: "허가한다.",
  invalidPw: "유효하지 않는 비밀번호 양식입니다.",
  validPw: "허가한다.",
};

const Signin = (props: Props) => {
  const [inputState, setInputState] = useState<any>({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errorData, setErrorData] = useState<any>({
    email: false,
    password: false,
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setInputState((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };
  console.log(ID_REGEX.test(inputState["email"]));

  const checkRegex = (inputId: any) => {
    let result: any;
    const value: any = inputState[inputId];
    if (value.length === 0) {
      result = "required";
    } else {
      switch (inputId) {
        case "email":
          result = ID_REGEX.test(value) ? true : "invalidId";
          break;
        case "password":
          result = PW_REGEX.test(value) ? true : "invalidPw";
          break;
        default:
          return;
      }
    }

    setErrorData((prev: any) => ({ ...prev, [inputId]: result }));
  };

  const __SignIn = () => {
    const data = {
      email: inputState.email,
      password: inputState.password,
    };
    console.log(data);
    axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACK + "member/login",
      data: data,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    __SignIn();
  };

  return (
    <div className="form signinForm">
      <ImageWrapper src={seonbee} alt={`image`} height={170} width={200} />
      <form onSubmit={handleSubmit}>
        <h3>납시오</h3>
        <input
          id="email"
          type="text"
          placeholder="이메일"
          value={inputState.email || ""}
          onChange={handleChange}
          onBlur={() => checkRegex("email")}
        />
        <div className="text-red-500">
          {errorData["email"] !== true ? ERROR_MSG[errorData["email"]] : ""}
        </div>
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          value={inputState.password || ""}
          onChange={handleChange}
          onBlur={() => checkRegex("password")}
        />
        <div className="text-red-500">
          {errorData["password"] !== true
            ? ERROR_MSG[errorData["password"]]
            : ""}
        </div>

        <input type="submit" name="" value="등장" />
        <a href="#" className="forgot">
          비밀스러운 번호를 까먹었소?
        </a>
      </form>
    </div>
  );
};
const ImageWrapper = styled(Image)`
  object-fit: cover;
`;

export default Signin;
