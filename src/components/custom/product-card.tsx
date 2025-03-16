import { Card } from '@/components/ui/card' // Đã bỏ /ui
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

// Định nghĩa interface Product
export interface Product {
  id: string | number
  name: string
  price: number
  image: string
  category?: string
  // ... có thể thêm các thuộc tính khác tùy nhu cầu
}

// Props type cho component
interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={`group overflow-hidden transition-shadow hover:shadow-xl ${className}`}>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      
      <div className="p-6">
        {product.category && (
          <span className="text-sm font-medium text-primary">
            {product.category}
          </span>
        )}
        <h3 className="mt-2 font-serif text-xl font-semibold">
          <Link 
            href={`/products/${product.id}`} 
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            aria-label={`Add ${product.name} to cart`}
          >
            Quick Add
          </Button>
        </div>
      </div>
    </Card>
  )
}