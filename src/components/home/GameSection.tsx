import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function GameSection() {
  return (
    <section className="py-12 md:py-16 bg-accent/10">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="relative bg-gradient-to-br from-background to-accent/20 rounded-2xl p-8 md:p-10 border border-gray-200 shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-50" />
          <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Hình ảnh game */}
            <div className="w-full lg:w-[45%]">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md group border border-gray-200">
                <Image
                  src="/images/game-preview.jpg"
                  alt="The Adventure of Mos - Game Preview"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Nội dung */}
            <div className="w-full lg:w-[55%] text-center lg:text-left">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Game của chúng tôi</h2>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">The Adventure of Mos</h3>
              <p className="text-sm md:text-base text-muted-foreground/90 mb-4 leading-relaxed">
                Hành trình kì diệu nói về mosquito, trong game bạn sẽ hóa thân thành mos để xây dựng một đế chế của riêng bạn.
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Xây dựng đế chế
                </div>
                <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Khám phá thế giới
                </div>
                <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Phát triển nhân vật
                </div>
              </div>
              <Link
                href="/games/the-adventure-of-mos"
                className="inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 text-sm md:text-base font-medium shadow-sm hover:shadow will-change-transform hover:-translate-y-0.5 group"
              >
                Tìm hiểu thêm
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-colors duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 