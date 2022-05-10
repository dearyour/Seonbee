import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memberActions } from "store/slice/member";
import Image from "next/image";
import seonbee from "../../public/seonbee.png";
import styled from "@emotion/styled";
import axios from "axios";
import Router from "next/router";
import Swal from "sweetalert2";
import Login from "./kakaoLogin";

type Props = {};
//백에서 사용하는 되는 유효성
const ID_REGEX = /^[0-9a-zA-Z_-]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,6}$/;
const PW_REGEX = /^[a-zA-Z0-9]{7,16}$/;
// // 비밀번호 포맷 확인(영문, 숫자포함 8~16자리)
// const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;

const ERROR_MSG: any = {
  required: "비어있소.",
  invalidId: "유효하지 않는 이메일 양식입니다.",
  validId: "허가한다.",
  invalidPw: "유효하지 않는 비밀번호 양식입니다.",
  validPw: "허가한다.",
};

const Signin = (props: Props) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    document.title = "납시오";
    // if(userLoginInfo.isLogin==true) {
    //   Swal.fire({
    //     title: '로그인된 상태입니다',
    //     icon: 'warning',
    //     showConfirmButton: false,
    //   });
    //   Router.push('/');
    // }
    if (
      sessionStorage.getItem("Token") != null &&
      sessionStorage.getItem("Token") != "undefined"
    ) {
      Swal.fire({
        title: "로그인된 상태입니다",
        icon: "warning",
        showConfirmButton: false,
      });
      Router.push("/");
    }
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let isNormal = true;
    let msg = "";

    let emailValue = errorData.email != true;
    let passwordValue = errorData.password != true;
    if (!inputState.email || emailValue) {
      isNormal = false;
      msg = "이메일을 다시 입력해주세요.";
    } else if (!inputState.password || passwordValue) {
      isNormal = false;
      msg = "비밀번호를 다시 입력해주세요.";
    }
    if (isNormal) {
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
        .then((res: any) => {
          console.log(res);
          switch (res.status) {
            case 200:
              sessionStorage.setItem("Token", res.data.jwt);
              dispatch(memberActions.getMember());
              Router.push(`/`);
              Swal.fire({
                title: "로그인에 성공했습니다",
                text: "메인페이지로 이동합니다",
                icon: "success",
                showConfirmButton: false,
              });
              break;
          }
        })
        .catch((err) => {
          // console.log(err.response);
          if (err.response) {
            Swal.fire({
              icon: "error",
              title: "회원 정보를 다시 확인해주세요",
              text: "지속적으로 같은 문제 발생시 관리자에게 문의하세요",
              confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
            });
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: msg,
        confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
      });
    }
    // __getMemberInfo();
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
          onChange={(e) => {
            handleChange(e);
            checkRegex("password");
          }}
          // onBlur={() => checkRegex("password")}
        />
        <div className="text-red-500">
          {errorData["password"] !== true
            ? ERROR_MSG[errorData["password"]]
            : ""}
        </div>
        <input type="submit" name="" value="등장" />
        <LoginWrapper>
          <Login />
        </LoginWrapper>
        {/* <a href="/shop" className="forgot"> */}
        {/* 비밀스러운 번호를 까먹었소? */}
        {/* </a> */}
      </form>
    </div>
  );
};
const ImageWrapper = styled(Image)`
  object-fit: cover;
`;
const LoginWrapper = styled.div`
  margin-top: -20px;
`;

export default Signin;

// const __SignIn = () => {
//   const data = {
//     email: inputState.email,
//     password: inputState.password,
//   };
//   console.log(data);
//   axios({
//     method: "POST",
//     url: process.env.NEXT_PUBLIC_BACK + "member/login",
//     data: data,
//   })
//     .then((res) => {
//       console.log(res);
//       sessionStorage.setItem("Token", res.data.jwt);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const __getMemberInfo = () => {
//   const token = sessionStorage.getItem("Token");
//   axios({
//     method: "GET",
//     url: process.env.NEXT_PUBLIC_BACK + "member/auth",
//     headers: { Authorization: "Bearer " + token },
//   })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
