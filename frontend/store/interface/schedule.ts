export class Schedule {
  id: number
  memberId: object
  scheduleDate: Date
  content: string

  constructor(data: any) {
    this.id = data.id || 0
    this.memberId = data.memberId || 0
    this.scheduleDate = data.scheduleDate || new Date
    this.content = data.content || ''
  }
}

function ScheduleList(data: Array<any>): Schedule[] {
  return data.map((now) => {
    return new Schedule(now)
  })
}

export default ScheduleList