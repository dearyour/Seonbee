import React from "react";
import { categoryList, ratingList } from "../../constants";
import CheckboxProton from "components/ShopComponent/CheckboxProton";
import CheckboxProtons from "components/ShopComponent/CheckboxProtons";
import FilterListToggle from "components/ShopComponent/FilterListToggle";
import SliderProton from "components/ShopComponent/SliderProton";
import styled from "@emotion/styled";
const FilterPanel = ({
  selectedCategory,
  selectCategory,
  selectedRating,
  selectedPrice,
  selectRating,
  cuisines,
  cuisined,
  changeChecked,
  changeCheckedd,
  changePrice,
  categoryTagData,
}) => (
  <div>
    {/* <div className="input-groupShop">
      <p className="label">Category</p>
      <FilterListToggle
        options={categoryList}
        value={selectedCategory}
        selectToggle={selectCategory}
      />
    </div> */}
    {/* <CommentWrap> */}
    <div className="input-groups">
      <div className="input-groupShop">
        <p className="label">2. 세부 카테고리</p>
        {cuisines.map((cuisine) => (
          <CheckboxProton
            key={cuisine.id}
            cuisine={cuisine}
            changeChecked={changeChecked}
          />
        ))}
      </div>
      <div className="input-groupr">
        <p className="label">3. 세부 카테고리</p>
        {cuisined.map((cuisine) => (
          <CheckboxProtons
            key={cuisine.id}
            cuisined={cuisine}
            changeCheckedd={changeCheckedd}
          />
        ))}
      </div>
    </div>
    <div className="input-groupShop">
      <p className="label-range">가격 범위</p>
      <SliderProton value={selectedPrice} changePrice={changePrice} />
    </div>
    {/* </CommentWrap> */}
    {/* <div className="input-groupShop">
      <p className="label">Star Rating</p>
      <FilterListToggle
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div> */}
  </div>
);

const CommentWrap = styled.div`
  overflow-y: scroll;
  padding-left: 20px;
  padding-right: 10px;
  height: 10vw;
  &::-webkit-scrollbar-track {
    background-color: palevioletred;
  }
`;
export default FilterPanel;
