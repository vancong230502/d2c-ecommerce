import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-5xl mx-auto px-4 lg:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Cột 1 - Logo & Mô tả */}
        <div>
          <h3 className="text-2xl font-bold">MarketTrend</h3>
          <p className="text-base text-gray-400 mt-3 leading-relaxed">
            Nền tảng mua sắm hiện đại với hàng ngàn sản phẩm chất lượng.
          </p>
        </div>

        {/* Cột 2 - Chính sách */}
        <div>
          <h4 className="text-xl font-semibold">Chính sách</h4>
          <ul className="mt-4 space-y-3 text-base text-gray-400">
            <li>
              <Link href="/policy/return" className="hover:text-gray-200 transition">
                Chính sách hoàn trả
              </Link>
            </li>
            <li>
              <Link href="/policy/shipping" className="hover:text-gray-200 transition">
                Chính sách vận chuyển
              </Link>
            </li>
            <li>
              <Link href="/policy/privacy" className="hover:text-gray-200 transition">
                Chính sách bảo mật
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3 - Liên hệ */}
        <div>
          <h4 className="text-xl font-semibold">Liên hệ</h4>
          <p className="mt-4 text-base text-gray-400">📧 support@markettrend.com</p>
          <p className="text-base text-gray-400">📞 0123-456-789</p>
        </div>

        {/* Cột 4 - Mạng xã hội */}
        <div>
          <h4 className="text-xl font-semibold">Theo dõi chúng tôi</h4>
          <div className="flex space-x-5 mt-4">
            <Link href="https://facebook.com" className="text-gray-400 hover:text-gray-200 transition">
              <Facebook className="w-7 h-7" />
            </Link>
            <Link href="https://instagram.com" className="text-gray-400 hover:text-gray-200 transition">
              <Instagram className="w-7 h-7" />
            </Link>
            <Link href="https://twitter.com" className="text-gray-400 hover:text-gray-200 transition">
              <Twitter className="w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-10 border-t border-gray-700 pt-5 text-center text-base text-gray-400">
        © {new Date().getFullYear()} MarketTrend. All rights reserved.
      </div>
    </footer>
  );
}
