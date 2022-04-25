export class Product {
  id: number
  createdDate: Date
  isDeleted: boolean
  naverId: number
  name: string
  buyUrl: string
  price: number
  imageUrl: string
  category1: string
  category2: string
  category3: string
  brand: string
  hit: number


  constructor(data: any) {
    this.id = data.id || 0
    this.createdDate = data.createdDate || Date.now()
    this.isDeleted = data.isDeleted || false
    this.naverId = data.naverId || 0
    this.name = data.name || ''
    this.buyUrl = data.buyUrl || ''
    this.price = data.price || 0
    this.imageUrl = data.imageUrl || ''
    this.category1 = data.category1 || ''
    this.category2 = data.category2 || ''
    this.category3 = data.category3 || ''
    this.brand = data.brand || ''
    this.hit = data.hit || 0
  }
}

function ProductList(data: Array<any>): Product[] {
  return data.map((now) => {
    return new Product(now)
  })
}

export default ProductList