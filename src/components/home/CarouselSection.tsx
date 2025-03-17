"use client";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function CarouselSection() {
  const slides = [
    {
      image: "/images/default.png",
      title: "Khuyến mãi lớn mùa hè",
      subtitle: "Giảm giá lên đến 50%",
    },
    {
      image: "/images/default.png",
      title: "Sản phẩm mới ra mắt",
      subtitle: "Khám phá bộ sưu tập mới",
    },
    {
      image: "/images/default.png",
      title: "Giao hàng miễn phí",
      subtitle: "Đơn hàng từ $50 trở lên",
    },
    {
      image: "/images/default.png",
      title: "Mua sắm dễ dàng",
      subtitle: "Thanh toán linh hoạt, an toàn",
    },
    {
      image: "/images/default.png",
      title: "Ưu đãi khách hàng mới",
      subtitle: "Giảm ngay 20% cho đơn đầu tiên",
    },
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

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - clientX;
    
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
      } else {
        setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
      }
    }
    
    setIsDragging(false);
    setIsPaused(false);
  };

  return (
    <div className="bg-background">
      <div className="w-full max-w-5xl mx-auto px-0 sm:px-4 py-3 sm:py-5 relative overflow-hidden">
        {/* Carousel */}
        <div className="relative flex w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Card className="bg-transparent border-none shadow-none">
                  <CardContent className="relative group flex flex-col items-center justify-center p-0 sm:px-4 sm:p-4 h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
                    {/* Container chứa viền & gradient */}
                    <div 
                      className="absolute inset-0 w-full h-full flex items-center justify-center rounded-lg overflow-hidden border-1 border-gray"
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-black/10 z-10" />

                      {/* Next.js Image component */}
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1100px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>

                    {/* Text content */}
                    <div className="relative z-20 text-center w-full">
                      <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-md tracking-tight text-white">
                          {slide.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-100 font-medium max-w-md mx-auto">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Full overlay for swipe events */}
                    <div 
                      className="absolute inset-0 w-full h-full z-30 cursor-grab active:cursor-grabbing"
                      onTouchStart={handleStart}
                      onTouchEnd={handleEnd}
                      onMouseDown={handleStart}
                      onMouseUp={handleEnd}
                      onMouseLeave={handleEnd}
                    />
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
    </div>
  );
}
