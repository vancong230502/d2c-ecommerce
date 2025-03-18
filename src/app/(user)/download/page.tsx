"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Monitor, Smartphone, CheckCircle } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export default function DownloadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Tải xuống GMarket</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Trải nghiệm mua sắm tốt nhất trên mọi thiết bị
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* PC Version */}
              <Card className="p-8 hover:shadow-lg transition-shadow">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Monitor className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Phiên bản PC</h2>
                      <p className="text-gray-500">Windows 10 trở lên</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-gray-700 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Tính năng nổi bật</span>
                      </div>
                      <ul className="space-y-3 text-gray-600 ml-7">
                        <li>• Giao diện tối ưu cho màn hình lớn</li>
                        <li>• Tốc độ xử lý nhanh hơn</li>
                        <li>• Hỗ trợ đa màn hình</li>
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 text-gray-600">
                      <div>
                        <span className="font-medium">Phiên bản:</span> 1.0.0
                      </div>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <div>
                        <span className="font-medium">Dung lượng:</span> 25MB
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 text-lg cursor-pointer hover:bg-gray-800 transition-all hover:scale-[1.02]"
                    onClick={() => window.open('/download/pc', '_blank')}
                  >
                    <Download className="w-6 h-6 mr-2" />
                    Tải xuống cho Windows
                  </Button>
                </div>
              </Card>

              {/* Android Version */}
              <Card className="p-8 hover:shadow-lg transition-shadow">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Smartphone className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Phiên bản Android</h2>
                      <p className="text-gray-500">Android 8.0 trở lên</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-gray-700 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Tính năng nổi bật</span>
                      </div>
                      <ul className="space-y-3 text-gray-600 ml-7">
                        <li>• Giao diện tối ưu cho di động</li>
                        <li>• Thông báo realtime</li>
                        <li>• Tiết kiệm pin</li>
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 text-gray-600">
                      <div>
                        <span className="font-medium">Phiên bản:</span> 1.0.0
                      </div>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <div>
                        <span className="font-medium">Dung lượng:</span> 15MB
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 text-lg cursor-pointer hover:bg-gray-800 transition-all hover:scale-[1.02]"
                    onClick={() => window.open('/download/android', '_blank')}
                  >
                    <Download className="w-6 h-6 mr-2" />
                    Tải xuống cho Android
                  </Button>
                </div>
              </Card>
            </div>

            {/* System Requirements */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Yêu cầu hệ thống</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-blue-600">Windows</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        Windows 10 64-bit trở lên
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        4GB RAM
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        2GB dung lượng trống
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        Kết nối internet
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-green-600">Android</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Android 8.0 trở lên
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        2GB RAM
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        100MB dung lượng trống
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Kết nối internet
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 