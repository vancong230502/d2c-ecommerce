"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function DonatePage() {
  return (
    <div className="container relative mx-auto max-w-3xl py-6 px-4 md:px-6 lg:px-8">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 hover:opacity-80 transition-opacity"
      >
        <Button variant="ghost" className="gap-2 cursor-pointer">
          <Icons.chevronLeft className="h-4 w-4" />
          Trang chủ
        </Button>
      </Link>

      <div className="mt-16 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Ủng hộ chúng tôi</h1>
          <p className="mt-2 text-muted-foreground">
            Hỗ trợ chúng tôi để phát triển nền tảng tốt hơn
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Tại sao nên ủng hộ?</h2>
            <p>
              MarketTrend là một nền tảng mua sắm phi lợi nhuận, được tạo ra với mục đích 
              mang lại trải nghiệm mua sắm tốt nhất cho người dùng. Sự ủng hộ của bạn sẽ giúp chúng tôi:
            </p>
            <ul className="list-disc pl-6">
              <li>Duy trì và nâng cấp hệ thống</li>
              <li>Phát triển thêm tính năng mới</li>
              <li>Cải thiện trải nghiệm người dùng</li>
              <li>Mở rộng cộng đồng người dùng</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Phương thức ủng hộ</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Chuyển khoản ngân hàng</h3>
                <ul className="space-y-2">
                  <li>Ngân hàng: Vietcombank</li>
                  <li>Số tài khoản: 1234567890</li>
                  <li>Chủ tài khoản: MARKETTREND</li>
                  <li>Nội dung: DONATE [Email]</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Ví điện tử</h3>
                <ul className="space-y-2">
                  <li>Momo: 0123456789</li>
                  <li>ZaloPay: 0123456789</li>
                  <li>VNPay: 0123456789</li>
                  <li>Nội dung: DONATE [Email]</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Đặc quyền người ủng hộ</h2>
            <ul className="list-disc pl-6">
              <li>Huy hiệu đặc biệt trên trang cá nhân</li>
              <li>Ưu tiên hỗ trợ kỹ thuật</li>
              <li>Truy cập sớm các tính năng mới</li>
              <li>Giảm giá đặc biệt cho các sản phẩm</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Minh bạch tài chính</h2>
            <p>
              Chúng tôi cam kết sử dụng 100% số tiền ủng hộ vào việc phát triển và duy trì nền tảng. 
              Báo cáo tài chính sẽ được công khai hàng tháng trên trang web của chúng tôi.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Liên hệ hỗ trợ</h2>
            <p>
              Nếu bạn cần hỗ trợ thêm về việc ủng hộ, vui lòng liên hệ:
            </p>
            <ul className="list-disc pl-6">
              <li>Email: donate@markettrend.com</li>
              <li>Hotline: (84) 123-456-789</li>
              <li>Thời gian hỗ trợ: 8:00 - 22:00 các ngày trong tuần</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 