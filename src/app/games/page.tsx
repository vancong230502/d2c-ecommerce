import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const games = [
  {
    id: 'the-adventure-of-mos',
    title: 'The Adventure of Mos',
    description: 'Hành trình kì diệu nói về mosquito, trong game bạn sẽ hóa thân thành mos để xây dựng một đế chế của riêng bạn.',
    image: '/images/game-preview.jpg',
    features: ['Xây dựng đế chế', 'Khám phá thế giới', 'Phát triển nhân vật'],
  },
  // Thêm các game khác ở đây
];

export default function GamesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-16">Game của chúng tôi</h1>
          
          <div className="grid gap-12">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Hình ảnh game */}
                  <div className="relative w-full lg:w-1/2 aspect-video lg:aspect-auto">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="p-8 lg:p-12 flex-1">
                    <h2 className="text-4xl font-bold mb-4">{game.title}</h2>
                    <p className="text-xl text-muted-foreground mb-6">{game.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {game.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full text-base font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Nút tìm hiểu thêm */}
                    <Link
                      href={`/games/${game.id}`}
                      className="inline-flex items-center text-lg text-primary hover:text-primary/80 transition-colors group"
                    >
                      Tìm hiểu thêm
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 