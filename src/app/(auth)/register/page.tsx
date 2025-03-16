import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AiOutlineArrowLeft } from "react-icons/ai"; // Import icon
import Image from "next/image";
import Link from "next/link";

export default function Register() {
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
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardContent className="p-6 space-y-2">
          {/* Tiêu đề với ảnh đại diện */}
          <div className="flex flex-col items-center space-y-2">
                <Image 
                    src="/avatar/girl.png" 
                    alt="User Avatar" 
                    width={50} 
                    height={50} 
                    className="rounded-full shadow-lg ring-1 ring-gray-300 object-cover"
                />
                <p className="text-gray-600 text-base p-1">Tạo tài khoản mới</p>
            </div>


          {/* Form đăng ký */}
          <form className="space-y-6">
            <Input type="text" placeholder="Họ và tên" className="cursor-text h-10" />
            <Input type="email" placeholder="Email" className="cursor-text h-10" />
            <Input type="password" placeholder="Mật khẩu" className="cursor-text h-10" />
            <Input type="password" placeholder="Xác nhận mật khẩu" className="cursor-text h-10" />

            <Button className="w-full h-10 text-base font-medium cursor-pointer transition hover:bg-gray-900 p-1">
              Đăng ký
            </Button>
          </form>


          {/* Chuyển qua đăng nhập */}
          <div className="text-center text-xs p-4 text-gray-600">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Đăng nhập ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
