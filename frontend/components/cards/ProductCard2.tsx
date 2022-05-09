import { Card } from "@mui/material";
import React from "react";

interface Props {
  name: string;
  price: number;
  buyUrl: string;
  imageUrl: string;
  wishlistId?: number;
  productId?: number;
  giverId?: number;
  giverName?: String;
  isSaved?: boolean;
}

const ProductCard2 = (props: Props) => {
  return <Card>ProductCard2</Card>;
};

export default ProductCard2;
