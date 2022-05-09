import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "components/cards/Productcard";
type Props = {};

interface WishResponse {
  productId: number;
  name: string;
  price: number;
  buyUrl: string;
  imageUrl: string;
  giverId: number;
  giverName: string;
}

const Wish = (props: Props) => {
  const [products, setProducts] = useState<WishResponse[]>([]);
  const temp = {
    productId: 1,
    name: "test",
    imageUrl: "https://picsum.photos/250/250",
    buyUrl: "",
    giverId: 2,
    giverName: "test1",
    price: 10000,
  };
  const tempL = [temp, temp, temp];
  useEffect(() => {
    setProducts(tempL);
  }, []);
  return (
    <div>
      <div className="row">
        {tempL.map((now, index) => {
          return (
            <div className="col-4" key={index}>
              <ProductCard {...now}></ProductCard>
            </div>
          );
        })}
        {/* <ProductCard {...products[0]}></ProductCard> */}
      </div>
    </div>
  );
};

export default Wish;
