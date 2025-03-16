"use client";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function CarouselSection() {
  const slides = [
    { image: "/images/default.png", title: "Khuyến mãi lớn mùa hè", subtitle: "Giảm giá lên đến 50%" },
    { image: "/images/default.png", title: "Sản phẩm mới ra mắt", subtitle: "Khám phá bộ sưu tập mới" },
    { image: "/images/default.png", title: "Giao hàng miễn phí", subtitle: "Đơn hàng từ $50 trở lên" },
    { image: "/images/default.png", title: "Mua sắm dễ dàng", subtitle: "Thanh toán linh hoạt, an toàn" },
    { image: "/images/default.png", title: "Ưu đãi khách hàng mới", subtitle: "Giảm ngay 20% cho đơn đầu tiên" },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [startX, setStartX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isPaused, isDragging]);

  const handleStart = (x: number) => {
    setStartX(x);
    setIsDragging(true);
  };

  const handleEnd = (x: number) => {
    const diff = startX - x;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
      } else {
        setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
      }
    }
    setIsDragging(false);
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto py-5 px-4 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel */}
      <div
        className="relative flex w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseUp={(e) => handleEnd(e.clientX)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="relative group flex flex-col items-center justify-center p-4 h-[300px] sm:h-[400px] rounded-2xl overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                  
                  {/* Next.js Image component */}
                  <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{
                        objectPosition: 'center center' // Thêm thuộc tính này
                      }}
                    />
                  </div>

                  {/* Text content */}
                  <div className="relative z-20 text-center text-white space-y-3 max-w-2xl px-4">
                    <h3 className="text-2xl font-bold drop-shadow-md sm:text-3xl lg:text-4xl">
                      {slide.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-200 sm:text-base lg:text-lg">
                      {slide.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-8 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeIndex 
                ? "bg-black scale-110 shadow-md" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          />
        ))}
      </div>
    </div>
  );
}