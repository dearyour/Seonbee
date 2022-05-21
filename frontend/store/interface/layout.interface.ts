export interface layoutParam {
  isDetailOpen: boolean;
  detailData: any;
  cartData: any;
  giveUser: Number;
}

export class ShopType {
  productId: number;
  price: number;
  name: string;
  brand: string;
  category1: string;
  category2: string;
  category3: string;
  wish: boolean;
  give: string;
  hit: string;
  recommend: string;
  buyUrl: string;
  imageUrl: string;

  constructor(data: any) {
    this.productId = data.productId || 0;
    this.price = data.price || 0;
    this.name = data.name || "";
    this.brand = data.brand || "";
    this.category1 = data.category1 || "";
    this.category2 = data.category2 || "";
    this.category3 = data.category3 || "";
    this.wish = data.wish || "";
    this.give = data.give || "";
    this.hit = data.hit || "";
    this.recommend = data.recommend || "";
    this.buyUrl = data.buyUrl || "";
    this.imageUrl = data.imageUrl || "";
  }
}

function ShopList(data: Array<any>): ShopType[] {
  return data.map((item) => {
    return new ShopType(item);
  });
}

export default ShopList;
