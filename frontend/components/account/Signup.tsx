import axios from "axios";
import styled from "@emotion/styled";
import React, { useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memberActions } from "store/slice/member";
import Swal from "sweetalert2";
import Router from "next/router";
import SearchTag from "./SearchTag";
import Btn from "components/commons/Btn";
import ControlMenu from "./ControlMenu";
import CheckEmailCode, { SendEmailCodeAPI } from "./CheckEmailCode";
import Button from "@mui/material/Button";
//백에서 사용하는 되는 유효성
const ID_REGEX = /^[0-9a-zA-Z_-]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,6}$/;
const NICK_REGEX = /^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,12}$/;
// const PW_REGEX = /^[a-zA-Z0-9]{7,16}$/;
// 비밀번호 포맷 확인(영문, 숫자포함 8~16자리)
const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{7,16}$/;
const ERROR_MSG: any = {
  required: "필수값입니다.",
  invalidId: "Ex) Email@naver.com",
  validId: "허가한다.",
  invalidPw: "대,소문자 and 숫자 포함 8~16 글자",
  validPw: "허가한다.",
  invalidNick: "한글 or 대,소문자 or 숫자 2~12 글자",
  invalidConfirmPw: "비밀번호가 일치하지 않습니다.",
};

const Signup = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);
  const banRef = useRef<any>(null);
  const [promotion, setPromotion] = useState<boolean>(false);
  const [inputState, setInputState] = useState<any>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
    showPasswordConfirm: false,
    // banlist: "",
    // likelist: "",
    interest: "",
    mbti: "",
    verse: "",
    code: false,
  });
  // console.log(inputState.email);
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [date, setDate] = useState("");
  const [sortType, setSortType] = useState("성별");
  const [errorData, setErrorData] = useState<any>({
    email: false,
    nickname: false,
    password: false,
    passwordConfirm: false,
  });
  const [searchTags, setSearchTags] = useState<any>([]);
  const [banTags, setBanTags] = useState<any>([]);
  const [nicknameCheckRes, setNicknameCheckRes] = useState<any>({}); // 닉네임 중복검사
  const [authFin, setAuthFin] = useState<boolean>(false); //인증버튼 막기
  const [showEmailCodeCheck, setShowEmailCodeCheck] = useState<boolean>(false); //이메일인증
  const onSearch = (e: any) => {
    if (inputRef.current.value.length > 0 && inputRef.current.value.trim()) {
      if (e.key === "Enter") {
        const currentValue = e.target.value;
        // updateSearchInput("");
        inputRef.current.value = "";
        setSearchTags((prev: any) => [...prev, currentValue]);
      }
    }
  };
  const onBanSearch = (e: any) => {
    if (banRef.current.value.length > 0 && banRef.current.value.trim()) {
      if (e.key === "Enter") {
        const currentValue = e.target.value;
        // updateBanInput("");
        banRef.current.value = "";
        setBanTags((prev: any) => [...prev, currentValue]);
      }
    }
  };
  const deleteTag = (idx: number) => {
    const newSearchTags = [...searchTags];
    newSearchTags.splice(idx, 1);
    setSearchTags(newSearchTags);
  };
  const deleteBanTag = (idx: number) => {
    const newSearchTags = [...banTags];
    newSearchTags.splice(idx, 1);
    setBanTags(newSearchTags);
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
      msg = "이메일 양식을 확인해주세요.";
    } else {
      // 인증코드 보내기
      setShowEmailCodeCheck(true);
      setAuthFin(true); // 우선 인증버튼 누르자마자 막기
      Swal.fire({
        title: "인증번호를 전송중입니다",
        text: "전송에 시간이 조금 걸릴 수 있으니 조금만 기다려주세요",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
          SendEmailCodeAPI(inputState.email).then((res: any) => {
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
                title: "이미 있는 이메일주소입니다. 다른 이메일로 시도해주세요",
                icon: "error",
                confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
              });
              setShowEmailCodeCheck(false);
              setAuthFin(false); // 우선 인증버튼 누르자마자 막기
            } else {
              Swal.fire({
                icon: "error",
                title: "로그인 중 문제가 발생했습니다",
                text: "지속적으로 같은 문제 발생시 관리자에게 문의하세요",
                confirmButtonText: "&nbsp&nbsp확인&nbsp&nbsp",
              });
            }
          });
        },
      });
    }
  };
  //이메일 다시받기 위해 true false
  const sendEmailCodeAgainClick = () => {
    setShowEmailCodeCheck(false);
    setAuthFin(false);
  };

  const changeHandles = (value: any, name: any) => {
    inputState[name] = value;
    if (value == false) {
      setAuthFin(false);
    }
  };
  //입력후 빈문자열 만드는건 함수 사용안하고 직접사용으로 대체함
  // const updateSearchInput = (value: any) => {
  //   inputRef.current.value = value;
  // };
  // const updateBanInput = (value: any) => {
  //   banRef.current.value = value;
  // };
  const gender = [
    { value: "", name: "성별" },
    { value: "M", name: "남자" },
    { value: "F", name: "여자" },
  ];
  //일반적인 input 핸들러
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
    // console.log(value);
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
  //닉네임 유효성
  const nicknameHandleChange = (e: any) => {
    const value = e.target.value;

    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACK + "member/check/" + value,
    })
      .then((res) => {
        // console.log(res.status);
        setNicknameCheckRes({ code: res.data.status, msg: res.data.message });
        return res.status;
      })
      .catch((err) => {
        setNicknameCheckRes({
          code: err.response.data.status,
          msg: err.response.data.message,
        });
        return console.log(err.response);
      });
  };
  const __SignIn = () => {
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
      .then((res) => {
        // console.log(res);
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
        // console.log(err.response);
      });
  };
  const __SignUp = () => {
    const data = {
      email: inputState.email,
      nickname: inputState.nickname,
      password: inputState.password,
      birthday: date.replace(/-/g, "."),
      gender: sortType,
      interest: inputState.interest,
      likelist: searchTags.toString(),
      banlist: banTags.toString(),
      mbti: inputState.mbti,
      verse: inputState.verse,
    };
    // console.log(data);
    axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACK + "member",
      data: data,
    })
      .then((res) => {
        __SignIn();
      })
      .catch((err) => {});
  };
  //태그 엔터 입력을 위해서 회원가입은 폼 기능막고 클릭으로 가입
  const handleSubmit = () => {
    // (event: any) => {
    //   event.preventDefault();

    let isNormal = true;
    let msg = "";

    let emailValue = errorData.email != true;
    let nickNameValue = nicknameCheckRes.code == 200;
    let passwordValue = errorData.password != true;
    let passwordConfirmValue = errorData.passwordConfirm != true;
    if (!inputState.email || emailValue) {
      isNormal = false;
      msg = "이메일을 다시 입력해주세요.";
    } else if (!authFin || !showEmailCodeCheck || !inputState.code) {
      isNormal = false;
      msg = "이메일 인증을 해주세요.";
    } else if (!nickNameValue) {
      isNormal = false;
      msg = "닉네임을 다시 입력해주세요.";
    } else if (!inputState.password || passwordValue) {
      isNormal = false;
      msg = "비밀번호를 다시 입력해주세요.";
    } else if (!inputState.passwordConfirm || passwordConfirmValue) {
      isNormal = false;
      msg = "비밀번호 확인을 다시 입력해주세요.";
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
      <form
      // onSubmit={handleSubmit}
      >
        <h4>호패 등록</h4>
        <EmailWrp>
          <input
            id="email"
            type="text"
            placeholder="이메일"
            value={inputState.email}
            disabled={authFin ? true : false}
            // onChange={(e) => {
            //   handleChange(e);
            //   checkRegex("email");
            // }}
            onChange={handleChange}
            onBlur={() => checkRegex("email")}
          />
          <EmailBtn
            onClick={sendEmailCodeClick}
            disabled={authFin ? true : false}
            sx={{
              width: 100,
              height: 47,
            }}
          >
            인증받기
          </EmailBtn>
        </EmailWrp>

        <div className="text-red-500">
          {errorData["email"] !== true ? ERROR_MSG[errorData["email"]] : ""}
        </div>
        <>
          {showEmailCodeCheck ? (
            <CheckEmailCode
              changeHandle={changeHandles}
              email={inputState.email}
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

        <input
          id="nickname"
          type="text"
          placeholder="닉네임"
          value={inputState.nickname || ""}
          onChange={(e) => {
            handleChange(e);
            nicknameHandleChange(e);
          }}
          onBlur={() => checkRegex("nickname")}
        />

        {/* {404는 쿼리없이 호출했을때, 401은 2-12글자 아닐때 402는 닉넴중복} */}
        {nicknameCheckRes.code == 404 ? (
          <div className="text-red-500"> 비어있소 </div>
        ) : nicknameCheckRes.code == 401 ? (
          <div className="text-red-500"> {nicknameCheckRes.msg}</div>
        ) : nicknameCheckRes.code == 402 ? (
          <div className="text-red-500"> {nicknameCheckRes.msg}</div>
        ) : (
          <div className="text-green-500">{nicknameCheckRes.msg}</div>
        )}
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
          onBlur={() => {
            checkRegex("password");
            checkRegex("passwordConfirm");
          }}
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
          onChange={(e) => {
            handleChange(e);
            // checkRegex("passwordConfirm");
          }}
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
              <SearchBoxContainer>
                <SearchInputContainer>
                  <SpanWrp>받고 싶은 선물</SpanWrp>
                  <input
                    type="text"
                    id="likelist"
                    ref={inputRef}
                    // value={inputState.likelist || ""}
                    // onChange={handleChange}
                    onKeyDown={onSearch}
                    placeholder="입력 후 엔터"
                  />
                </SearchInputContainer>
                <SearchTagContainer>
                  {searchTags.map((tag: any, idx: number) => (
                    <SearchTag
                      key={tag + idx}
                      tag={tag}
                      deleteTag={() => deleteTag(idx)}
                    />
                  ))}
                </SearchTagContainer>
              </SearchBoxContainer>
              <SearchBoxContainer>
                <SearchInputContainer>
                  <SpanWrp>받기 싫은 선물</SpanWrp>
                  <input
                    type="text"
                    id="banlist"
                    ref={banRef}
                    // value={inputState.likelist || ""}
                    // onChange={handleChange}
                    onKeyDown={onBanSearch}
                    placeholder="입력 후 엔터"
                  />
                </SearchInputContainer>
                <SearchTagContainer>
                  {banTags.map((tag: any, idx: number) => (
                    <SearchTag
                      key={tag + idx}
                      tag={tag}
                      deleteTag={() => deleteBanTag(idx)}
                    />
                  ))}
                </SearchTagContainer>
              </SearchBoxContainer>
              <span>생일</span>
              <input
                id="date"
                className="dateSection"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
              <ControlMenu
                value={sortType}
                onChange={setSortType}
                optionList={gender}
              />
              <input
                id="interest"
                type="text"
                value={inputState.interest || ""}
                onChange={handleChange}
                placeholder="관심사"
              />
              <input
                id="mbti"
                type="text"
                name=""
                value={inputState.mbti || ""}
                onChange={handleChange}
                placeholder="MBTI"
              />
              <input
                id="verse"
                type="text"
                name=""
                value={inputState.verse || ""}
                onChange={handleChange}
                placeholder="한마디"
              />
            </div>
          )}
        </div>
        <Btn filled={true} className="me-2" onClick={handleSubmit}>
          등록
        </Btn>
        {/* <input type="submit" name="" onClick={handleSubmit} value="등록" /> */}
      </form>
    </div>
  );
};

const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 14px 0px;
  // padding: 4px 1px;
  padding-top: 10px;
  width: 100%;
  align-items: center;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  background-color: #e9e5e1;
`;

const SearchInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  // align-items: center;
`;
const SearchTagContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  justify-content: center;
`;

const SpanWrp = styled.span`
  // margin: 0 10px;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 5px;
`;

const EmailWrp = styled.div`
  display: flex;
`;

const EmailBtn = styled(Button)`
  background-color: #d4c5b3;
  font-weight: 600;
  margin-left: 1px;
  &:hover {
    background-color: #c4b5a2;
  }
`;

export default Signup;
