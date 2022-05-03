import axios from "axios";
import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memberActions } from "store/slice/member";
import Swal from "sweetalert2";
import Router from "next/router";
const ID_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const NICK_REGEX = /^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,8}$/;
// const PW_REGEX = new RegExp("^(?=.*[a-zA-Z])(?=.*d)(?=.*W).{8,16}$");
const PW_REGEX = /^[a-zA-Z0-9]{8,16}$/;
// 비밀번호 정규표현식 : 최소 8자, 최대 16자, 하나 이상의 문자, 하나 이상의 숫자, 하나 이상의 특수문자
const ERROR_MSG: any = {
  required: "비어있소.",
  invalidId: "Ex) Email@naver.com",
  validId: "허가한다.",
  invalidPw: "대,소문자 or 숫자 구성 8~16 글자",
  validPw: "허가한다.",
  invalidNick: "한글 or 대,소문자 or 숫자 2~8 글자",
  invalidConfirmPw: "비밀번호가 일치하지 않습니다.",
};
const Signup = () => {
  const dispatch = useDispatch();
  const [promotion, setPromotion] = useState(false);
  const [inputState, setInputState] = useState<any>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
    showPasswordConfirm: false,
  });
  const [errorData, setErrorData] = useState<any>({
    email: false,
    nickname: false,
    password: false,
    passwordConfirm: false,
  });

  const gender = [
    { value: "M", name: "남자" },
    { value: "F", name: "여자" },
  ];
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
        case "nickname":
          result = NICK_REGEX.test(value) ? true : "invalidNick";
          break;
        case "password":
          result = PW_REGEX.test(value) ? true : "invalidPw";
          checkRegex("passwordConfirm");
          break;
        case "passwordConfirm":
          result = value === inputState["password"] ? true : "invalidConfirmPw";
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
        sessionStorage.setItem("Token", res.data.jwt);
        dispatch(memberActions.getMember());
        Router.push("/");
        Swal.fire({
          title: "회원가입에 성공했습니다",
          text: "선비에 오신걸 환영합니다!",
          icon: "success",
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const __SignUp = () => {
    const data = {
      email: inputState.email,
      nickname: inputState.nickname,
      password: inputState.password,
    };
    console.log(data);
    axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACK + "member",
      data: data,
    })
      .then((res) => {
        console.log(res);
        __SignIn();
      })
      .catch((err) => {});
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let isNormal = true;
    let msg = "";

    if (!inputState.email) {
      isNormal = false;
      msg = "이메일을 입력해주세요.";
    } else if (!inputState.nickname) {
      isNormal = false;
      msg = "닉네임을 입력해주세요.";
    } else if (!inputState.password) {
      isNormal = false;
      msg = "비밀번호를 입력해주세요.";
    } else if (!inputState.passwordConfirm) {
      isNormal = false;
      msg = "비밀번호확인을 입력해주세요.";
    }
    if (isNormal) {
      __SignUp();
    } else {
      Swal.fire({
        icon: "error",
        title: msg,
        confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
      });
    }
  };
  return (
    <div
      className={
        promotion === true
          ? ["form signupForm", "action"].join(" ")
          : "form signupForm"
      }
    >
      <form onSubmit={handleSubmit}>
        <h3>호패 등록</h3>
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
          id="nickname"
          type="text"
          placeholder="닉네임"
          value={inputState.nickname || ""}
          onChange={handleChange}
          onBlur={() => checkRegex("nickname")}
        />
        <div className="text-red-500">
          {errorData["nickname"] !== true
            ? ERROR_MSG[errorData["nickname"]]
            : ""}
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
        <input
          type="password"
          id="passwordConfirm"
          placeholder="비밀번호 확인"
          value={inputState.passwordConfirm || ""}
          onChange={handleChange}
          onBlur={() => checkRegex("passwordConfirm")}
        />
        <div className="text-red-500">
          {errorData["passwordConfirm"] !== true
            ? ERROR_MSG[errorData["passwordConfirm"]]
            : ""}
        </div>

        <div
          className="toggle-promotion"
          onClick={() => setPromotion((prevCheck) => !prevCheck)}
        >
          추가정보 입력
        </div>
        <div className="promotion_wrapper">
          {promotion && (
            <div className="promotion">
              <input type="text" name="" placeholder="선호 선물" />
              <input type="text" name="" placeholder="싫은 선물" />
              <input type="text" name="" placeholder="성별" />
              <input type="text" name="" placeholder="생일" />
              <input type="text" name="" placeholder="관심사" />
              <input type="text" name="" placeholder="MBTI" />
            </div>
          )}
        </div>
        <input type="submit" name="" value="등록" />
      </form>
    </div>
  );
};

export default Signup;
