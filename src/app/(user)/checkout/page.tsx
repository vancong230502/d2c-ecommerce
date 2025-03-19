"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import Image from "next/image";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Áo thun basic",
      price: 250000,
      quantity: 2,
      image: "/products/tshirt.jpg",
      size: "L",
      color: "Trắng"
    },
    {
      id: 2,
      name: "Quần jeans slim",
      price: 450000,
      quantity: 1,
      image: "/products/jeans.jpg",
      size: "32",
      color: "Xanh đậm"
    },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Miễn phí vận chuyển
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <main className="min-h-screen py-8">
        <div className="container max-w-5xl mx-auto px-6">
          <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form thanh toán */}
            <div className="flex-1 space-y-6">
              {/* Thông tin giao hàng */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h2 className="text-lg font-medium mb-4">Thông tin giao hàng</h2>
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Họ và tên" 
                      className="cursor-text focus:outline-none" 
                    />
                    <Input 
                      placeholder="Số điện thoại" 
                      className="cursor-text focus:outline-none" 
                    />
                  </div>
                  <Input 
                    placeholder="Email" 
                    className="cursor-text focus:outline-none" 
                  />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Select>
                      <SelectTrigger className="w-full cursor-pointer hover:bg-accent">
                        <SelectValue placeholder="Tỉnh/Thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hn" className="cursor-pointer hover:bg-accent">Hà Nội</SelectItem>
                        <SelectItem value="hcm" className="cursor-pointer hover:bg-accent">TP. Hồ Chí Minh</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="w-full cursor-pointer hover:bg-accent">
                        <SelectValue placeholder="Quận/Huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q1" className="cursor-pointer hover:bg-accent">Quận 1</SelectItem>
                        <SelectItem value="q2" className="cursor-pointer hover:bg-accent">Quận 2</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="w-full cursor-pointer hover:bg-accent">
                        <SelectValue placeholder="Phường/Xã" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="p1" className="cursor-pointer hover:bg-accent">Phường 1</SelectItem>
                        <SelectItem value="p2" className="cursor-pointer hover:bg-accent">Phường 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input 
                    placeholder="Địa chỉ cụ thể" 
                    className="cursor-text focus:outline-none" 
                  />
                  <Input 
                    placeholder="Ghi chú (không bắt buộc)" 
                    className="cursor-text focus:outline-none" 
                  />
                </div>
              </div>

              {/* Phương thức thanh toán */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h2 className="text-lg font-medium mb-4">Phương thức thanh toán</h2>
                <RadioGroup defaultValue="cod">
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent rounded-lg p-2">
                    <RadioGroupItem value="cod" id="cod" className="cursor-pointer" />
                    <Label htmlFor="cod" className="cursor-pointer">Thanh toán khi nhận hàng (COD)</Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent rounded-lg p-2 mt-2">
                    <RadioGroupItem value="banking" id="banking" className="cursor-pointer" />
                    <Label htmlFor="banking" className="cursor-pointer">Chuyển khoản ngân hàng</Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-accent rounded-lg p-2 mt-2">
                    <RadioGroupItem value="momo" id="momo" className="cursor-pointer" />
                    <Label htmlFor="momo" className="cursor-pointer">Ví MoMo</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Tổng quan đơn hàng */}
            <div className="lg:w-80">
              <div className="sticky top-4 p-4 rounded-lg border border-border bg-card">
                <h3 className="font-medium mb-4">Đơn hàng của bạn</h3>
                
                {/* Danh sách sản phẩm */}
                <div className="space-y-4 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.size} / {item.color}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm">x{item.quantity}</span>
                          <span className="text-sm font-medium">
                            {(item.price * item.quantity).toLocaleString()}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tổng cộng */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span>{subtotal.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Tổng cộng</span>
                      <span className="font-medium text-lg text-primary">
                        {total.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    // Xử lý đặt hàng
                  }}
                >
                  Đặt hàng ({cartItems.length})
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
