"use client";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Áo thun basic",
      price: 250000,
      quantity: 2,
      selected: false,
      image: "/products/tshirt.jpg",
      size: "L",
      color: "Trắng"
    },
    {
      id: 2,
      name: "Quần jeans slim",
      price: 450000,
      quantity: 1,
      selected: false,
      image: "/products/jeans.jpg",
      size: "32",
      color: "Xanh đậm"
    },
  ]);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleSelectItem = (id: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const total = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const selectedCount = cartItems.filter(item => item.selected).length;

  return (
    <>
      <Header />
      <main className="min-h-screen py-8">
        <div className="container max-w-5xl mx-auto px-6">
          <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">Giỏ hàng của bạn đang trống</p>
              <Link href="/shop">
                <Button>Tiếp tục mua sắm</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Danh sách sản phẩm */}
              <div className="flex-1 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center h-24 pl-1">
                      
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={() => handleSelectItem(item.id)}
                        className="cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                    </div>
                    <div className="relative w-24 h-24 rounded-md overflow-hidden cursor-pointer">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium hover:text-primary cursor-pointer">{item.name}</h3>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <p>Màu: {item.color}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer hover:bg-accent"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center select-none">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer hover:bg-accent"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.price.toLocaleString()}đ</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tổng cộng */}
              <div className="lg:w-80">
                <div className="sticky top-4 p-4 rounded-lg border border-border bg-card">
                  <h3 className="font-medium mb-4">Tổng cộng</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Đã chọn {selectedCount} sản phẩm
                      </span>
                      <span>{total.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Phí vận chuyển</span>
                      <span>Miễn phí</span>
                    </div>
                  </div>
                  <div className="border-t border-border mt-4 pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Tổng thanh toán</span>
                      <span className="font-medium text-lg text-primary">
                        {total.toLocaleString()}đ
                      </span>
                    </div>
                    <Link href="/checkout">
                      <Button 
                        className="w-full cursor-pointer hover:opacity-90 transition-opacity" 
                        disabled={selectedCount === 0}
                      >
                        Thanh toán ({selectedCount})
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
