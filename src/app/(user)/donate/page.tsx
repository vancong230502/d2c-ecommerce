"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Heart, CreditCard, Wallet, Gift } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Ủng hộ MarketTrend</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Sự ủng hộ của bạn giúp chúng tôi duy trì và phát triển nền tảng tốt hơn
              </p>
            </div>

            {/* Quyền lợi người ủng hộ */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Gift className="w-6 h-6 text-blue-500" />
                  Quyền lợi người ủng hộ
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-700">Huy hiệu đặc biệt trên diễn đàn</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-700">Ưu tiên hỗ trợ kỹ thuật 24/7</span>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-700">Truy cập sớm tính năng mới</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-700">Không hiển thị quảng cáo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phương thức ủng hộ */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 hover:shadow-lg transition-shadow">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <CreditCard className="w-8 h-8 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-semibold">Chuyển khoản</h2>
                  </div>
                  <div className="space-y-4 text-lg">
                    <p className="text-gray-600">Ngân hàng: VietComBank</p>
                    <p className="text-gray-600">STK: 1234567890</p>
                    <p className="text-gray-600">Chủ TK: MARKETTREND JSC</p>
                  </div>
                  <Button className="w-full py-6 text-lg cursor-pointer hover:bg-gray-800">
                    <Heart className="w-6 h-6 mr-2" />
                    Sao chép STK
                  </Button>
                </div>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Wallet className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-semibold">Ví điện tử</h2>
                  </div>
                  <div className="space-y-4 text-lg">
                    <p className="text-gray-600">Momo: 0987654321</p>
                    <p className="text-gray-600">ZaloPay: 0987654321</p>
                    <p className="text-gray-600">VNPay: 0987654321</p>
                  </div>
                  <Button className="w-full py-6 text-lg cursor-pointer hover:bg-gray-800">
                    <Heart className="w-6 h-6 mr-2" />
                    Xem mã QR
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 