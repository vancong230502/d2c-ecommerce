"use client";

import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container relative mx-auto max-w-5xl py-6 px-4 md:px-6 lg:px-8 flex-1">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Điều khoản dịch vụ</h1>
            <p className="mt-2 text-muted-foreground">Cập nhật lần cuối: 16/03/2024</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Giới thiệu</h2>
              <p>
                Chào mừng bạn đến với GMarket. Bằng cách truy cập và sử dụng website của chúng tôi, 
                bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sau đây.
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">2. Điều kiện sử dụng</h2>
              <p>
                Bằng việc sử dụng dịch vụ của chúng tôi, bạn đảm bảo rằng bạn đủ 18 tuổi hoặc lớn hơn. 
                Bạn không được phép sử dụng dịch vụ của chúng tôi cho bất kỳ mục đích bất hợp pháp hoặc 
                trái phép nào.
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">3. Tài khoản người dùng</h2>
              <p>
                Khi tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật 
                tại mọi thời điểm. Thông tin không chính xác, không đầy đủ hoặc lỗi thời có thể dẫn đến việc 
                chấm dứt ngay lập tức tài khoản của bạn trên dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">4. Quyền sở hữu trí tuệ</h2>
              <p>
                Dịch vụ và nội dung của nó (không bao gồm nội dung do người dùng cung cấp) là tài sản của 
                GMarket và được bảo vệ bởi luật bản quyền quốc tế.
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">5. Giới hạn trách nhiệm</h2>
              <p>
                Trong mọi trường hợp, GMarket sẽ không chịu trách nhiệm về bất kỳ thiệt hại nào 
                (bao gồm, nhưng không giới hạn ở, thiệt hại về lợi nhuận kinh doanh, gián đoạn kinh doanh) 
                phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">6. Thay đổi điều khoản</h2>
              <p>
                Chúng tôi có quyền sửa đổi các điều khoản này vào bất kỳ lúc nào. Bằng cách tiếp tục 
                sử dụng dịch vụ của chúng tôi sau khi những thay đổi có hiệu lực, bạn đồng ý bị ràng buộc 
                bởi các điều khoản đã được sửa đổi.
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">7. Liên hệ</h2>
              <p>
                Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản Dịch vụ này, vui lòng liên hệ với chúng tôi:
              </p>
              <ul className="list-disc pl-6">
                <li>Email: support@GMarket.com</li>
                <li>Điện thoại: (84) 123-456-789</li>
                <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 