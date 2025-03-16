// app/page.tsx
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ProductGrid } from '@/components/home/ProductGrid';
import { CarouselSection } from '@/components/home/CarouselSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CarouselSection />
      <main className="flex-1 bg-background py-4 sm:py-6">
        <div className="container max-w-5xl mx-auto px-3 sm:px-4">
          <ProductGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}