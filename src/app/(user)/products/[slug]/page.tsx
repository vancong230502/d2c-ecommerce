"use client";
import { useState, useMemo } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCarousel } from "@/components/products/ProductCarousel";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductTabs } from "@/components/products/ProductTabs";
import { ReviewSection } from "@/components/products/ReviewSection";

const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState("description");
    const [sortType, setSortType] = useState("newest");
    const [starFilter, setStarFilter] = useState<number | null>(null);
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [reviews, setReviews] = useState([
      { id: 1, user: "Minh Trí", comment: "Chất vải đẹp, mặc rất thích!", rating: 5, date: "2025-03-10" },
      { id: 2, user: "Bảo Ngọc", comment: "Giao hàng nhanh, đáng tiền.", rating: 4, date: "2025-03-12" },
    ]);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
  
    const product = {
      name: "Áo Hoodie Nam Nữ Form Rộng",
      price: "350.000đ",
      description: "Áo hoodie unisex form rộng, chất liệu cotton dày dặn, phù hợp cho mọi thời tiết.",
      images: [
        "/images/hoodie1.png",
        "/images/hoodie2.png",
        "/images/hoodie3.png",
        "/images/hoodie4.png",
        "/images/hoodie5.png",
        "/images/hoodie6.png",
        "/images/hoodie7.png",
        "/images/hoodie8.png",
        "/images/hoodie9.png",
        "/images/hoodie10.png"
      ],
      rating: 4.5,
      totalReviews: 12,
    };
    
  
    const filteredReviews = useMemo(() => {
      let result = reviews.filter(review => 
        starFilter ? review.rating === starFilter : true
      );
  
      switch (sortType) {
        case "newest": return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());      
        case "highest": return result.sort((a, b) => b.rating - a.rating);
        case "lowest": return result.sort((a, b) => a.rating - b.rating);
        default: return result;
      }
    }, [reviews, sortType, starFilter]);

  return (
    <>
      <Header />
      
      <div className="max-w-5xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <ProductCarousel images={product.images} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reviewCount={reviews.length}
      >
        {activeTab === "description" ? (
          <p className="text-gray-700 leading-relaxed text-justify">
            {product.description}
          </p>
        ) : (
          <ReviewSection
            reviews={filteredReviews}
            sortType={sortType}
            starFilter={starFilter}
            setSortType={setSortType}
            setStarFilter={setStarFilter}
          />
        )}
      </ProductTabs>

      <Footer />
    </>
  );
};

export default ProductDetail;