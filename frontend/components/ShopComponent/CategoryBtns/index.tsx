import React from "react";

const CategoryBtns = ({
  category_id,
  category_img,
  category_descript,
  value,
  onClick,
  onClickData,
  isSelected,
}: any) => {
  const __onClick = () => {
    onClick(category_id), onClickData(value);
  };

  return (
    <div
      onClick={() => __onClick()}
      className={[
        "CategoryItem",
        isSelected ? `CategoryItem_on_${category_id}` : `CategoryItem_off`,
      ].join(" ")}
    >
      {/* <img src={category_img} /> */}
      <span>{category_descript}</span>
      {/* <span>{value}</span> */}
    </div>
  );
};
export default CategoryBtns;
