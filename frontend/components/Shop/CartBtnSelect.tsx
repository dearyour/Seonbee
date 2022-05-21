import React, { useState } from "react";

const CategoryBtn = ({ onClick, onDelete }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toggleCart = () => {
    if (!loading) {
      setLoading((prev) => !prev);
      onClick();
    } else {
      setLoading((prev) => !prev);
      onDelete();
    }
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
