export class LanternType {
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

function LanternList(data: Array<any>): LanternType[] {
  return data.map((now) => {
    return new LanternType(now);
  });
}

export default LanternList;

export class LanternFestivalType {
  scheduleId: number;
  scheduleDate: string;
  title: string;
  background: number;
  lanternList: LanternType[];

  constructor(data: any) {
    this.scheduleId = data.scheduleId || 0;
    this.scheduleDate = data.scheduleDate || "";
    this.title = data.title || "";
    this.background = data.background || 0;
    this.lanternList = data.lanternList || [];
  }
}

export class DdayType {
  scheduleId: number;
  scheduleDate: number;
  title: string;

  constructor(data: any) {
    this.scheduleId = data.scheduleId || 0;
    this.scheduleDate = data.scheduleDate || 0;
    this.title = data.title || "";
  }
}
