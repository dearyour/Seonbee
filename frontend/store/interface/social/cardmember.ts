export default class CardMember {
  nickname: string
  schedule: object
  imageString: string
  verse: string
  product: object

  constructor(data: any) {
    this.imageString = data.imageString || ''
    this.nickname = data.nickname || ''
    this.schedule = data.schedule || {}
    this.product = data.product || {}
    this.verse = data.verse || ''
  }
}