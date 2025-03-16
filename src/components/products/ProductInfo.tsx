import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";

export const ProductInfo = ({ 
  product,
  className 
}: { 
  product: { name: string; price: string; rating: number; totalReviews: number };
  className?: string;
}) => (
  <div className={`space-y-4 md:space-y-6 ${className}`}>
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
    <p className="text-xl text-red-600 font-semibold">{product.price}</p>
    
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < product.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
      </div>
      <span className="text-sm text-gray-500">
        ({product.totalReviews} đánh giá)
      </span>
    </div>

    {/* Sắp xếp 4 button trong grid 2 cột */}
    <div className="grid grid-cols-2 gap-4">
      <Button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white h-12 cursor-pointer transition">
        <ShoppingCart className="w-5 h-5" />
        Thêm vào giỏ
      </Button>
      <Button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white h-12 cursor-pointer transition">
        Mua ngay
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2 hover:bg-gray-100 text-gray-700 h-12 cursor-pointer transition"
      >
        <Heart className="w-5 h-5" />
        Yêu thích
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2 hover:bg-gray-100 text-gray-700 h-12 cursor-pointer transition"
      >
        <Share2 className="w-5 h-5" />
        Chia sẻ
      </Button>
    </div>
  </div>
);
