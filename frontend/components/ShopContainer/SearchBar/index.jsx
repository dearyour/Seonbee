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
  toggleCart,
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
    <SearchBarWrp>
      <form className="searchBar-wrap" onSubmit={getSearchShop}>
        <SearchIcon className="searchBar-icon" />
        <input
          type="text"
          placeholder="상품 검색 입력 후 엔터"
          value={value}
          onChange={changeInput}
        />
        {/* <div
        className="btns"
        // onClick={() => {
        //   router.push(`/wine/183`);
        // }}
        onClick={__Routing}
      >
        검색조건 초기화
      </div> */}
        <div className="btng--gold">{data.length} 개 검색완료</div>
        <SearchOptionButton onClick={toggleSearchOption}>
          검색 옵션 {searchOption ? "닫기" : "열기"}
        </SearchOptionButton>
      </form>
      <ToggleBtnCart
        id="open-cart-btn"
        className="fill-gray-400 hover:fill-gray-500"
        onClick={toggleCart}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-15l-3.431 12h-2.102l2.542-9h-16.813l4.615 11h13.239l3.474-12h1.929l.743-2h-4.196z" />
        </svg>
      </ToggleBtnCart>
    </SearchBarWrp>
  );
};

const SearchBarWrp = styled.div`
  display: flex;
`;
const ToggleBtnCart = styled.button`
  border-color: transparent;
  border-radius: 10px;
  // margin-left: 30px;
  padding: 0 15px;
  fill: #9ca3af;
  &:hover {
    fill: #6b7280;
  }
`;
const SearchOptionButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  text-decoration: underline;
  color: #5e5e5e;
  margin-right: 30px;
  white-space: nowrap;
`;
export default SearchBar;
