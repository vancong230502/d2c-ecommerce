import { FcGoogle } from "react-icons/fc";
import { AiOutlineArrowLeft } from "react-icons/ai"; // Import icon
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 bg-gray-100 px-4">
      {/* Nút quay về */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-900 transition"
      >
        <AiOutlineArrowLeft className="text-2xl" />
        <span className="ml-2 text-sm">Trang chủ</span>
      </Link>

      <Card className="w-full max-w-md shadow-lg rounded-xl relative">
        <CardContent className="p-6 space-y-5">
          {/* Tiêu đề với ảnh đại diện */}
          <div className="flex flex-col items-center space-y-1.5">
            <Image 
              src="/avatar/girl.png" 
              alt="User Avatar" 
              width={50} 
              height={50} 
              className="rounded-full shadow-lg ring-1 ring-gray-300 object-cover"
            />
            <p className="text-gray-600 text-base">Chào mừng bạn</p>
          </div>

          {/* Form đăng nhập */}
          <form className="space-y-3">
            <Input type="email" placeholder="Email" className="cursor-text h-10" />
            <Input type="password" placeholder="Mật khẩu" className="cursor-text h-10" />

            <div className="text-right text-xs">
              <Link href="/forgot-password" className="text-gray-600 hover:text-gray-900 cursor-pointer transition">
                Quên mật khẩu?
              </Link>
            </div>

            <Button className="w-full h-10 text-base font-medium cursor-pointer transition hover:bg-gray-900">
              Đăng nhập
            </Button>
          </form>

          {/* Hoặc */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">Hoặc</span>
            </div>
          </div>

          {/* Đăng nhập bằng Google */}
          <Button 
            variant="outline" 
            className="w-full h-10 flex items-center justify-center text-base font-medium cursor-pointer border-gray-300 hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-lg mr-2" />
            Đăng nhập bằng Google
          </Button>

          {/* Chuyển qua đăng ký */}
          <div className="text-center text-xs text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Đăng ký ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
