"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Filter, 
  ChevronDown,
  ChevronRight,
  Heart,
  ShoppingCart,
  X
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import Image from "next/image";

// Dữ liệu mẫu
const categories = [
  { 
    id: "clothing", 
    name: "Quần áo", 
    subCategories: [
      { id: "shirts", name: "Áo" },
      { id: "pants", name: "Quần" },
      { id: "dresses", name: "Váy đầm" }
    ]
  },
  { 
    id: "shoes", 
    name: "Giày dép", 
    subCategories: [
      { id: "sneakers", name: "Giày thể thao" },
      { id: "sandals", name: "Dép" },
      { id: "boots", name: "Boots" }
    ]
  },
  { 
    id: "accessories", 
    name: "Phụ kiện", 
    subCategories: [
      { id: "bags", name: "Túi xách" },
      { id: "wallets", name: "Ví" },
      { id: "belts", name: "Thắt lưng" }
    ]
  }
];

// Dữ liệu mẫu sản phẩm
const products = [
  {
    id: 1,
    name: "Áo thun basic",
    price: 199000,
    originalPrice: 299000,
    image: "/products/ao-thun-basic.jpg",
    category: "shirts",
    isNew: true,
    isSale: true,
  },
  {
    id: 2,
    name: "Quần jean nam",
    price: 499000,
    originalPrice: 499000,
    image: "/products/quan-jean.jpg",
    category: "pants",
    isNew: false,
    isSale: false,
  },
  {
    id: 3,
    name: "Váy hoa nữ",
    price: 399000,
    originalPrice: 599000,
    image: "/products/vay-hoa.jpg",
    category: "dresses",
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Giày thể thao",
    price: 899000,
    originalPrice: 1199000,
    image: "/products/giay-the-thao.jpg",
    category: "sneakers",
    isNew: true,
    isSale: true,
  },
  {
    id: 5,
    name: "Túi xách nữ",
    price: 799000,
    originalPrice: 799000,
    image: "/products/tui-xach.jpg",
    category: "bags",
    isNew: true,
    isSale: false,
  },
  {
    id: 6,
    name: "Ví da nam",
    price: 299000,
    originalPrice: 399000,
    image: "/products/vi-da.jpg",
    category: "wallets",
    isNew: false,
    isSale: true,
  },
  {
    id: 7,
    name: "Áo sơ mi",
    price: 399000,
    originalPrice: 399000,
    image: "/products/ao-so-mi.jpg",
    category: "shirts",
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    name: "Quần tây",
    price: 599000,
    originalPrice: 799000,
    image: "/products/quan-tay.jpg",
    category: "pants",
    isNew: false,
    isSale: true,
  },
  {
    id: 9,
    name: "Boots da",
    price: 1299000,
    originalPrice: 1299000,
    image: "/products/boots-da.jpg",
    category: "boots",
    isNew: true,
    isSale: false,
  },
  {
    id: 10,
    name: "Dép xỏ ngón",
    price: 199000,
    originalPrice: 299000,
    image: "/products/dep-xo-ngon.jpg",
    category: "sandals",
    isNew: false,
    isSale: true,
  },
  {
    id: 11,
    name: "Thắt lưng da",
    price: 299000,
    originalPrice: 299000,
    image: "/products/that-lung.jpg",
    category: "belts",
    isNew: false,
    isSale: false,
  },
  {
    id: 12,
    name: "Váy công sở",
    price: 699000,
    originalPrice: 899000,
    image: "/products/vay-cong-so.jpg",
    category: "dresses",
    isNew: true,
    isSale: true,
  },
];

interface FilterTag {
  id: string;
  categoryId: string;
  name: string;
}

export default function ShopPage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [selectedFilters, setSelectedFilters] = useState<FilterTag[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleFilter = (categoryId: string, subCategory: { id: string; name: string }) => {
    const existingFilter = selectedFilters.find(filter => filter.id === subCategory.id);
    
    if (existingFilter) {
      // Nếu filter đã tồn tại, xóa nó đi
      setSelectedFilters(prev => prev.filter(filter => filter.id !== subCategory.id));
    } else {
      // Nếu filter chưa tồn tại, thêm mới
      const newFilter = {
        id: subCategory.id,
        categoryId,
        name: subCategory.name,
      };
      setSelectedFilters(prev => [...prev, newFilter]);
    }
  };

  const removeFilter = (filterId: string) => {
    setSelectedFilters(prev => prev.filter(filter => filter.id !== filterId));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  // Kiểm tra xem category có subcategory nào được chọn không
  const isCategorySelected = (categoryId: string) => {
    return selectedFilters.some(filter => filter.categoryId === categoryId);
  };

  // Định dạng giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Tính phần trăm giảm giá
  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background py-4 sm:py-6">
        <div className="container max-w-5xl mx-auto px-6 sm:px-6">
          {/* Selected filters - sticky */}
          {selectedFilters.length > 0 && (
            <div className="sticky top-0 z-40 bg-background py-2 -mx-3 sm:-mx-4 px-3 sm:px-4 mb-4 sm:mb-6 border-b">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2">
                  <div className="flex items-center gap-2 flex-nowrap sm:flex-wrap">
                    {selectedFilters.map((filter) => (
                      <div
                        key={filter.id}
                        className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm shrink-0"
                      >
                        <span>{filter.name}</span>
                        <button
                          onClick={() => removeFilter(filter.id)}
                          className="hover:text-primary/80 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-muted-foreground hover:text-primary text-sm shrink-0"
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Mobile filter button */}
            <Button
              variant="outline"
              className="sm:hidden w-full mb-2 bg-background hover:bg-accent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </Button>

            {/* Sort for mobile */}
            <div className="flex flex-col gap-3 sm:hidden mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sắp xếp:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="flex-1 bg-background cursor-pointer">
                    <SelectValue placeholder="Mặc định" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default" className="cursor-pointer">Mặc định</SelectItem>
                    <SelectItem value="price-asc" className="cursor-pointer">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price-desc" className="cursor-pointer">Giá: Cao đến thấp</SelectItem>
                    <SelectItem value="newest" className="cursor-pointer">Mới nhất</SelectItem>
                    <SelectItem value="popular" className="cursor-pointer">Phổ biến nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filters sidebar */}
            <div
              className={`
                w-full sm:w-64
                ${showFilters ? "fixed inset-0 z-50 bg-background p-4 overflow-y-auto" : "hidden"}
                sm:relative sm:block sm:p-0
              `}
            >
              {showFilters && (
                <div className="flex items-center justify-between sm:hidden mb-4 border-b pb-4">
                  <h2 className="text-lg font-semibold text-foreground">Bộ lọc</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                    className="hover:bg-accent"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}

              {/* Categories */}
              <div className="space-y-4">
  <h3 className="font-semibold mb-3 text-foreground text-lg">Danh mục sản phẩm</h3>
  {categories.map((category) => (
    <div key={category.id}>
      <button
        onClick={() => toggleCategory(category.id)}
        className={`w-full flex items-center justify-between px-2 py-3 text-base rounded-md transition-colors cursor-pointer ${
          isCategorySelected(category.id)
            ? "bg-accent text-accent-foreground font-medium"
            : "hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        <span>{category.name}</span>
        <ChevronDown 
          className={`h-5 w-5 transition-transform ${
            expandedCategories.includes(category.id) ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {expandedCategories.includes(category.id) && (
        <div className="ml-4 space-y-1 mt-1">
          {category.subCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => toggleFilter(category.id, sub)}
              className={`w-full text-left px-2 py-2 text-base rounded-md transition-colors cursor-pointer ${
                selectedFilters.some(filter => filter.id === sub.id)
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-accent-foreground hover:bg-accent"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </div>
  ))}
</div>

            </div>

            {/* Products grid */}
            <div className="flex-1">
              {/* Desktop sort */}
              <div className="hidden sm:flex items-center justify-end mb-6">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Sắp xếp:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="min-w-[180px] cursor-pointer">
                      <SelectValue placeholder="Mặc định" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default" className="cursor-pointer">Mặc định</SelectItem>
                      <SelectItem value="price-asc" className="cursor-pointer">Giá: Thấp đến cao</SelectItem>
                      <SelectItem value="price-desc" className="cursor-pointer">Giá: Cao đến thấp</SelectItem>
                      <SelectItem value="newest" className="cursor-pointer">Mới nhất</SelectItem>
                      <SelectItem value="popular" className="cursor-pointer">Phổ biến nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-background rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Link href={`/product/${product.id}`} className="cursor-pointer">
                      <div className="aspect-square relative bg-muted">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover object-center"
                        />
                        <div className="absolute top-2 left-2 flex gap-2">
                          {product.price < product.originalPrice && (
                            <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full min-w-[4rem] text-center">
                              -{calculateDiscount(product.originalPrice, product.price)}%
                            </div>
                          )}
                          {product.isNew && (
                            <div className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full min-w-[4rem] text-center">
                              Mới
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-1 hover:text-primary transition-colors text-foreground">
                          {product.name}
                        </h3>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-baseline gap-2">
                            {product.price < product.originalPrice ? (
                              <>
                                <span className="text-sm sm:text-base font-semibold text-red-600 dark:text-red-400">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              </>
                            ) : (
                              <span className="text-sm sm:text-base font-semibold text-foreground">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          {product.price < product.originalPrice && (
                            <span className="text-xs text-red-600 dark:text-red-400">
                              Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                    
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer bg-background border-2 border-black dark:border-white/40 hover:bg-accent hover:scale-110 z-10"
                      >
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer bg-background border-2 border-black dark:border-white/40 hover:bg-accent hover:scale-110 z-10"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-1 sm:gap-2">
                <Button 
                  variant="outline" 
                  disabled 
                  className="h-8 sm:h-9 px-2 sm:px-4 cursor-pointer bg-background border border-border hover:bg-accent text-muted-foreground"
                >
                  Trước
                </Button>
                {[1, 2, 3, 4].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    className={`w-8 h-8 sm:w-9 sm:h-9 p-0 cursor-pointer ${
                      page === 1 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "bg-background border border-border hover:bg-accent text-foreground"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  className="h-8 sm:h-9 px-2 sm:px-4 cursor-pointer bg-background border border-border hover:bg-accent text-foreground"
                >
                  Sau
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 