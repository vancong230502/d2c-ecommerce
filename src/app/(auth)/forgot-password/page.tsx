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

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Quên mật khẩu</CardTitle>
        <CardDescription className="text-center">
          Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
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
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full cursor-pointer transition-colors">
          Gửi link đặt lại mật khẩu
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