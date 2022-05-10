import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Router from "next/router";
import styled from "@emotion/styled";
const SearchBar = ({ value, changeInput, searchOption, setSearchOption }) => {
  const __Routing = () => {
    // location.reload();
    Router.push(`/`);
    Router.push(`/shop`);
    // setTimeout(() => {
    //   Router.push(`/wine`);
    // }, 5);
  };
  const toggleSearchOption = () => {
    setSearchOption((prev) => !prev);
  };

  return (
    <div className="searchBar-wrap">
      <SearchIcon className="searchBar-icon" />
      <input
        type="text"
        placeholder="검색 입력 후 엔터"
        value={value}
        onChange={changeInput}
      />
      <div
        className="btns"
        // onClick={() => {
        //   router.push(`/wine/183`);
        // }}
        onClick={__Routing}
      >
        검색조건 초기화
      </div>
      <div className="btng--gold">{}개 검색완료</div>
      <SearchOptionButton onClick={toggleSearchOption}>
        검색 옵션 {searchOption ? "닫기" : "열기"}
      </SearchOptionButton>
    </div>
  );
};

const SearchOptionButton = styled.div`
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  color: #5e5e5e;
  margin-left: 100px;
`;
export default SearchBar;
