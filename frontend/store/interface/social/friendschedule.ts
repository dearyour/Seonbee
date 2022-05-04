class FriendSchedule {
  friendId: number;
  nickname: string;
  scheduleDate: string;
  title: string;

  constructor(data: any) {
    this.friendId = data.friendId || "";
    this.nickname = data.nickname || "";
    this.scheduleDate = data.scheduleDate || "";
    this.title = data.title || "";
  }
}

export default FriendSchedule;
