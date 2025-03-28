"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 hover:opacity-80 transition-opacity"
      >
        <Button variant="ghost" className="gap-2 cursor-pointer">
          <Icons.chevronLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link 
          href="/"
          className="relative z-20 flex items-center text-lg font-medium hover:opacity-80 transition-opacity cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Veslg
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Nền tảng thương mại điện tử tốt nhất cho doanh nghiệp của bạn.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
          <p className="px-8 text-center text-sm text-muted-foreground">
            Bằng cách nhấp vào tiếp tục, bạn đồng ý với{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
            >
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
            >
              Chính sách bảo mật
            </Link>{" "}
            của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}
