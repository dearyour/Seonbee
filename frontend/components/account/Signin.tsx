import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memberActions } from "store/slice/member";
import Image from "next/image";
import seonbee from "../../public/characters/hobee_body.png";
import styled from "@emotion/styled";
import axios from "axios";
import Router from "next/router";
import Swal from "sweetalert2";
import Login from "./kakaoLogin";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CheckEmailCode, { sendEmailPWCodeAPI } from "./CheckEmailCode";
import Btn from "components/commons/Btn";
type Props = {};
//백에서 사용하는 되는 유효성
const ID_REGEX = /^[0-9a-zA-Z_-]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,6}$/;
// const PW_REGEX = /^[a-zA-Z0-9]{7,16}$/;
// 비밀번호 포맷 확인(영문, 숫자포함 8~16자리)
const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{7,16}$/;

const ERROR_MSG: any = {
  required: "필수값입니다.",
  invalidId: "유효하지 않는 이메일 양식입니다.",
  validId: "허가한다.",
  invalidPw: "유효하지 않는 비밀번호 양식입니다.",
  validPw: "허가한다.",
};

const Signin = (props: Props) => {
  const dispatch = useDispatch();
  const [promotion, setPromotion] = useState<boolean>(false);
  const [authFin, setAuthFin] = useState<boolean>(false); //인증버튼 막기
  const [showEmailCodeCheck, setShowEmailCodeCheck] = useState<boolean>(false); //이메일인증
  const [inputState, setInputState] = useState<any>({
    email: "",
    password: "",
    newPassword: "",
    code: false,
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
    document.title = "로그인";
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

    // let emailValue = errorData.email != true;
    // let passwordValue = errorData.password != true;
    // if (!inputState.email || emailValue) {
    //   isNormal = false;
    //   msg = "이메일을 다시 입력해주세요.";
    // } else if (!inputState.password || passwordValue) {
    //   isNormal = false;
    //   msg = "비밀번호를 다시 입력해주세요.";
    // }
    if (isNormal) {
      const data = {
        email: inputState.email,
        password: inputState.password,
      };
      // console.log(data);
      axios({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACK + "member/login",
        data: data,
      })
        .then((res: any) => {
          // console.log(res);
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
              text: "아이디 또는 비밀번호가 일치하지 않습니다",
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

  const sendEmailCodeClick = (e: any) => {
    // 이메일로 인증번호 보내기 + 인증번호 입력 받을 수 있게 폼 열기
    e.preventDefault();
    let isNormal = true;
    let msg = "";

    if (!inputState.email) {
      isNormal = false;
      msg = "이메일을 입력해주세요.";
    } else if (!ID_REGEX.test(inputState.email)) {
      isNormal = false;
      Swal.fire({
        title: "이메일 양식을 확인해주세요",
        icon: "error",
        confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
      });
      msg = "이메일 양식을 확인해주세요.";
    } else {
      // 인증코드 보내기
      setShowEmailCodeCheck(true); //인증 인풋창 열기
      setAuthFin(true); // 우선 인증버튼 누르자마자 막기
      Swal.fire({
        title: "인증번호를 전송중입니다",
        text: "전송에 시간이 조금 걸릴 수 있으니 조금만 기다려주세요",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
          sendEmailPWCodeAPI(inputState.email).then((res: any) => {
            if (res?.status == 200) {
              Swal.fire({
                title: "이메일로 인증번호를 전송했습니다",
                text: "이메일 수신에 시간이 조금 걸릴 수 있습니다",
                icon: "info",
                showConfirmButton: false,
                timer: 800,
              });
            } else if (res?.status == 401) {
              Swal.fire({
                title: "존재하지 않는 이메일입니다.",
                icon: "error",
                confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
              });
              setShowEmailCodeCheck(false); // 인증 인풋창 닫기
              setAuthFin(false); // 인증버튼 누르자마자 열기
            } else {
              Swal.fire({
                icon: "error",
                title: "이메일 인증에 문제가 발생했습니다",
                text: "지속적으로 같은 문제 발생시 관리자에게 문의하세요",
                confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
              });
            }
          });
        },
      });
    }
  };
  const changeHandles = (value: any, name: any) => {
    inputState[name] = value;
    if (value == false) {
      setAuthFin(false);
    }
  };
  //이메일 다시받기 위해 true false
  const sendEmailCodeAgainClick = () => {
    setShowEmailCodeCheck(false);
    setAuthFin(false);
  };
  // 새로운 패스워드
  return (
    <div className="form signinForm">
      <ImageWrapper src={seonbee} alt={`image`} height={190} width={130} />
      <form onSubmit={handleSubmit}>
        <h3>로그인</h3>
        <input
          id="email"
          type="text"
          placeholder="이메일"
          value={inputState.email || ""}
          onChange={handleChange}
          // onBlur={() => checkRegex("email")}
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
            // checkRegex("password");
          }}
          // onBlur={() => checkRegex("password")}
        />
        {/* <div className="text-red-500">
          {errorData["password"] !== true
            ? ERROR_MSG[errorData["password"]]
            : ""}
        </div> */}
        <input type="submit" name="" value="로그인" className="" />
        <LoginWrapper className="mx-auto">
          <Login />
        </LoginWrapper>
        <PasswordFindBtn
          className="toggle-signin mt-1 border-0"
          onClick={() => setPromotion((prevCheck) => !prevCheck)}
        >
          비밀번호 찾기
        </PasswordFindBtn>
      </form>
      <div className="promotion_signinWrp">
        {promotion && (
          <div className="promotion_signin">
            {" "}
            <EmailWrp>
              <input
                id="email"
                type="text"
                placeholder="이메일"
                value={inputState.email || ""}
                disabled={authFin ? true : false}
                // onChange={(e) => {
                //   handleChange(e);
                //   checkRegex("email");
                // }}
                onChange={handleChange}
              />
              <Button
                onClick={sendEmailCodeClick}
                disabled={authFin ? true : false}
                sx={{ width: 100, height: 47 }}
              >
                인증받기
              </Button>
            </EmailWrp>
            <>
              {showEmailCodeCheck ? (
                <CheckEmailCode
                  changeHandle={changeHandles}
                  email={inputState.email}
                  lostpw={true}
                />
              ) : (
                <></>
              )}
            </>
            {authFin ? (
              <Button onClick={sendEmailCodeAgainClick}>
                이메일 변경 및 인증 다시 받기
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
const ImageWrapper = styled(Image)`
  object-fit: cover;
`;
const LoginWrapper = styled.div`
  margin-top: -20px;
`;
const EmailWrp = styled.div`
  display: flex;
`;

const PasswordFindBtn = styled(Btn)`
  background-color: none;
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
