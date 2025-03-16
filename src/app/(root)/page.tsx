// app/page.tsx
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ProductGrid } from '@/components/home/ProductGrid';
import { CarouselSection } from '@/components/home/CarouselSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <CarouselSection />
      <main className="container max-w-6xl mx-auto py-1 space-y-6">
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}