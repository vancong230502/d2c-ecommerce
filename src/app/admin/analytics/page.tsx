"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowDown, ArrowUp, Users, ShoppingBag, DollarSign, Eye } from "lucide-react";

const monthlyData = [
  { name: "T1", revenue: 40000000 },
  { name: "T2", revenue: 30000000 },
  { name: "T3", revenue: 60000000 },
  { name: "T4", revenue: 80000000 },
  { name: "T5", revenue: 50000000 },
  { name: "T6", revenue: 75000000 },
  { name: "T7", revenue: 90000000 },
  { name: "T8", revenue: 85000000 },
  { name: "T9", revenue: 100000000 },
  { name: "T10", revenue: 120000000 },
  { name: "T11", revenue: 90000000 },
  { name: "T12", revenue: 110000000 },
];

const categoryData = [
  { name: "Áo", value: 400 },
  { name: "Quần", value: 300 },
  { name: "Giày", value: 200 },
  { name: "Phụ kiện", value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Thống kê</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="cursor-default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.231.000đ</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3" />
                12%
              </span>
              so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-red-500 flex items-center">
                <ArrowDown className="h-3 w-3" />
                4%
              </span>
              so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3" />
                9%
              </span>
              so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lượt truy cập</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132.234</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3" />
                20%
              </span>
              so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 cursor-default">
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
            <CardDescription>
              Biểu đồ thể hiện doanh thu theo từng tháng trong năm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => `${value.toLocaleString()}đ`}
                    cursor={{ stroke: '#374151', strokeWidth: 1 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                    activeDot={{ stroke: '#8884d8', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-default">
          <CardHeader>
            <CardTitle>Phân bố sản phẩm</CardTitle>
            <CardDescription>
              Tỷ lệ sản phẩm theo danh mục
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    cursor="pointer"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 