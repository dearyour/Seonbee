import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Router from "next/router";
import styled from "@emotion/styled";
import axios from "axios";
const SearchBar = ({
  value,
  changeInput,
  searchOption,
  setSearchOption,
  getSearchShop,
  data,
}) => {
  const __Routing = () => {
    // location.reload();
    Router.push(`/social`);
    Router.push(`/shop`);
    // setTimeout(() => {
    //   Router.push(`/wine`);
    // }, 5);
  };
  const toggleSearchOption = () => {
    setSearchOption((prev) => !prev);
  };

  return (
    <form className="searchBar-wrap" onSubmit={getSearchShop}>
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
      <div className="btng--gold">{data.length} 개 검색완료</div>
      <SearchOptionButton onClick={toggleSearchOption}>
        검색 옵션 {searchOption ? "닫기" : "열기"}
      </SearchOptionButton>
    </form>
  );
};
const SearchOptionButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  text-decoration: underline;
  color: #5e5e5e;
  margin-left: 50px;
  // white-space: nowrap;
`;
export default SearchBar;
