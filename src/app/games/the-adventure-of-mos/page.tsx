import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  Gamepad2,
  Users,
  Trophy,
  Star,
  Clock,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Gamepad2,
    title: "Gameplay độc đáo",
    description:
      "Hóa thân thành mosquito và xây dựng đế chế của riêng bạn với cơ chế chơi mới lạ và thú vị.",
  },
  {
    icon: Users,
    title: "Cộng đồng sôi động",
    description:
      "Tham gia vào cộng đồng game thủ đông đảo, chia sẻ kinh nghiệm và kết bạn.",
  },
  {
    icon: Trophy,
    title: "Hệ thống thành tích",
    description: "Chinh phục các thử thách và nhận phần thưởng hấp dẫn.",
  },
];

const gameInfo = [
  {
    icon: Star,
    label: "Đánh giá",
    value: "4.8/5",
  },
  {
    icon: Clock,
    label: "Thời gian chơi",
    value: "20-30 phút",
  },
  {
    icon: Globe,
    label: "Ngôn ngữ",
    value: "Tiếng Việt",
  },
];

export default function GameDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] bg-card">
          <div className="absolute inset-0 flex items-center">
            <div className="container max-w-5xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-8 items-center bg-card/50 backdrop-blur-sm border border-border rounded-lg shadow-md p-4 md:p-8">
                <div className="space-y-6">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">The Adventure of Mos</h1>
                  <p className="text-base md:text-lg lg:text-xl text-foreground/90">Hành trình kì diệu của một chú muỗi</p>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {gameInfo.map((info) => (
                      <div key={info.label} className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-border hover:border-primary/50 transition-colors cursor-default">
                        <info.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        <span className="text-xs md:text-sm text-foreground">{info.label}: {info.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center sm:justify-start">
                    <Button size="lg" className="w-full sm:w-auto bg-transparent hover:bg-primary/10 text-foreground border border-foreground hover:border-primary cursor-pointer">
                      <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Tải game ngay
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-border bg-background">
                    <Image
                      src="/images/default.png"
                      alt="Game Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8 md:py-16">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg shadow-md p-4 md:p-8">
              {features.map((feature) => (
                <Card key={feature.title} className="p-4 md:p-6 border-border hover:border-primary/50 transition-colors bg-card cursor-pointer">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Game Description */}
        <section className="py-8 md:py-16 bg-card">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center bg-card/50 backdrop-blur-sm border border-border rounded-lg shadow-md p-4 md:p-8">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Về game</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Trong The Adventure of Mos, bạn sẽ hóa thân thành một chú muỗi và bắt đầu hành trình xây dựng đế chế của riêng mình. 
                  Khám phá thế giới rộng lớn, gặp gỡ các nhân vật thú vị và phát triển kỹ năng của bạn.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-border bg-card cursor-pointer hover:border-primary/50 transition-colors">
                <Image
                  src="/images/default.png"
                  alt="Game Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 md:mt-16 text-center space-y-4 md:space-y-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg shadow-md p-4 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Sẵn sàng bắt đầu?</h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Tải game ngay hôm nay và tham gia vào cuộc phiêu lưu kỳ thú!
              </p>
              <Button size="lg" className="bg-transparent hover:bg-primary/10 text-foreground border border-foreground hover:border-primary cursor-pointer">
                <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Tải game miễn phí
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
