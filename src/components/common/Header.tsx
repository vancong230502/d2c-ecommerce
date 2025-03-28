"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Image from "next/image";
import {
  ShoppingCart,
  Search,
  X,
  Menu,
  Trash2,
  ChevronDown,
  User,
  LogIn,
  UserPlus,
  Gift,
  Bell,
  LogOut,
  Ticket,
  Settings,
  CircleUser,
  Sun,
  Moon,
  Palette,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Áo thun basic",
      price: 250000,
      quantity: 2,
      selected: false,
      image: "/products/tshirt.jpg",
    },
    {
      id: 2,
      name: "Quần jeans slim",
      price: 450000,
      quantity: 1,
      selected: false,
      image: "/products/jeans.jpg",
    },
    {
      id: 3,
      name: "Giày sneaker",
      price: 850000,
      quantity: 1,
      selected: false,
      image: "/products/sneaker.jpg",
    },
    {
      id: 4,
      name: "Áo thun basic",
      price: 250000,
      quantity: 2,
      selected: false,
      image: "/products/tshirt.jpg",
    },
    {
      id: 5,
      name: "Quần jeans slim",
      price: 450000,
      quantity: 1,
      selected: false,
      image: "/products/jeans.jpg",
    },
    {
      id: 6,
      name: "Giày sneaker",
      price: 850000,
      quantity: 1,
      selected: false,
      image: "/products/sneaker.jpg",
    },
  ]);

  const total = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSelectItem = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  useEffect(() => {
    setIsMounted(true);

    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    {
      href: "/shop",
      label: "Cửa hàng",
    },
    {
      href: "/forum",
      label: "Diễn đàn",
    },
    {
      href: "/donate",
      label: "Ủng hộ",
    },
    {
      href: "/game",
      label: "Trò chơi",
    },
  ];

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  const isHome = pathname === "/";

  const [startY, setStartY] = useState(0);
  const [isDraggingY, setIsDraggingY] = useState(false);
  const cartListRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartY(e.clientY);
    setIsDraggingY(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingY || !cartListRef.current) return;

    const currentY = e.clientY;
    const diff = currentY - startY;
    const container = cartListRef.current;

    // Tính toán vị trí scroll mới
    const newScrollTop = container.scrollTop - diff;

    // Giới hạn scroll trong phạm vi hợp lệ
    if (
      newScrollTop >= 0 &&
      newScrollTop <= container.scrollHeight - container.clientHeight
    ) {
      container.scrollTop = newScrollTop;
      setStartY(currentY);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingY(false);
  };

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const renderUserMenuItems = () => {
    return isLoggedIn ? (
      <>
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <CircleUser className="w-8 h-8 text-primary stroke-[1.5px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Tên người dùng</span>
              <span className="text-sm text-muted-foreground">
                email@example.com
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="py-1">
        <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="cursor-pointer flex items-center justify-between h-9"
            >
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Thông tin cá nhân</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/points"
              className="cursor-pointer flex items-center justify-between h-9"
            >
              <div className="flex items-center">
                <Gift className="w-4 h-4 mr-2" />
                <span>Tích điểm</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/vouchers"
              className="cursor-pointer flex items-center justify-between h-9"
            >
              <div className="flex items-center">
                <Ticket className="w-4 h-4 mr-2" />
                <span>Voucher</span>
              </div>
              <span className="bg-red-500 dark:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/notifications"
              className="cursor-pointer flex items-center justify-between h-9"
            >
              <div className="flex items-center">
                <Bell className="w-4 h-4 mr-2 text-gray-700 dark:text-gray-200" />
                <span className="text-gray-900 dark:text-gray-100">
                  Thông báo
                </span>
              </div>
              <span className="bg-red-500 dark:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="cursor-pointer flex items-center justify-between h-9"
            >
              <div className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                <span>Cài đặt</span>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="py-1">
        <DropdownMenuItem asChild>
            <Link
              href="/logout"
              className="cursor-pointer flex items-center justify-between h-9"
            >
              <div className="flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                <span>Đăng xuất</span>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>
      </>
    ) : (
      <div className="grid gap-2 p-4">
        <Link href="#">
          <Button
            variant="outline"
            className="w-full justify-center h-10 text-base font-medium cursor-pointer"
            onClick={handleLogin}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Đăng nhập
          </Button>
        </Link>
        <Link href="/register">
          <Button
            variant="default"
            className="w-full justify-center h-10 text-base font-medium cursor-pointer"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Đăng ký
          </Button>
        </Link>
      </div>
    );
  };

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-2xl font-bold hover:text-primary cursor-pointer"
            >
              Veslg
            </Link>
            <div className="flex items-center gap-4 ml-auto">
              <button className="relative p-2 hover:bg-accent rounded-full cursor-pointer">
                <ShoppingCart className="w-6 h-6 stroke-[1.5px]" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button className="sm:hidden p-2 hover:bg-accent rounded-full cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex gap-2">
                <Link href="/login">
                  <Button variant="outline" className="cursor-pointer">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" className="cursor-pointer">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-background/95 dark:backdrop-blur dark:supports-[backdrop-filter]:dark:bg-background/60">
      <div className="container max-w-5xl mx-auto px-4 py-4">
        {/* Main Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-bold cursor-pointer group"
            >
              <div className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-primary">
                <Image
                  src="/avatar/girl.png"
                  alt="Veslg Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="/avatar/girl-blur.png"
                />
              </div>
              <span
                className={`text-foreground hover:text-primary transition-colors ${
                  isHome ? "border-b-2 border-primary" : ""
                }`}
              >
                Veslg
              </span>
            </Link>
          </div>
          <nav className="hidden sm:flex gap-6 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isActiveLink(link.href)
                    ? "text-primary font-semibold border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary dark:text-slate-400 dark:hover:text-slate-200"
                } cursor-pointer transition-colors duration-200`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden sm:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-12 pr-4 py-2.5 rounded-full bg-background dark:bg-slate-800 border-border"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <button className="relative w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-accent rounded-full cursor-pointer transition-colors">
                  <ShoppingCart className="w-7 h-7 sm:w-5 sm:w-5 stroke-[1.5px]" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-medium min-w-[20px] h-5 flex items-center justify-center rounded-full shadow-sm">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] bg-card border-l border-border flex flex-col">
                <SheetHeader className="pb-6 border-b border-border">
                  <SheetTitle className="text-xl font-bold text-foreground">
                    Giỏ hàng của bạn
                  </SheetTitle>
                  <SheetDescription className="text-muted-foreground">
                    {cartItems.length === 0
                      ? "Chưa có sản phẩm nào"
                      : `${cartItems.length} sản phẩm trong giỏ hàng`}
                  </SheetDescription>
                </SheetHeader>
                <div
                  ref={cartListRef}
                  className="flex-1 overflow-y-auto px-4 py-6 cursor-grab active:cursor-grabbing"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                      <p className="text-muted-foreground">
                        Giỏ hàng của bạn đang trống
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors cursor-pointer group"
                          draggable={false}
                        >
                          <div className="relative w-16 h-16 rounded-md overflow-hidden border border-border">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-sm text-muted-foreground">
                                {item.price.toLocaleString()}đ
                              </p>
                              <span className="text-sm text-muted-foreground">
                                x
                              </span>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-primary mt-1">
                              {(item.price * item.quantity).toLocaleString()}đ
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                            onClick={() => handleSelectItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {cartItems.length > 0 && (
                  <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-4 mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-foreground">Tổng tiền:</span>
                      <span className="text-lg font-bold text-primary">
                        {total.toLocaleString()}đ
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Link href="/cart" className="flex-1">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full border-border hover:bg-accent cursor-pointer text-base"
                        >
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Xem giỏ hàng
                        </Button>
                      </Link>
                      <Link href="/checkout" className="flex-1">
                        <Button
                          size="lg"
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer text-base"
                        >
                          Thanh toán
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
            <button
              className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-accent rounded-full cursor-pointer transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const html = document.documentElement;
                const currentTheme = html.classList.contains("dark")
                  ? "light"
                  : "dark";
                html.classList.remove("light", "dark");
                html.classList.add(currentTheme);
              }}
            >
              <div className="relative">
                <Sun className="h-7 h-7 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon
                  className="absolute h-7 w-7 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                  style={{
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                  }}
                />
              </div>
            </button>
            <div className="hidden sm:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-accent rounded-full p-1.5 transition-colors">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <CircleUser className="w-7 h-7 text-primary stroke-[1.5px]" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground stroke-[1.5px]" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {renderUserMenuItems()}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button className="sm:hidden w-11 h-11 p-0 hover:bg-accent">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] p-0"
                showCloseButton={false}
              >
                <SheetHeader className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {/* Có thể thêm tiêu đề hoặc để trống */}
                    </div>
                    <div className="flex items-center gap-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="flex items-center cursor-pointer hover:bg-accent rounded-full p-1.5 transition-colors">
                            <div className="w-11 h-11 flex items-center justify-center border border-border rounded-full">
                              <CircleUser className="w-7 h-7 text-primary stroke-[1.5px]" />
                            </div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          {renderUserMenuItems()}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-accent rounded-full border border-border w-11 h-11 flex items-center justify-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <X className="w-7 h-7" />
                      </Button>
                    </div>
                  </div>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <div className="p-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Tìm kiếm sản phẩm..."
                        className="pl-12 pr-4 py-2.5 rounded-full w-full"
                      />
                    </div>

                    <nav className="space-y-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleNavigation}
                          className={`block p-3 rounded-lg transition-colors ${
                            isActiveLink(link.href)
                              ? "bg-accent text-primary font-semibold"
                              : "hover:bg-accent text-muted-foreground hover:text-primary"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="mt-auto p-4 border-t border-border">
                    <button
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const html = document.documentElement;
                        const currentTheme = html.classList.contains("dark")
                          ? "light"
                          : "dark";
                        html.classList.remove("light", "dark");
                        html.classList.add(currentTheme);
                      }}
                    >
                      <div className="relative w-6 h-6">
                        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon
                          className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                          style={{
                            transform: "translate(-50%, -50%)",
                            top: "50%",
                            left: "50%",
                          }}
                        />
                      </div>
                      <span className="text-foreground">
                        Chuyển đổi giao diện
                      </span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
