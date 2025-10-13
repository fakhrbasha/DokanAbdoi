export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
}

export interface Brand {
  id: string
  name: string
  logo: string
  productCount: number
}

export interface Category {
  id: string
  name: string
  image: string
  productCount: number
}

export interface CartItem extends Product {
  quantity: number
}
