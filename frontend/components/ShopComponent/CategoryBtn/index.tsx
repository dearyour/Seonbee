import React from "react";

const CategoryBtn = ({
  category_id,
  category_img,
  category_descript,
  onClick,
  isSelected,
}: any) => {
  return (
    <div
      onClick={() => onClick(category_id)}
      className={[
        "CategoryItem",
        isSelected ? `CategoryItem_on_${category_id}` : `CategoryItem_off`,
      ].join(" ")}
    >
      {/* <img src={category_img} /> */}
      <span>{category_descript}</span>
    </div>
  );
};
export default CategoryBtn;
