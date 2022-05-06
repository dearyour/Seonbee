export class Lantern {
  lanternId: number;
  guestId: number;
  nickname: string;
  content: string;
  position: number;
  lanternType: number;

  constructor(data: any) {
    this.lanternId = data.lanternId || 0;
    this.guestId = data.guestId || 0;
    this.nickname = data.nickname || "";
    this.content = data.content || "";
    this.position = data.position || 0;
    this.lanternType = data.lanternType || 0;
  }
}

function LanternList(data: Array<any>): Lantern[] {
  return data.map((now) => {
    return new Lantern(now);
  });
}

export default LanternList;
