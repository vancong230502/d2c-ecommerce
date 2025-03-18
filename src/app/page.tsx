// app/page.tsx
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CarouselSection } from '@/components/home/CarouselSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { GameSection } from '@/components/home/GameSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <FeaturesSection />
        <GameSection />
      </main>
      <Footer />
    </div>
  );
}