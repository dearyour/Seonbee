import React from "react";
import { categoryList, ratingList } from "../../constants";
import CheckboxProton from "components/ShopComponent/CheckboxProton";
import CheckboxProtons from "components/ShopComponent/CheckboxProtons";
import FilterListToggle from "components/ShopComponent/FilterListToggle";
import SliderProton from "components/ShopComponent/SliderProton";

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
}) => (
  <div>
    <div className="input-groupShop">
      <p className="label">Category</p>
      <FilterListToggle
        options={categoryList}
        value={selectedCategory}
        selectToggle={selectCategory}
      />
    </div>
    <div className="input-groups">
      <div className="input-groupShop">
        <p className="label">셀렉1</p>
        {cuisines.map((cuisine) => (
          <CheckboxProton
            key={cuisine.id}
            cuisine={cuisine}
            changeChecked={changeChecked}
          />
        ))}
      </div>
      <div className="input-groupr">
        <p className="label">셀렉2</p>
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
    <div className="input-groupShop">
      <p className="label">Star Rating</p>
      <FilterListToggle
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div>
  </div>
);

export default FilterPanel;
