"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="appearance">Giao diện</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 max-w-xl">
            <div className="space-y-2">
              <Label htmlFor="site-name">Tên website</Label>
              <Input id="site-name" placeholder="Veslg" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="site-description">Mô tả</Label>
              <Textarea 
                id="site-description" 
                placeholder="Mô tả ngắn về website của bạn"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Múi giờ</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn múi giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-saigon">Asia/Saigon (GMT+7)</SelectItem>
                  <SelectItem value="asia-bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Đơn vị tiền tệ</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đơn vị tiền tệ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vnd">VND - Việt Nam Đồng</SelectItem>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-fit">Lưu thay đổi</Button>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="grid gap-6 max-w-xl">
            <div className="space-y-2">
              <Label>Giao diện</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giao diện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Sáng</SelectItem>
                  <SelectItem value="dark">Tối</SelectItem>
                  <SelectItem value="system">Theo hệ thống</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-fit">Lưu thay đổi</Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid gap-6 max-w-xl">
            <div className="space-y-4">
              <h3 className="font-medium">Email thông báo</h3>
              <div className="space-y-2">
                <Label htmlFor="email-from">Email gửi</Label>
                <Input id="email-from" type="email" placeholder="noreply@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-name">Tên người gửi</Label>
                <Input id="email-name" placeholder="Veslg Support" />
              </div>
            </div>

            <Button className="w-fit">Lưu thay đổi</Button>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 max-w-xl">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Thời gian timeout phiên đăng nhập (phút)</Label>
              <Input id="session-timeout" type="number" min="5" placeholder="30" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-policy">Chính sách mật khẩu</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chính sách" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Bình thường</SelectItem>
                  <SelectItem value="strong">Mạnh</SelectItem>
                  <SelectItem value="very-strong">Rất mạnh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-fit">Lưu thay đổi</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 