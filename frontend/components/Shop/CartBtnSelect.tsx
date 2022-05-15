import React, { useState } from "react";

const CategoryBtn = ({ onClick }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toggleCart = () => {
    setLoading((prev) => !prev);
    onClick();
  };
  return (
    <div
      onClick={() => toggleCart()}
      className={[
        "CartCategoryItem",
        loading ? `CartCategoryItem_on_${1}` : `CartCategoryItem_off`,
      ].join(" ")}
    >
      <span>벗 선택</span>
    </div>
  );
};
export default CategoryBtn;
