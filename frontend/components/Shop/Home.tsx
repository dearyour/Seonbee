import React, { useCallback, useEffect, useState } from "react";
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
const sortOptionList = [
  { value: "ratingDesc", name: "최다 조회 수" },
  { value: "ratingAsc", name: "최대 평점 순" },
  { value: "latest", name: "높은 가격 순" },
  { value: "oldest", name: "낮은 가격 순" },
];
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  //카테고리 상태
  const [categoryTag, setCategoryTag] = useState(1);
  const [categoryTags, setCategoryTags] = useState(1);
  const [sortType, setSortType] = useState<String>("ratingDesc");

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

  const __GetShopState = useCallback(() => {
    return axios({
      method: "GET",
      // url: process.env.BACK_EC2 + "wine",
      url: process.env.NEXT_PUBLIC_BACK + "shop",
      // url: "https://localhost:8080/api/wine",
      // url: "http://j6a101.p.ssafy.io:8080/api/wine",
    })
      .then((res) => {
        console.log(res);
        setShopItem(res.data.productList);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }, []);
  useEffect(() => {
    __GetShopState();
  }, [__GetShopState]);

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

  const handleChangePrice = (event: React.MouseEvent, value: any) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList;

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => Number(item.rating) === parseInt(selectedRating)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Cuisine Filter
    const cuisinesChecked = cuisines
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter((item) =>
        cuisinesChecked.includes(item.cuisine)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    // updatedList = updatedList.sort(compare);

    setList(updatedList);

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
      />
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
              changeChecked={handleChangeChecked}
            />
            <Blue>친구 검색</Blue>
            <SearchUsers />
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
