interface Schedule {
  dday: number;
  title: string;
}

interface Product {
  imageUrl: string;
}

export default class CardMember {
  friendId: number;
  nickname: string;
  scheduleList: Array<Schedule>;
  imageString: string;
  verse: string;
  wishlist: Array<Product>;

  constructor(data: any) {
    this.imageString = data.imageString || "";
    this.nickname = data.nickname || "";
    this.scheduleList = data.scheduleList || [];
    this.wishlist = data.wishlist || [];
    this.verse = data.verse || "";
    this.friendId = data.friendId || 0;
  }
}
