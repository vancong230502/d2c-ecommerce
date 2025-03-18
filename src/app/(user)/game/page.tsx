"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Download, ExternalLink, Smartphone, Monitor, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const games = [
  {
    id: 1,
    title: "Minecraft",
    developer: "Mojang Studios",
    description: "Khám phá, xây dựng và sinh tồn trong thế giới khối vuông độc đáo",
    image: "/images/default.png",
    category: "Sandbox, Sinh tồn",
    rating: 4.8,
    size: "175MB",
    downloads: "1M+",
    price: "Free"
  },
  {
    id: 2,
    title: "Among Us",
    developer: "InnerSloth",
    description: "Game phối hợp nhiều người chơi, tìm ra kẻ mạo danh trong phi hành đoàn",
    image: "/images/default.png",
    category: "Multiplayer, Party",
    rating: 4.5,
    size: "120MB",
    downloads: "500K+",
    price: "Free"
  },
  // Thêm các game khác...
];

const ITEMS_PER_PAGE = 5;

export default function GamePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGames = games.slice(startIndex, endIndex);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Danh sách trò chơi</h1>
          
          <div className="space-y-4 sm:space-y-6">
            {currentGames.map((game) => (
              <div 
                key={game.id}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors group cursor-pointer"
              >
                {/* Game Image */}
                <Link href={`/game/${game.id}`} className="block w-full sm:w-40">
                  <div className="relative h-48 sm:h-40 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Game Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <Link href={`/game/${game.id}`}>
                        <h2 className="text-xl font-semibold hover:text-primary transition-colors cursor-pointer">
                          {game.title}
                        </h2>
                      </Link>
                      <p className="text-muted-foreground text-sm mt-1">
                        {game.developer}
                      </p>
                    </div>
                    <div className="flex gap-2 sm:flex-shrink-0">
                      <Link href={`/game/${game.id}`}>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="flex-1 sm:flex-initial min-w-[120px] h-10 cursor-pointer hover:scale-105 transition-transform"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Chi tiết
                        </Button>
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="default"
                            size="sm"
                            className="flex-1 sm:flex-initial min-w-[120px] h-10 cursor-pointer hover:scale-105 transition-transform"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Tải xuống
                            <ChevronDown className="w-4 h-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
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

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Thể loại</p>
                      <p className="font-medium mt-1 line-clamp-1">{game.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Kích thước</p>
                      <p className="font-medium mt-1">{game.size}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-muted-foreground">Lượt tải</p>
                      <p className="font-medium mt-1">{game.downloads}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-muted-foreground line-clamp-2 text-sm sm:text-base">
                    {game.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(game.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {game.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination className="mt-6 sm:mt-8">
            <PaginationContent>
              <PaginationItem className="hidden sm:block">
                <PaginationPrevious 
                  href="#"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem className="hidden sm:block">
                <PaginationNext 
                  href="#"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      <Footer />
    </>
  );
} 