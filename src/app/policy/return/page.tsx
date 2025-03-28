"use client";

import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container relative mx-auto max-w-5xl py-6 px-4 md:px-6 lg:px-8 flex-1">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Chính sách đổi trả</h1>
            <p className="mt-2 text-muted-foreground">Cập nhật lần cuối: 16/03/2024</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Điều kiện đổi trả</h2>
              <p>
                Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng với các điều kiện sau:
              </p>
              <ul className="list-disc pl-6">
                <li>Sản phẩm còn nguyên tem, nhãn mác</li>
                <li>Sản phẩm chưa qua sử dụng hoặc giặt là</li>
                <li>Có đầy đủ hóa đơn, phiếu giao hàng</li>
                <li>Sản phẩm không thuộc danh mục không được đổi trả</li>
              </ul>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">2. Các trường hợp được đổi trả</h2>
              <ul className="list-disc pl-6">
                <li>Sản phẩm bị lỗi do nhà sản xuất</li>
                <li>Sản phẩm không đúng size, màu sắc như đã đặt</li>
                <li>Sản phẩm không đúng mẫu mã như hình ảnh</li>
                <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
              </ul>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">3. Quy trình đổi trả</h2>
              <ol className="list-decimal pl-6">
                <li>Liên hệ với bộ phận CSKH qua hotline hoặc email</li>
                <li>Cung cấp thông tin đơn hàng và lý do đổi trả</li>
                <li>Nhận mã đổi trả và hướng dẫn đóng gói</li>
                <li>Gửi sản phẩm về địa chỉ được cung cấp</li>
                <li>Nhận sản phẩm mới hoặc hoàn tiền trong vòng 7 ngày làm việc</li>
              </ol>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">4. Chi phí đổi trả</h2>
              <p>
                Trong trường hợp lỗi do nhà sản xuất hoặc vận chuyển, chúng tôi sẽ chịu toàn bộ chi phí đổi trả.
                Đối với các trường hợp khác, quý khách vui lòng chịu phí vận chuyển hai chiều.
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">5. Sản phẩm không được đổi trả</h2>
              <ul className="list-disc pl-6">
                <li>Sản phẩm đã qua sử dụng</li>
                <li>Sản phẩm giảm giá trên 50%</li>
                <li>Sản phẩm trong chương trình khuyến mãi đặc biệt</li>
                <li>Đồ lót, đồ bơi vì lý do vệ sinh</li>
              </ul>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold">6. Liên hệ hỗ trợ</h2>
              <p>
                Nếu bạn cần hỗ trợ thêm về chính sách đổi trả, vui lòng liên hệ:
              </p>
              <ul className="list-disc pl-6">
                <li>Hotline: (84) 123-456-789</li>
                <li>Email: support@Veslg.com</li>
                <li>Thời gian hỗ trợ: 8:00 - 22:00 các ngày trong tuần</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 