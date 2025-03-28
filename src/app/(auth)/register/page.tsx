"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Tạo tài khoản</CardTitle>
        <CardDescription className="text-center">
          Chọn phương thức đăng ký bên dưới
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" className="cursor-pointer transition-colors">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" className="cursor-pointer transition-colors">
            <Icons.facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Hoặc đăng ký với
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Họ và tên</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="Nguyễn Văn A"
            className="cursor-text"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com"
            autoComplete="email"
            className="cursor-text"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input 
            id="password" 
            type="password"
            autoComplete="new-password"
            className="cursor-text"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
          <Input 
            id="confirm-password" 
            type="password"
            autoComplete="new-password"
            className="cursor-text"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full cursor-pointer transition-colors cursor-pointer">Đăng ký</Button>
        <div className="text-center text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link 
            href="/login" 
            className="underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
          >
            Đăng nhập
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
