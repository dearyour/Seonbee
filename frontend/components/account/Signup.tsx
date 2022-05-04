import axios from "axios";
import styled from "@emotion/styled";
import React, { useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memberActions } from "store/slice/member";
import Swal from "sweetalert2";
import Router from "next/router";
import SearchTag from "./SearchTag";
import Btn from "components/commons/Btn";
const ID_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const NICK_REGEX = /^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,12}$/;
// const PW_REGEX = new RegExp("^(?=.*[a-zA-Z])(?=.*d)(?=.*W).{8,16}$");
const PW_REGEX = /^[a-zA-Z0-9]{8,16}$/;
// 비밀번호 정규표현식 : 최소 8자, 최대 16자, 하나 이상의 문자, 하나 이상의 숫자, 하나 이상의 특수문자
const ERROR_MSG: any = {
  required: "비어있소.",
  invalidId: "Ex) Email@naver.com",
  validId: "허가한다.",
  invalidPw: "대,소문자 or 숫자 구성 8~16 글자",
  validPw: "허가한다.",
  invalidNick: "한글 or 대,소문자 or 숫자 2~12 글자",
  invalidConfirmPw: "비밀번호가 일치하지 않습니다.",
};
const ControlMenu = React.memo(({ value, onChange, optionList }: any) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it: any, idx: number) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const Signup = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);
  const banRef = useRef<any>(null);
  const [promotion, setPromotion] = useState(false);
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
  });
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [date, setDate] = useState("1995-05-05");
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
  console.log(nicknameCheckRes);
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

  const nicknameHandleChange = (e: any) => {
    const value = e.target.value;

    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACK + "member/check/" + value,
    })
      .then((res) => {
        console.log(res.status);
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
      birthday: date.replace(/-/g, "."),
      gender: sortType,
      interest: inputState.interest,
      likelist: searchTags.toString(),
      banlist: banTags.toString(),
      mbti: inputState.mbti,
      verse: inputState.verse,
    };
    console.log(data);
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

  const handleSubmit = () => {
    // (event: any) => {
    //   event.preventDefault();

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
  console.log(nicknameCheckRes.code);
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
          onChange={(e) => {
            handleChange(e);
            nicknameHandleChange(e);
          }}
          onBlur={() => checkRegex("nickname")}
        />
        {/* {404는 쿼리없이 호출했을때, 401은 2-12글자 아닐때 402는 닉넴중복} */}
        <div className="text-red-500">
          {nicknameCheckRes.code == 404
            ? "비어있소"
            : nicknameCheckRes.code == 401
            ? nicknameCheckRes.msg
            : nicknameCheckRes.msg}
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
              <SearchBoxContainer>
                <SearchInputContainer>
                  <span>좋은 선물</span>
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
                  <span>싫은 선물</span>
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
        <Btn
          filled={true}
          className="me-2"
          onClick={handleSubmit}
          children="등록"
        ></Btn>
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

export default Signup;
