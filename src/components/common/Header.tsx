"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Thêm state để kiểm tra mount

  // Khai báo kiểu dữ liệu cho useRef
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // Dữ liệu giả cho giỏ hàng
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Áo thun basic", price: 250000, quantity: 2, selected: false },
    { id: 2, name: "Quần jeans slim", price: 450000, quantity: 1, selected: false },
  ]);

  // Tính tổng tiền của các sản phẩm đã chọn
  const total = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Xử lý thay đổi checkbox
  const handleSelectItem = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Đóng menu hoặc giỏ hàng khi click bên ngoài
  useEffect(() => {
    setIsMounted(true); // Đánh dấu component đã mount

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

  // Nếu chưa mount, trả về null hoặc một phiên bản tĩnh để tránh lỗi hydration
  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 cursor-pointer">
              MarketTrend
            </Link>
            <div className="flex items-center gap-4 ml-auto">
              <button className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button className="sm:hidden p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex gap-2">
                <Link href="/login">
                  <Button variant="outline" className="text-gray-700 cursor-pointer">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-black text-white hover:bg-gray-800 cursor-pointer">
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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-4 py-3">
        {/* Main Header */}
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 cursor-pointer">
            MarketTrend
          </Link>
          <nav className="hidden sm:flex gap-4 ml-4">
            <Link href="/shop" className="text-gray-700 hover:text-gray-900 cursor-pointer">
              Shop
            </Link>
            <Link href="/forum" className="text-gray-700 hover:text-gray-900 cursor-pointer">
              Forum
            </Link>
            <Link href="/download" className="text-gray-700 hover:text-gray-900 cursor-pointer">
              Download
            </Link>
          </nav>
          <div className="hidden sm:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-12 pr-4 py-2 rounded-full border-gray-300"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              className="sm:hidden p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex gap-2">
              <Link href="/login">
                <Button variant="outline" className="text-gray-700 cursor-pointer">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-black text-white hover:bg-gray-800 cursor-pointer">
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="sm:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-12 pr-4 py-2 rounded-full border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Menu di động */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Menu</h3>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/shop" className="block p-2 hover:bg-gray-100 rounded cursor-pointer">
            Shop
          </Link>
          <Link href="/forum" className="block p-2 hover:bg-gray-100 rounded cursor-pointer">
            Forum
          </Link>
          <Link href="/download" className="block p-2 hover:bg-gray-100 rounded cursor-pointer">
            Download
          </Link>
          <Link href="/login" className="block p-2 hover:bg-gray-100 rounded cursor-pointer">
            Đăng nhập
          </Link>
          <Link href="/signup" className="block p-2 hover:bg-gray-100 rounded cursor-pointer">
            Đăng ký
          </Link>
        </nav>
      </div>

      {/* Giỏ hàng */}
      <div
        ref={cartRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Giỏ hàng</h3>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleSelectItem(item.id)}
                className="w-4 h-4 cursor-pointer"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.price.toLocaleString()}đ x {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-white">
          <p className="text-lg font-semibold">Tổng: {total.toLocaleString()}đ</p>
          <div className="flex gap-2 mt-4">
            <Link href="/cart">
              <Button variant="outline" className="w-full cursor-pointer">
                Xem chi tiết
              </Button>
            </Link>
            <Link href="/checkout">
              <Button className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer">
                Thanh toán
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}