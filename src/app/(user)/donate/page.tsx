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
        <div className="container max-w-5xl mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12 px-2">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-foreground">Ủng hộ Veslg</h1>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Sự ủng hộ của bạn giúp chúng tôi duy trì và phát triển nền tảng tốt hơn
              </p>
            </div>

            {/* Quyền lợi người ủng hộ */}
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                <Gift className="w-5 h-5 text-blue-500" />
                Quyền lợi người ủng hộ
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="text-sm text-foreground">Huy hiệu đặc biệt trên diễn đàn</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="text-sm text-foreground">Ưu tiên hỗ trợ kỹ thuật 24/7</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="text-sm text-foreground">Truy cập sớm tính năng mới</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="text-sm text-foreground">Không hiển thị quảng cáo</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Phương thức ủng hộ */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow bg-card">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                      <CreditCard className="w-6 h-6 text-blue-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Chuyển khoản</h2>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">Ngân hàng: VietComBank</p>
                    <p className="text-muted-foreground">STK: 1234567890</p>
                    <p className="text-muted-foreground">Chủ TK: Veslg JSC</p>
                  </div>
                  <Button variant="default" className="w-full py-4 text-sm cursor-pointer">
                    <Heart className="w-4 h-4 mr-2" />
                    Sao chép STK
                  </Button>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow bg-card">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 dark:bg-green-950/50 rounded-lg">
                      <Wallet className="w-6 h-6 text-green-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Ví điện tử</h2>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">Momo: 0987654321</p>
                    <p className="text-muted-foreground">ZaloPay: 0987654321</p>
                    <p className="text-muted-foreground">VNPay: 0987654321</p>
                  </div>
                  <Button variant="default" className="w-full py-4 text-sm cursor-pointer">
                    <Heart className="w-4 h-4 mr-2" />
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