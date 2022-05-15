import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyView from "components/ShopComponent/EmptyView";
import FilterPanel from "components/ShopContainer/FilterPanel";
import List from "components/ShopContainer/List";
import SearchBar from "components/ShopContainer/SearchBar";
import { categoryRadio, categoryRadios, dataList } from "../constants";
import CategoryBtn from "components/ShopComponent/CategoryBtn";
import SearchUsers from "./SearchUsers";
import styled from "@emotion/styled";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { layoutAction } from "store/slice/layout";
import { RootState } from "store/slice";
import { IoMdGitMerge } from "react-icons/io";
const sortOptionList = [
  { value: "ratingDesc", name: "최다 조회 수" },
  { value: "ratingAsc", name: "최대 평점 순" },
  { value: "latest", name: "높은 가격 순" },
  { value: "oldest", name: "낮은 가격 순" },
];
const Home = () => {
  const dispatch = useDispatch();
  const ShopReduxState = useSelector(
    (state: RootState) => state.layout.detailData
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([100, 1000000]);
  //카테고리 상태
  const [categoryTag, setCategoryTag] = useState(1);
  const [categoryTags, setCategoryTags] = useState(1);
  const [sortType, setSortType] = useState<String>("ratingDesc");
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
  const [cuisines, setCuisines] = useState([
    { id: 1, checked: false, label: "American" },
    { id: 2, checked: false, label: "Chinese" },
    { id: 3, checked: false, label: "Italian" },
    { id: 4, checked: false, label: "American" },
    { id: 5, checked: false, label: "Chinese" },
    { id: 6, checked: false, label: "Italian" },
  ]);
  const [cuisined, setCuisined] = useState([
    { id: 1, checked: false, label: "Cabernet Sauvignon" },
    { id: 2, checked: false, label: "Cabernet Sauvignon" },
    { id: 3, checked: false, label: "Italian" },
    { id: 4, checked: false, label: "American" },
    { id: 5, checked: false, label: "Chinese" },
    { id: 6, checked: false, label: "Italian" },
  ]);

  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchOption, setSearchOption] = useState(true); // 검색 옵션 토글버튼
  const [shopItem, setShopItem] = useState([]);
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
  //검색 상품 상태
  const __getSearchShop = (e: any) => {
    e.preventDefault();
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACK + "shop/" + searchInput,
    })
      .then((res) => {
        console.log(res);
        setShopItem(res.data.productList);
        dispatch(layoutAction.updateDetailData(res.data.productList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 처음 상품 상태
  const __GetShopState = useCallback(() => {
    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACK + "shop",
    })
      .then((res) => {
        console.log(res);
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
      if (sortType === "latest") {
        return parseInt(b.price) - parseInt(a.price);
      } else if (sortType === "oldest") {
        return parseInt(a.price) - parseInt(b.price);
      } else if (sortType === "ratingDesc") {
        {
          return parseInt(a.price) - parseInt(b.price);
        }
      } else if (sortType === "ratingAsc") {
        {
          return parseInt(a.price) - parseInt(b.price);
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
    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item: any) => Number(item.rating) === parseInt(selectedRating)
      );
    }

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
        cuisinesChecked.includes(item.cuisine)
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

    updatedList = updatedList.filter(
      (item: any) => item.price >= minPrice && item.price <= maxPrice
    );

    // updatedList = updatedList.sort(compare);

    setShopItem(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, cuisines, searchInput, selectedPrice]);

  return (
    <div className="home">
      {/* Search Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e: any) => setSearchInput(e.target.value)}
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        getSearchShop={__getSearchShop}
        data={shopItem}
        toggleCart={toggleCart}
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
                  <h2 className="dropHead">주고싶소</h2>
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
                </div>
                {/* 아래 하드코딩 되어있는 장바구니 목록들을 유저 상호작용에 맞게 렌더링 되도록 변경해주세요.  */}
                <div id="cart-list">
                  <ul className="cartList">
                    <Blue>친구 검색</Blue>
                    <SearchUsers />
                    {/* <CartList
                                      cartItems={cartItems}
                                      setCartItems={setCartItems}
                                  /> */}
                  </ul>
                </div>
              </div>
              <div className="dropBottom">
                <div className="bottomPrice">
                  <p>결제금액</p>
                  <p className="priceBold" id="total-count">
                    {/* {cartItems
                                      .reduce(
                                          (acc, cur) =>
                                              cur.price * cur.count + acc,
                                          0
                                      )
                                      .toLocaleString() + '원'} */}
                  </p>
                </div>
                <p
                  id="payment-btn"
                  className="checkPay"
                  // onClick={saveToLocalStorage}
                >
                  벗에게 주고 싶소
                </p>
                <div className="dropBtnWrp">
                  <p>
                    <button type="button" className="shopBtn">
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
                isSelected={it.category_id === categoryTag}
              />
            ))}
          </div>
          <div className="input_box category_list_wrapper">
            {categoryRadios.map((it: any) => (
              <CategoryBtn
                key={it.category_id}
                {...it}
                onClick={handleClickTags}
                isSelected={it.category_id === categoryTags}
              />
            ))}
          </div>
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
            />
          </div>
        )}

        {/* List & Empty View */}
        <div className="home_list-wrap">
          {/* {resultsFound ? <List list={list} /> : <EmptyView />} */}
          {shopItem ? (
            <InfiniteScroll
              dataLength={shopItem.slice(0, nowFeedsnum).length} //This is important field to render the next data
              next={loadmoredata}
              hasMore={nowFeedsnum < shopItem.length}
              loader={<div style={{ textAlign: "center" }}>🌟Loading...🌟</div>}
              endMessage={
                <EmptyView />
                // <div className="btns" style={{ textAlign: "center" }}>
                //   <div>🚩 검색 완료 🚩</div>
                // </div>
              }
            >
              {shopItem &&
                shopItem.slice(0, nowFeedsnum).map((item: any, idx: number) => {
                  // console.log(feeds);
                  // console.log(feedstate.length)
                  // console.log(nowFeedsnum)

                  return <List list={item} key={idx} />;
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
