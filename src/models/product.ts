// models/product.ts
export interface Product {
    id: number | string
    name: string
    price: number
    image: string
    category?: string
    description?: string
    // ... thêm các thuộc tính khác
  }