"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold">Chính sách bảo mật</h1>
          <p className="mt-2 text-muted-foreground">Cập nhật lần cuối: 16/03/2024</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Thu thập thông tin</h2>
            <p>
              Chúng tôi thu thập thông tin khi bạn đăng ký trên website, đăng nhập, mua hàng, hoặc 
              điền các biểu mẫu. Thông tin thu thập bao gồm tên, email, số điện thoại, địa chỉ.
            </p>
            <p>
              Chúng tôi cũng tự động thu thập một số thông tin về thiết bị của bạn khi bạn truy cập 
              website, bao gồm thông tin về trình duyệt, địa chỉ IP, múi giờ và một số cookie.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">2. Sử dụng thông tin</h2>
            <p>Chúng tôi sử dụng thông tin thu thập được để:</p>
            <ul className="list-disc pl-6">
              <li>Xử lý đơn hàng và cung cấp dịch vụ khách hàng</li>
              <li>Gửi email về đơn hàng, cập nhật về sản phẩm mới</li>
              <li>Cải thiện website và trải nghiệm mua sắm</li>
              <li>Gửi thông tin tiếp thị nếu bạn đồng ý nhận</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">3. Bảo vệ thông tin</h2>
            <p>
              Chúng tôi thực hiện nhiều biện pháp bảo mật khác nhau để bảo vệ thông tin cá nhân của bạn. 
              Chúng tôi sử dụng mã hóa SSL tiên tiến để bảo vệ thông tin nhạy cảm được truyền trực tuyến.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">4. Cookie</h2>
            <p>
              Chúng tôi sử dụng cookie để ghi nhớ và theo dõi thông tin về trải nghiệm của bạn trên website. 
              Cookie giúp chúng tôi hiểu và lưu trữ tùy chọn của bạn cho lần truy cập tiếp theo.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">5. Chia sẻ thông tin</h2>
            <p>
              Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba. 
              Điều này không bao gồm các bên thứ ba đáng tin cậy giúp chúng tôi vận hành website hoặc 
              phục vụ bạn, miễn là họ đồng ý giữ bí mật thông tin này.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">6. Quyền của bạn</h2>
            <p>Bạn có quyền:</p>
            <ul className="list-disc pl-6">
              <li>Truy cập thông tin cá nhân của bạn</li>
              <li>Chỉnh sửa thông tin không chính xác</li>
              <li>Yêu cầu xóa thông tin</li>
              <li>Từ chối tiếp thị trực tiếp</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">7. Liên hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ:
            </p>
            <ul className="list-disc pl-6">
              <li>Email: privacy@markettrend.com</li>
              <li>Điện thoại: (84) 123-456-789</li>
              <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 