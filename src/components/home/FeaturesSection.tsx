import { MessageSquare, Gamepad2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Diễn đàn',
    description: 'Tham gia thảo luận, chia sẻ kinh nghiệm và kết nối với cộng đồng game thủ',
    icon: MessageSquare,
    href: '/forum',
  },
  {
    title: 'Game',
    description: 'Trải nghiệm các trò chơi hấp dẫn, cập nhật liên tục và đa dạng thể loại',
    icon: Gamepad2,
    href: '/games',
  },
  {
    title: 'Cửa hàng',
    description: 'Mua sắm các sản phẩm game, phụ kiện và merchandise chất lượng',
    icon: ShoppingBag,
    href: '/store',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-8 sm:py-12 bg-accent/10">
      <div className="container max-w-5xl mx-auto px-4 py-4">
        <div className="relative bg-gradient-to-br from-background to-accent/20 rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-50" />
          <div className="relative flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10">
              Chức năng chính
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 w-full">
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-lg bg-gradient-to-br from-background via-accent/5 to-accent/10 hover:from-background hover:via-accent/10 hover:to-accent/20 border border-gray-200 transition-colors duration-200 hover:shadow-sm will-change-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="relative z-10 flex flex-col items-center w-full">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                      <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary transition-transform duration-200 will-change-transform group-hover:scale-110" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                    <div className="flex items-center justify-center text-primary font-medium mb-2 sm:mb-3 group-hover:text-primary/80 transition-colors duration-200">
                      <span className="mr-1 sm:mr-2">Khám phá ngay</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-200" />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground/90">{feature.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
