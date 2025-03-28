"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Eye, Ban } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    joinDate: "2024-01-01",
    orders: 5,
    totalSpent: 2500000,
    status: "Hoạt động",
    avatar: "/avatar/girl.png",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0901234568",
    joinDate: "2024-01-02",
    orders: 3,
    totalSpent: 1500000,
    status: "Hoạt động",
    avatar: "/avatar/girl.png",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0901234569",
    joinDate: "2024-01-03",
    orders: 0,
    totalSpent: 0,
    status: "Chưa đặt hàng",
    avatar: "/avatar/girl.png",
  },
];

const statusColors = {
  "Hoạt động": "bg-green-100 text-green-800",
  "Chưa đặt hàng": "bg-yellow-100 text-yellow-800",
  "Bị khóa": "bg-red-100 text-red-800",
} as const;

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead>Tên khách hàng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead className="text-center">Số đơn hàng</TableHead>
              <TableHead className="text-right">Tổng chi tiêu</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={customer.avatar}
                      alt={customer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.joinDate}</TableCell>
                <TableCell className="text-center">{customer.orders}</TableCell>
                <TableCell className="text-right">
                  {customer.totalSpent.toLocaleString()}đ
                </TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[customer.status as keyof typeof statusColors]
                  }`}>
                    {customer.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer hover:bg-accent"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive">
                        <Ban className="h-4 w-4 mr-2" />
                        Khóa tài khoản
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 