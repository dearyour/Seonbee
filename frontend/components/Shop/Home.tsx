import React, { useCallback, useEffect, useState } from "react";
import EmptyView from "components/ShopComponent/EmptyView";
import FilterPanel from "components/ShopContainer/FilterPanel";
import List from "components/ShopContainer/List";
import SearchBar from "components/ShopContainer/SearchBar";
import { categoryRadio, dataList } from "../constants";
import CategoryBtn from "components/ShopComponent/CategoryBtn";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [categoryTag, setCategoryTag] = useState(1);
  const handleClickEmote = useCallback((tag: number) => {
    setCategoryTag(tag);
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
  const [searchOption, setSearchOption] = useState(true);
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
                onClick={handleClickEmote}
                isSelected={it.category_id === categoryTag}
              />
            ))}
          </div>
          <div className="input_box category_list_wrapper">
            {categoryRadio.map((it: any) => (
              <CategoryBtn
                key={it.category_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.category_id === categoryTag}
              />
            ))}
          </div>
        </section>
      )}
      <div className="home_panelList-wrap">
        {/* Filter Panel */}
        <div className="home_panel-wrap">
          <FilterPanel
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            cuisines={cuisines}
            changeChecked={handleChangeChecked}
            changePrice={handleChangePrice}
          />
        </div>
        {/* List & Empty View */}
        <div className="home_list-wrap">
          {resultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default Home;
