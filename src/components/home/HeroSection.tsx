import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Giả sử bạn đã cài shadcn/ui và có hàm cn để kết hợp class

export function HeroSection() {
  return (
    <section className="relative h-[700px] overflow-hidden bg-gray-900">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Fashion Collection"
          className="h-full w-full object-cover object-center opacity-70 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container max-w-7xl px-6 text-white">
          <div className="max-w-lg space-y-8">
            {/* Heading */}
            <h1 className="font-serif text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              <span className="block text-white drop-shadow-md">New Autumn</span>
              <span className="block text-accent">Collection 2024</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-200 leading-relaxed md:text-xl">
              Discover an exquisite fusion of elegance and comfort in our premium curated fashion.
            </p>

            {/* Button */}
            <Button
              asChild
              className={cn(
                "h-12 px-8 text-lg font-medium uppercase tracking-wide",
                "bg-white text-gray-900 shadow-lg",
                "hover:bg-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
              )}
            >
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}