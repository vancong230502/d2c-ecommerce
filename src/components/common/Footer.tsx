import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-5xl mx-auto px-4 lg:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Cột 1 - Logo & Mô tả */}
        <div>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h3 className="text-2xl font-bold">MarketTrend</h3>
          </Link>
          <p className="text-base text-gray-400 mt-3 leading-relaxed">
            Nền tảng mua sắm hiện đại với hàng ngàn sản phẩm chất lượng.
          </p>
        </div>

        {/* Cột 2 - Chính sách */}
        <div>
          <h4 className="text-xl font-semibold">Chính sách</h4>
          <ul className="mt-4 space-y-3 text-base text-gray-400">
            <li>
              <Link href="/policy/return" className="hover:text-gray-200 transition-colors cursor-pointer">
                Chính sách đổi trả
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gray-200 transition-colors cursor-pointer">
                Điều khoản dịch vụ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-gray-200 transition-colors cursor-pointer">
                Chính sách bảo mật
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3 - Liên hệ */}
        <div>
          <h4 className="text-xl font-semibold">Liên hệ</h4>
          <ul className="mt-4 space-y-3 text-base text-gray-400">
            <li className="flex items-center">
              <span>📧</span>
              <a href="mailto:support@markettrend.com" className="ml-2 hover:text-gray-200 transition-colors cursor-pointer">
                support@markettrend.com
              </a>
            </li>
            <li className="flex items-center">
              <span>📞</span>
              <a href="tel:0123456789" className="ml-2 hover:text-gray-200 transition-colors cursor-pointer">
                0123-456-789
              </a>
            </li>
            <li>
              <p>Thời gian: 8:00 - 22:00</p>
            </li>
          </ul>
        </div>

        {/* Cột 4 - Mạng xã hội */}
        <div>
          <h4 className="text-xl font-semibold">Theo dõi chúng tôi</h4>
          <div className="flex space-x-5 mt-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              <Facebook className="w-7 h-7" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              <Instagram className="w-7 h-7" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              <Twitter className="w-7 h-7" />
            </a>
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
