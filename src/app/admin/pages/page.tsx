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
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";

const pages = [
  {
    id: 1,
    title: "Trang chủ",
    slug: "/",
    author: "Admin",
    status: "Đã xuất bản",
    lastModified: "2024-01-15",
  },
  {
    id: 2,
    title: "Giới thiệu",
    slug: "/about",
    author: "Admin",
    status: "Đã xuất bản",
    lastModified: "2024-01-14",
  },
  {
    id: 3,
    title: "Liên hệ",
    slug: "/contact",
    author: "Editor",
    status: "Bản nháp",
    lastModified: "2024-01-13",
  },
  // Thêm các trang khác...
];

export default function PagesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý trang</h1>
        <Button className="cursor-pointer">
          <Plus className="w-5 h-5 mr-2" />
          Thêm trang
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm trang..."
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
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Đường dẫn</TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead>Sửa đổi lần cuối</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>{page.author}</TableCell>
                <TableCell className="text-center">
                  <span 
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      page.status === "Đã xuất bản"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {page.status}
                  </span>
                </TableCell>
                <TableCell>{page.lastModified}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer hover:bg-accent"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer hover:bg-accent"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 