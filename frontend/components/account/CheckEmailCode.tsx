import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import styled from "@emotion/styled";
import CountdownTimer from "./CountdownTimer";
import axios from "axios";
import Router from "next/router";
import { memberActions } from "store/slice/member";
// import { checkEmailCodeAPI, checkEmailPWAPI } from "../../pages/api/user";

// 회원가입시 이메일로 인증번호 보내기
export async function SendEmailCodeAPI(email: any) {
  return await axios({
    method: "POST",
    url: process.env.NEXT_PUBLIC_BACK + "email/send",
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
      // "Access-Control-Allow-Origin": "*",
      // Accept: "application/json",
    },
    data: email,
  })
    .then((res: any) => res.data)
    .catch((err: any) => err.response.data);
}
// 회원가입 이메일 인증 받은것 코드내용 인증하기
export async function checkEmailCodeAPI(datas: any) {
  return await axios({
    method: "POST",
    url: process.env.NEXT_PUBLIC_BACK + "email/check",
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
    },
    data: {
      email: datas.email,
      code: datas.code,
    },
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}
// 비밀번호 재설정 위해 이메일로 인증번호 보내기
export async function sendEmailPWCodeAPI(email: any) {
  return await axios({
    method: "POST",
    url: process.env.NEXT_PUBLIC_BACK + "email/findpass",
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
    },
    data: email,
  })
    .then((res: any) => res.data)
    .catch((err: any) => err.response.data);
}

// 비밀번호 재설정 위해 이메일 인증번호 받은것 인증하기
export async function checkEmailPWAPI(datas: any) {
  return await axios({
    method: "POST",
    url: process.env.NEXT_PUBLIC_BACK + "email/passcheck",
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
    },
    data: {
      email: datas.email,
      code: datas.code,
    },
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}
export async function newpassAPI(datas: any) {
  return await axios({
    method: "POST",
    url: process.env.NEXT_PUBLIC_BACK + "email/newpass",
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
    },
    data: {
      email: datas.email,
      code: datas.code,
      password: datas.newPassword,
    },
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}
/////////////////////////////////////////////////////////////////
// 시작점
const PW_REGEX = /^[a-zA-Z0-9]{7,16}$/;
export default function CheckEmailCode(props: any) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    code: "",
    email: props.email,
    newPassword: "",
  });
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [authFin, setAuthFin] = useState(false);
  const [timer, setTimer] = useState(true);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setInputValue((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const codeHandleChange = (e: any) => {
    const value = e.target.value; // 입력한 값
    setCode(() => value);
  };
  const passHandleChange = (e: any) => {
    const value = e.target.value; // 입력한 값
    setNewPassword(() => value);
  };

  const changeTimerHandle = (value: any, name: any) => {
    setTimer(value);
    props.changeHandle(false, "code");
    Swal.fire({
      icon: "error",
      title: "시간이 만료되었습니다! 인증코드를 재발급해 주세요",
      confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
    }).then(() => {});
  };

  // 이메일로 받은 인증번호 입력해서 확인하기 + 확인 완료되면 폼 닫고 이메일 입력 못 받게 바꾸기
  const compareEmailCodeClick = () => {
    const value = code;
    inputValue.code = code;
    inputValue.email = props.email;

    if (!value) {
      Swal.fire({
        icon: "error",
        title: "인증번호를 입력해주세요",
        confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
      });
    } else {
      if (props.lostpw) {
        // console.log('비밀번호 잃어버려서 온 것') //////////////////
        Swal.fire({
          title: "인증번호를 확인 중입니다",
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();

            checkEmailPWAPI(inputValue).then((res) => {
              // console.log(res);
              if (res.status == 200) {
                Swal.fire({
                  title: "인증에 성공했습니다",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 500,
                });
                props.changeHandle(true, "code");
                setAuthFin(true);
              } else if (res.status == 402) {
                Swal.fire({
                  icon: "error",
                  title: "인증번호를 잘못 입력했습니다",
                  text: "다시 확인해주세요",
                  confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
                });
              } else {
                props.changeHandle(false, "code");
              }
            });
          },
        });
      } else {
        // console.log('회원가입하다가 온 것') ///////////////////////
        Swal.fire({
          title: "인증번호를 확인 중입니다",
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();

            checkEmailCodeAPI(inputValue).then((res) => {
              if (res.status == 200) {
                Swal.fire({
                  title: "이메일 인증에 성공했습니다",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 500,
                });
                props.changeHandle(true, "code");
                setAuthFin(true);
              } else if (res.status == 402) {
                Swal.fire({
                  icon: "error",
                  title: "인증번호를 잘못 입력했습니다",
                  text: "다시 확인해주세요",
                  confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "문제가 발생했습니다. 다시 시도해주세요.",
                  confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
                });
                props.changeHandle(false, "code");
              }
            });
          },
        });
      }
    }
  };
  // 자동로그인
  const __SignIn = () => {
    const data = {
      email: inputValue.email,
      password: inputValue.newPassword,
    };
    // console.log(data);
    axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACK + "member/login",
      data: data,
    })
      .then((res) => {
        sessionStorage.setItem("Token", res.data.jwt);
        dispatch(memberActions.getMember());
        Router.push(`/`);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //비밀번호 변경
  const __newPass = () => {
    inputValue.code = code;
    inputValue.email = props.email;
    inputValue.newPassword = newPassword;

    if (!newPassword) {
      Swal.fire({
        icon: "error",
        title: "새로운 비밀번호를 입력해주세요",
        confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
      });
    } else if (!PW_REGEX.test(newPassword)) {
      Swal.fire({
        icon: "error",
        title: "대,소문자 and 숫자 포함 8글자 입력해주세요",
        confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
      });
    } else {
      Swal.fire({
        title: "새로운 비밀번호 설정 중입니다",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();

          newpassAPI(inputValue).then((res) => {
            // console.log(res);
            if (res.status == 200) {
              Swal.fire({
                title: "비밀번호 변경을 성공했습니다",
                icon: "success",
                showConfirmButton: false,
                timer: 500,
              });
              props.changeHandle(true, "code");
              setAuthFin(true);
              __SignIn();
            } else if (res.status == 402) {
              Swal.fire({
                icon: "error",
                title: "잘 못된 비밀번호를 입력했습니다",
                text: "다시 확인해주세요",
                confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
              });
            } else {
              props.changeHandle(false, "code");
            }
          });
        },
      });
    }
  };

  return (
    <div>
      {authFin ? (
        <></>
      ) : (
        <>
          <Typography display="inline" sx={{ fontSize: 14 }}>
            인증번호 확인
          </Typography>
          <CountdownTimer changeTimerHandle={changeTimerHandle} />
          <br />
          <EmailWrp>
            <input
              id="code"
              type="text"
              placeholder="인증번호"
              value={code || ""}
              disabled={authFin ? true : false}
              onChange={codeHandleChange}
            />
            <Button
              onClick={compareEmailCodeClick}
              disabled={authFin ? true : false}
              sx={{ width: 100, height: 47 }}
            >
              확인
            </Button>
          </EmailWrp>
        </>
      )}
      {/* {새로운 비번 등록칸} */}
      {props.lostpw ? (
        <EmailWrp>
          <input
            id="newPassword"
            type="password"
            placeholder="새로운 비밀번호 입력"
            value={newPassword || ""}
            onChange={passHandleChange}
            // disabled={showEmailCodeCheck ? false : true}
            disabled={authFin ? false : true}
          />
          <Button
            disabled={authFin ? false : true}
            sx={{ width: 100, height: 47 }}
            onClick={__newPass}
          >
            제출
          </Button>
        </EmailWrp>
      ) : null}
    </div>
  );
}

// 스타일컴포넌트 함수안에쓰면 리렌더링 일어나서 인풋 끊겨서 입력됨
const EmailWrp = styled.div`
  display: flex;
`;
