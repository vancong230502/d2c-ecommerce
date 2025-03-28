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
import { Search, Eye } from "lucide-react";
import { useState } from "react";

const orders = [
  {
    id: "#ORD001",
    customer: "Nguyễn Văn A",
    date: "2024-01-15",
    total: 1250000,
    status: "Đã giao",
    payment: "COD",
  },
  {
    id: "#ORD002", 
    customer: "Trần Thị B",
    date: "2024-01-14",
    total: 850000,
    status: "Đang giao",
    payment: "Banking",
  },
  {
    id: "#ORD003",
    customer: "Lê Văn C",
    date: "2024-01-13",
    total: 450000,
    status: "Chờ xác nhận",
    payment: "Momo",
  },
];

const statusColors = {
  "Đã giao": "bg-green-100 text-green-800",
  "Đang giao": "bg-blue-100 text-blue-800",
  "Chờ xác nhận": "bg-yellow-100 text-yellow-800",
  "Đã hủy": "bg-red-100 text-red-800",
} as const;

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm đơn hàng..."
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
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead>Thanh toán</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">
                  {order.total.toLocaleString()}đ
                </TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>{order.payment}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer hover:bg-accent"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 