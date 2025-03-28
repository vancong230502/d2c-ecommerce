"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart2,
  ShoppingBag,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  LogIn,
  LogOut,
  UserPlus,
  User,
  ChevronDown,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface Variant {
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

interface VariantEditDialogProps {
  variant: Variant;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedVariant: Variant) => void;
}

function VariantEditDialog({ variant, isOpen, onClose, onSave }: VariantEditDialogProps) {
  const [price, setPrice] = useState(variant.price);
  const [stock, setStock] = useState(variant.stock);

  const handleSave = () => {
    onSave({
      ...variant,
      price,
      stock,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Variant: {variant.sku}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const mainNav = [
  {
    title: "Tổng quan",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Thống kê",
    href: "/admin/analytics",
    icon: BarChart2,
  },
  {
    title: "Sản phẩm",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    title: "Đơn hàng",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Khách hàng",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Trang",
    href: "/admin/pages",
    icon: FileText,
  },
  {
    title: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoggedIn = true;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background h-16">
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="font-semibold text-lg">
              Admin Dashboard
            </div>
          </div>

          {/* User Account */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Admin User</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Thông tin cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Cài đặt tài khoản
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/admin/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/admin/register">
                <Button variant="default" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/10">
          <nav className="p-4 space-y-1">
            {mainNav.map((item) => {
              const isActive = 
                item.href === '/admin/dashboard' 
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              
              return (
                <Link key={item.href} href={item.href} className="block">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-muted font-medium"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
