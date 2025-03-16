"use client";  // Thêm dòng này vào đầu file

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  BarChart3,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Sản phẩm",
    href: "/products",
    icon: Package,
  },
  {
    title: "Đơn hàng",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Khách hàng",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Cài đặt",
    href: "/settings",
    icon: Settings,
  },
].map(item => ({
  ...item,
  href: `/admin${item.href}`
}));

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="pb-12 min-h-screen w-64 border-r">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Admin</h2>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  pathname === item.href
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 