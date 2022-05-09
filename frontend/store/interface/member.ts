export class Member {
  id: number;
  createdDate: Date;
  isDeleted: boolean;
  email: string;
  nickname: string;
  isAdmin: boolean;
  isKakao: boolean;
  birthday: string;
  gender: string;
  mbti: string;
  interest: string;
  likelist: string;
  banlist: string;
  image: string;
  friendStatus: string;

  constructor(data: any) {
    this.id = data.id || 0;
    this.createdDate = data.createdDate || Date.now();
    this.isDeleted = data.isDeleted || false;
    this.email = data.email || "";
    this.nickname = data.nickname || "";
    this.isAdmin = data.isAdmin || false;
    this.isKakao = data.isKakao || false;
    this.birthday = data.birthday || "";
    this.gender = data.gender || "";
    this.mbti = data.mbti || "";
    this.interest = data.interest || "";
    this.likelist = data.likelist || "";
    this.banlist = data.banlist || "";
    this.image = data.image || "";
    this.friendStatus = data.friendStatus || "";
  }
}

function MemberList(data: Array<any>): Member[] {
  return data.map((people) => {
    return new Member(people);
  });
}

export default MemberList;
