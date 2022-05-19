import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyView from "components/ShopComponent/EmptyView";
import FilterPanel from "components/ShopContainer/FilterPanel";
import List from "components/ShopContainer/List";
import SearchBar from "components/ShopContainer/SearchBar";
import {
  categoryRadio,
  categoryRadios,
  categoryRadiod,
  dataList,
} from "../constants";
import CategoryBtn from "components/ShopComponent/CategoryBtn";
import CategoryBtns from "components/ShopComponent/CategoryBtns";
import SearchUsers from "./SearchUsers";
import styled from "@emotion/styled";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { layoutAction } from "store/slice/layout";
import { RootState } from "store/slice";
import { IoMdGitMerge } from "react-icons/io";
import CartList from "components/ShopContainer/List/CartList";
import Swal from "sweetalert2";
import ControlMenus from "components/Shop/ControlMenus";
import { BsArrowUpSquareFill } from "react-icons/bs";
const sortOptionList = [
  { value: "recommendMany", name: "최다 추천수 순" },
  { value: "hitMany", name: "최다 조회수 순" },
  { value: "upperPrice", name: "높은 가격 순" },
  { value: "downPrice", name: "낮은 가격 순" },
  { value: "giveMany", name: "최다 주고싶소 순" },
  { value: "wishMany", name: "최다 갖고싶소 순" },
];
const Home = () => {
  const dispatch = useDispatch();
  const SearchRef: any = useRef(null);
  const ShopReduxState = useSelector(
    (state: RootState) => state.layout?.detailData
  );
  const CartData = useSelector((state: RootState) => state.layout?.cartData);
  const { friendId } = useSelector(
    (state: RootState) => state.layout?.giveUser
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([100, 10000000]);
  //카테고리 상태
  const [categoryTag, setCategoryTag] = useState(1); // 카테고리 숫자 찍힘
  const [categoryTagData, setCategoryTagData] = useState(""); // 카테고리 value 찍힘
  const [categoryTags, setCategoryTags] = useState(1); // 카테고리 2단계숫자 찍힘
  const [categoryTagDatas, setCategoryTagDatas] = useState(""); // 카테고리 2단계 value 찍힘
  const [categoryTagd, setCategoryTagd] = useState(1); // 카테고리 2단계숫자 찍힘
  const [categoryTagDatad, setCategoryTagDatad] = useState(""); // 카테고리 2단계 value 찍힘
  const [sortType, setSortType] = useState<String>("recommendMany");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };
  const handleClickTag = useCallback((tag: number) => {
    setCategoryTag(tag);
  }, []);
  const handleClickTags = useCallback((tag: number) => {
    setCategoryTags(tag);
  }, []);
  const handleClickTagd = useCallback((tag: number) => {
    setCategoryTagd(tag);
  }, []);
  const handleClickTagData = useCallback((tag: string) => {
    setCategoryTagData(tag);
  }, []);
  const handleClickTagDatas = useCallback((tag: string) => {
    setCategoryTagDatas(tag);
  }, []);
  const handleClickTagDatad = useCallback((tag: string) => {
    setCategoryTagDatad(tag);
  }, []);

  const [cuisines, setCuisines] = useState([
    { id: 1, checked: false, label: "과자/베이커리" },
    { id: 2, checked: false, label: "여성의류" },
    { id: 3, checked: false, label: "음료" },
    { id: 4, checked: false, label: "냉동/간편조리식품" },
    { id: 5, checked: false, label: "문구/사무용품" },
    { id: 6, checked: false, label: "주방용품" },
  ]);
  const [cuisined, setCuisined] = useState([
    { id: 1, checked: false, label: "e쿠폰" },
    { id: 5, checked: false, label: "커피" },
    { id: 4, checked: false, label: "이벤트/파티용품" },
    { id: 3, checked: false, label: "빵" },
    { id: 6, checked: false, label: "쿠키" },
    { id: 2, checked: false, label: "케이크" },
  ]);

  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [shopItem, setShopItem] = useState([]);
  const [shopSearchItem, setShopSearchItem] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchOption, setSearchOption] = useState(true); // 검색 옵션 토글버튼
  const [nowFeedsnum, setNowFeedsNum] = useState(10); //인피니트 스크롤
  const [loading, setLoading] = useState<boolean>(false);
  const loadmoredata = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setNowFeedsNum(nowFeedsnum + 5);
    }, 1000);
    setLoading(false);
  };
  // 주고싶소
  const __postGiveUser = (e: any) => {
    const token = sessionStorage.getItem("Token");
    e.preventDefault();
    axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACK + "shop/give",
      headers: { Authorization: "Bearer " + token },
      data: {
        friendId,
        productId: CartData.productId,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.status == 200) {
          Swal.fire({
            title: "주고싶소에 추가 되었습니다.",
            text: "",
            icon: "success",
            showConfirmButton: false,
          });
        }
        toggleCart();
      })
      .catch((err) => {
        if (err.response.status === 500) {
          console.log(err.response);
          Swal.fire({
            title: "로그인 후 이용 하실 수 있습니다.",
            text: "",
            icon: "error",
            showConfirmButton: false,
          });
          toggleCart();
        } else if (err.response.status === 402) {
          Swal.fire({
            title: "이미 주고싶소에 추가된 상품입니다.",
            text: "",
            icon: "error",
            showConfirmButton: false,
          });
          toggleCart();
        } else if (err.response.status === 401) {
          Swal.fire({
            title: "벗을 선택해 주세요",
            text: "",
            icon: "error",
            showConfirmButton: false,
          });
        }
      });
  };
  //검색 상품 상태
  const __getSearchShop = (e: any) => {
    e.preventDefault();
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACK + "shop/" + searchInput,
    })
      .then((res) => {
        // console.log(res);
        setShopItem(res.data.productList);
        dispatch(layoutAction.updateDetailData(res.data.productList));
        SearchRef.current.value = "";
        // setSearchInput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //검색 한글자 마다 호출
  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: process.env.NEXT_PUBLIC_BACK + "shop/" + searchInput,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       setShopSearchItem(res.data.productList);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [searchInput]);

  // 처음 상품 상태
  const __GetShopState = useCallback(() => {
    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACK + "shop",
    })
      .then((res) => {
        // console.log(res);
        setShopItem(res.data.productList);
        dispatch(layoutAction.updateDetailData(res.data.productList));
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }, []);
  useEffect(() => {
    __GetShopState();
  }, []);

  const compare = useCallback(
    (a: any, b: any) => {
      if (sortType === "upperPrice") {
        return parseInt(b.price) - parseInt(a.price);
      } else if (sortType === "downPrice") {
        return parseInt(a.price) - parseInt(b.price);
      } else if (sortType === "hitMany") {
        {
          return parseInt(b.hit) - parseInt(a.hit);
        }
      } else if (sortType === "recommendMany") {
        {
          return parseInt(b.recommend) - parseInt(a.recommend);
        }
      } else if (sortType === "giveMany") {
        {
          return parseInt(b.give) - parseInt(a.give);
        }
      } else if (sortType === "wishMany") {
        {
          return parseInt(b.wish) - parseInt(a.wish);
        }
        // parseFloat(a.ratingAvg.toFixed(1)) -
        // parseFloat(b.ratingAvg.toFixed(1))
      }
    },
    [sortType]
  );
  const handleSelectCategory = (event: React.MouseEvent, value: any) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event: React.MouseEvent, value: any) =>
    !value ? null : setSelectedRating(value);

  const handleChangeChecked = (id: React.MouseEvent) => {
    const cusinesStateList = cuisines;
    const changeCheckedCuisines = cusinesStateList.map((item: any) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisines(changeCheckedCuisines);
  };
  const handleChangeCheckedd = (id: React.MouseEvent) => {
    const cusinesStateList = cuisined;
    const changeCheckedCuisines = cusinesStateList.map((item: any) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisined(changeCheckedCuisines);
  };

  const handleChangePrice = (event: React.MouseEvent, value: any) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = ShopReduxState;
    if (updatedList) {
      // Rating Filter
      if (selectedRating) {
        updatedList = updatedList.filter(
          (item: any) => Number(item.rating) === parseInt(selectedRating)
        );
      }

      // Category Filter
      // if (categoryTagData) {
      //   updatedList = updatedList.filter(
      //     (item: any) => item.category1.toLowerCase() === categoryTagData
      //   );
      // }
      if (categoryTagData) {
        updatedList = updatedList.filter(
          (item: any) => item.category1.toLowerCase() === categoryTagData
        );
      }
      // if (categoryTagDatas) {
      // setShopItem(
      //   categoryTmp.filter(
      //     (item: any) => item.category2.toLowerCase() === categoryTagDatas
      //   )
      // );
      // updatedList = categoryTmp.filter(
      //   (item: any) => item.category2.toLowerCase() === categoryTagDatas
      // );
      // }

      // Category Filter
      if (selectedCategory) {
        updatedList = updatedList.filter(
          (item: any) => item.category === selectedCategory
        );
      }

      // Cuisine Filter
      const cuisinesChecked = cuisines
        .filter((item) => item.checked)
        .map((item) => item.label.toLowerCase());

      if (cuisinesChecked.length) {
        updatedList = updatedList.filter((item: any) =>
          cuisinesChecked.includes(item.category2.toLowerCase())
        );
      }

      // Cuisine Filter
      const cuisinesCheckedd = cuisined
        .filter((item) => item.checked)
        .map((item) => item.label.toLowerCase());

      if (cuisinesCheckedd.length) {
        updatedList = updatedList.filter((item: any) =>
          cuisinesCheckedd.includes(item.category3.toLowerCase())
        );
      }

      // Search Filter
      // if (searchInput) {
      //   updatedList = updatedList.filter(
      //     (item) =>
      //       item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
      //       -1
      //   );
      // }

      // Price Filter
      const minPrice = selectedPrice[0];
      const maxPrice = selectedPrice[1];

      if (shopItem.length) {
        updatedList = updatedList.filter(
          (item: any) => item.price >= minPrice && item.price <= maxPrice
        );
      }
      if (shopItem.length) {
        updatedList = updatedList.sort(compare);
      }
      setShopItem(updatedList);

      // !updatedList.length ? setResultsFound(false) : setResultsFound(true);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [
    selectedRating,
    selectedCategory,
    cuisines,
    cuisined,
    searchInput,
    selectedPrice,
    sortType,
    compare,
    categoryTagData,
    categoryTagDatas,
  ]);

  const GoToTop = styled(BsArrowUpSquareFill)`
    position: fixed;
    right: 20px;
    bottom: 20px;
    font-size: 36px;
    cursor: pointer;
  `;

  const GoTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="home">
      <GoToTop onClick={GoTop}></GoToTop>
      {/* Search Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e: any) => setSearchInput(e.target.value)}
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        getSearchShop={__getSearchShop}
        data={shopItem}
        toggleCart={toggleCart}
        SearchRef={SearchRef}
        shopSearchItem={shopSearchItem}
      />
      {/* {isCartOpen && (
        <div id="backdrop" className="toggleBtn" onClick={toggleCart}></div>
      )} */}
      {isCartOpen && (
        <aside className="dropPage">
          {/* 장바구니의 가시성은 아래 div의 (id="shopping-cart") class명으로 제어합니다. 
        translate-x-full: 장바구니 닫힘 translate-x-0: 장바구니 열림 */}
          <section
            className={`dropSection translate-x-${isCartOpen ? 0 : "full"}`}
            id="shopping-cart"
          >
            <div className="dropSide">
              <div className="dropTop">
                <div className="dropHeader">
                  <div className="dropHe">
                    <button
                      type="button"
                      className="dropTopBtn"
                      onClick={toggleCart}
                    >
                      <svg
                        id="close-cart-btn"
                        className="ImageXBtn"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <h2 className="dropHead">주고싶소</h2>
                </div>
                {/* 아래 하드코딩 되어있는 장바구니 목록들을 유저 상호작용에 맞게 렌더링 되도록 변경해주세요.  */}
                <div id="cart-list">
                  <ul className="cartList">
                    <Blue>친구 목록</Blue>
                    <SearchUsers />
                    <CartList />
                    {/* <CartList
                                      cartItems={cartItems}
                                      setCartItems={setCartItems}
                                  /> */}
                  </ul>
                </div>
              </div>
              <div className="dropBottom">
                <div className="bottomPrice">
                  <p>선물 금액</p>
                  <p className="priceBold" id="total-count">
                    {/* {cartItems
                                      .reduce(
                                          (acc, cur) =>
                                              cur.price * cur.count + acc,
                                          0
                                      )
                                      .toLocaleString() + '원'} */}
                    {CartData.price
                      ? CartData.price.toLocaleString() + `원`
                      : `0 원`}
                  </p>
                </div>
                <p
                  id="payment-btn"
                  className="checkPay"
                  onClick={__postGiveUser}
                >
                  벗에게 주고 싶소
                </p>
                <div className="dropBtnWrp">
                  <p>
                    <button
                      type="button"
                      className="shopBtn"
                      onClick={toggleCart}
                    >
                      계속 저잣거리 둘러보기
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      )}
      {searchOption && (
        <section>
          <div className="input_box category_list_wrapper">
            {categoryRadio.map((it: any) => (
              <CategoryBtn
                key={it.category_id}
                {...it}
                onClick={handleClickTag}
                onClickData={handleClickTagData}
                isSelected={it.category_id === categoryTag}
              />
            ))}
          </div>
          {/* {추가 셀렉} */}
          {/* <div>
            {categoryTagData === "패션의류" ? (
              <div className="input_box category_list_wrapper">
                {categoryRadios.map((it: any) => (
                  <CategoryBtns
                    key={it.category_id}
                    {...it}
                    onClick={handleClickTags}
                    onClickData={handleClickTagDatas}
                    isSelected={it.category_id === categoryTags}
                  />
                ))}
              </div>
            ) : categoryTagData === "도서" ? (
              <div className="input_box category_list_wrapper">
                {categoryRadiod.map((it: any) => (
                  <CategoryBtns
                    key={it.category_id}
                    {...it}
                    onClick={handleClickTagd}
                    onClickData={handleClickTagDatad}
                    isSelected={it.category_id === categoryTagd}
                  />
                ))}
              </div>
            ) : (
              ""
            )}
          </div> */}
        </section>
      )}
      <div className="home_panelList-wrap">
        {/* Filter Panel */}
        {searchOption && (
          <div className="home_panel-wrap">
            <FilterPanel
              selectedCategory={selectedCategory}
              selectCategory={handleSelectCategory}
              selectedRating={selectedRating}
              selectRating={handleSelectRating}
              selectedPrice={selectedPrice}
              changePrice={handleChangePrice}
              cuisines={cuisines}
              cuisined={cuisined}
              changeChecked={handleChangeChecked}
              changeCheckedd={handleChangeCheckedd}
              categoryTagData={categoryTagData}
            />
            <div className="menu_wrapper">
              <div className="left_col">
                <ControlMenus
                  value={sortType}
                  onChange={setSortType}
                  optionList={sortOptionList}
                />
                {/* <ControlMenu
                value={filter}
                onChange={setFilter}
                optionList={filterOptionList}
              /> */}
              </div>
            </div>
          </div>
        )}

        {/* List & Empty View */}
        <div className="home_list-wrap">
          {/* {resultsFound ? <List list={list} /> : <EmptyView />} */}
          {shopItem.length ? (
            <InfiniteScroll
              dataLength={shopItem.slice(0, nowFeedsnum).length} //This is important field to render the next data
              next={loadmoredata}
              hasMore={nowFeedsnum < shopItem.length}
              loader={<div style={{ textAlign: "center" }}>🌟Loading🌟</div>}
              endMessage={
                // <EmptyView />
                // <div className="btn" style={{ textAlign: "center" }}>
                //   <div> 검색 완료 </div>
                // </div>
                <div className="btnsss" style={{ textAlign: "center" }}>
                  <div>🚩 검색 완료 🚩</div>
                </div>
                // <div className="btng--gold"> 검색완료</div>
              }
            >
              {shopItem &&
                shopItem.slice(0, nowFeedsnum).map((item: any, idx: number) => {
                  return (
                    <List
                      list={item}
                      key={idx}
                      toggleCart={toggleCart}
                      isCartOpen={isCartOpen}
                    />
                  );
                })}
            </InfiniteScroll>
          ) : (
            <EmptyView />
          )}
        </div>
      </div>
    </div>
  );
};

const Blue = styled.span`
  color: #38508c;
`;
const SidebarWrap = styled.div`
  border: #c0b4a5 solid 2px;
  padding: 5px;
  border-radius: 5px;
`;
export default Home;
