interface Schedule {
  dday: number
  content: string
}

interface Product {
  imageUrl: string
}


export default class CardMember {
  nickname: string
  schedule: Array<Schedule>
  imageString: string
  verse: string
  product: Array<Product>

  constructor(data: any) {
    this.imageString = data.imageString || ''
    this.nickname = data.nickname || ''
    this.schedule = data.schedule || []
    this.product = data.product || []
    this.verse = data.verse || ''
  }
}