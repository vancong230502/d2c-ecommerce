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
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Đặt lại mật khẩu</CardTitle>
        <CardDescription className="text-center">
          Nhập mật khẩu mới của bạn
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">Mật khẩu mới</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            className="cursor-text"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
          <Input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            className="cursor-text"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full cursor-pointer transition-colors">
          Cập nhật mật khẩu
        </Button>
        <div className="text-center text-sm">
          <Link
            href="/login"
            className="text-sm underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
} 