"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, List } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        </div>

      </div>

      {/* Main content with sidebar */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 border-r">
          <div className="p-2 space-y-1">
            <Link href="/admin/products/list" className="w-full">
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start",
                  pathname === "/admin/products/list" && "bg-muted"
                )}
              >
                <List className="mr-2 h-4 w-4" />
                Danh sách sản phẩm
              </Button>
            </Link>
            <Link href="/admin/products/add" className="w-full">
              <Button 
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === "/admin/products/add" && "bg-muted"
                )}
              >
                <Plus className="mr-2 h-4 w-4" />
                Thêm sản phẩm mới
              </Button>
            </Link>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 