"use client";
import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

export function ProductCarousel({ images }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Hàm xử lý zoom trong modal
  const handleZoom = () => {
    if (isZoomed) {
      setZoomLevel(1); // Thu nhỏ về mức bình thường
    } else {
      setZoomLevel(2); // Phóng to
    }
    setIsZoomed(!isZoomed);
  };

  // Hàm reset zoom
  const handleZoomReset = () => {
    setZoomLevel(1);
    setIsZoomed(false);
  };

  // Hàm mở modal với zoom minimum
  const openModal = () => {
    setIsModalOpen(true);
    setZoomLevel(1); // Ảnh bắt đầu ở trạng thái thu nhỏ
    setIsZoomed(false);
  };

  // Hàm cuộn đến chỉ số được chọn và cập nhật current
  const handleScrollTo = (index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrent(index);
    }
  };

  // Đồng bộ carousel với current
  React.useEffect(() => {
    if (api) {
      api.scrollTo(current);
    }
  }, [current, api]);

  // Reset zoom khi current thay đổi
  React.useEffect(() => {
    handleZoomReset();
  }, [current]);

  return (
    <div className="space-y-4">
      {/* Ảnh chính */}
      <div 
        className="relative aspect-square w-full overflow-hidden rounded-xl border cursor-zoom-in"
        onClick={openModal}
      >
        <Image
          src={images[current]}
          alt={`Main product view ${current + 1}`}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
        
        <div className="absolute bottom-2 right-2">
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleZoom();
            }}
            className="bg-white/90 backdrop-blur-sm hover:bg-white/80"
          >
            {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation cho mobile */}
      <div className="flex justify-center gap-2 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleScrollTo(current - 1)}
          disabled={current === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleScrollTo(current + 1)}
          disabled={current === images.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Carousel thumbnail */}
      <Carousel setApi={setApi} className="w-full max-w-sm mx-auto">
        <CarouselContent className="-ml-1">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/4 md:basis-1/5"
              onClick={() => handleScrollTo(index)}
            >
              <div className="p-1">
                <div
                  className={`relative aspect-square overflow-hidden rounded-md border-2 transition-colors duration-300 cursor-pointer ${
                    current === index 
                      ? "border-orange-500" 
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                    sizes="(max-width: 768px) 25vw, 10vw"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>

      {/* Zoom Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => {
            setIsModalOpen(false);
            handleZoomReset();
          }}
        >
          <div className="relative max-w-5xl w-full h-full">
            <Image
              src={images[current]}
              alt={`Zoomed product view ${current + 1}`}
              fill
              className="object-contain transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
              sizes="100vw"
            />
            
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom();
                }}
                className="bg-white/90 backdrop-blur-sm hover:bg-white/80"
              >
                {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                  handleZoomReset();
                }}
                className="bg-white/90 backdrop-blur-sm hover:bg-white/80"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}