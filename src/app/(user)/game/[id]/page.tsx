"use client";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Smartphone,
  Monitor,
  ChevronDown,
  Star,
  Users,
  Cpu,
  HardDrive,
  Gamepad,
  ExternalLink,
} from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import Link from "next/link";

// Mock data - thay thế bằng API call sau
const gameDetail = {
  id: 1,
  title: "Minecraft",
  developer: "Mojang Studios",
  description: "Minecraft là một trò chơi sandbox cho phép người chơi xây dựng thế giới của riêng mình...",
  longDescription: `
    Minecraft là một trò chơi sandbox không giới hạn, nơi người chơi có thể xây dựng, khai thác, và phiêu lưu trong thế giới khối vuông độc đáo.
    
    Trong chế độ Sinh tồn, người chơi phải thu thập tài nguyên, chế tạo công cụ, và sinh tồn trước những hiểm nguy của quái vật.
    
    Với chế độ Sáng tạo, người chơi có quyền truy cập không giới hạn vào tất cả các khối và vật phẩm, cho phép xây dựng bất cứ thứ gì họ có thể tưởng tượng.
  `,
  images: [
    "/images/default.png",
    "/images/default.png",
    "/images/default.png",
  ],
  category: "Sandbox, Sinh tồn",
  rating: 4.8,
  size: "175MB",
  downloads: "1M+",
  price: "Free",
  releaseDate: "2011-11-18",
  
  // Hướng dẫn chơi
  tutorial: [
    {
      title: "Bắt đầu",
      content: "Khi mới vào game, bạn cần nhanh chóng tìm kiếm gỗ để làm công cụ cơ bản..."
    },
    {
      title: "Sinh tồn ban đêm",
      content: "Ban đêm là thời điểm nguy hiểm, bạn cần xây dựng nơi trú ẩn..."
    },
    {
      title: "Chế tạo vật phẩm",
      content: "Sử dụng bàn chế tạo để tạo ra công cụ, vũ khí và các vật phẩm khác..."
    }
  ],

  // Cấu hình đề nghị
  requirements: {
    minimum: {
      os: "Windows 10",
      processor: "Intel Core i3-3210 / AMD A8-7600",
      memory: "4GB RAM",
      graphics: "Intel HD Graphics 4000 / AMD Radeon R5",
      storage: "4GB",
    },
    recommended: {
      os: "Windows 10",
      processor: "Intel Core i5-4690 / AMD A10-7800",
      memory: "8GB RAM",
      graphics: "NVIDIA GeForce 700 Series / AMD Radeon Rx 200 Series",
      storage: "8GB",
    }
  },

  // Nhân vật
  characters: [
    {
      name: "Steve",
      role: "Nhân vật chính",
      description: "Nhân vật mặc định nam trong game",
      image: "/images/default.png"
    },
    {
      name: "Alex",
      role: "Nhân vật chính",
      description: "Nhân vật mặc định nữ trong game",
      image: "/images/default.png"
    },
    {
      name: "Creeper",
      role: "Kẻ địch",
      description: "Quái vật nổ tiếng trong Minecraft",
      image: "/images/default.png"
    }
  ]
};

export default function GameDetailPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-6 sm:py-8">
        {/* Hero Section */}
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Game Info */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold">{gameDetail.title}</h1>
              <p className="text-muted-foreground mt-2">{gameDetail.developer}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="ml-1 font-medium">{gameDetail.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="ml-1">{gameDetail.downloads} người chơi</span>
                </div>
              </div>

              <p className="mt-6 text-muted-foreground">{gameDetail.description}</p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-11 cursor-pointer hover:scale-105 transition-transform w-full sm:w-[160px]"
                >
                  <Gamepad className="w-5 h-5 mr-2" />
                  Chơi ngay
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="lg"
                      className="h-11 cursor-pointer hover:scale-105 transition-transform w-full sm:w-[160px]"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Tải xuống
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                      <Smartphone className="w-4 h-4 mr-2" />
                      <span>Android</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                      <Monitor className="w-4 h-4 mr-2" />
                      <span>Windows</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Right: Game Image */}
            <div className="lg:w-[400px]">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={gameDetail.images[0]}
                  alt={gameDetail.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="about" className="mt-8">
            <TabsList className="w-full justify-start h-12">
              <TabsTrigger value="about" className="cursor-pointer">Giới thiệu</TabsTrigger>
              <TabsTrigger value="tutorial" className="cursor-pointer">Hướng dẫn</TabsTrigger>
              <TabsTrigger value="requirements" className="cursor-pointer">Cấu hình</TabsTrigger>
              <TabsTrigger value="characters" className="cursor-pointer">Nhân vật</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gameDetail.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {gameDetail.longDescription.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tutorial" className="mt-6">
              <div className="space-y-8">
                {gameDetail.tutorial.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    <p className="text-muted-foreground">{section.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Cấu hình tối thiểu</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Monitor className="w-5 h-5 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Hệ điều hành</p>
                        <p className="text-muted-foreground">{gameDetail.requirements.minimum.os}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="w-5 h-5 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Bộ xử lý</p>
                        <p className="text-muted-foreground">{gameDetail.requirements.minimum.processor}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="w-5 h-5 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Bộ nhớ RAM</p>
                        <p className="text-muted-foreground">{gameDetail.requirements.minimum.memory}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Cấu hình đề nghị</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Monitor className="w-5 h-5 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Hệ điều hành</p>
                        <p className="text-muted-foreground">{gameDetail.requirements.recommended.os}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="w-5 h-5 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Bộ xử lý</p>
                        <p className="text-muted-foreground">{gameDetail.requirements.recommended.processor}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="w-5 h-5 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Bộ nhớ RAM</p>
                        <p className="text-muted-foreground">{gameDetail.requirements.recommended.memory}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="characters" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gameDetail.characters.map((character, index) => (
                  <div 
                    key={index}
                    className="rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                      <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-semibold">{character.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{character.role}</p>
                    <p className="text-sm mt-2">{character.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
} 