"use client";

import { useState, useRef, Fragment } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  ThumbsUp,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  Users,
  MoreVertical,
  Reply,
  Image as ImageIcon,
  X,
  Bell,
  MessageSquare,
  User,
  Trash2,
  Calendar,
  Gift,
  Trophy,
  Star,
  History,
  Heart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast, Toaster } from "sonner";

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  time: string;
  replies?: Comment[];
}

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  time: string;
  comments: Comment[];
  category: "system" | "discussion" | "missions" | "attendance";
}

interface Mission {
  id: number;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  type: "daily" | "weekly" | "special";
  status: "in_progress" | "completed" | "locked";
  deadline?: string;
}

// Dữ liệu mẫu
const posts: Post[] = [
  {
    id: 1,
    user: {
      name: "Admin",
      avatar: "/avatars/admin.jpg",
    },
    content:
      "🎉 Chào mừng bạn đến với diễn đàn của chúng tôi! \n\nHãy tham gia thảo luận và chia sẻ kinh nghiệm của bạn với cộng đồng Veslg nhé!",
    likes: 324,
    time: "2 giờ trước",
    comments: [],
    category: "system",
  },
  {
    id: 2,
    user: {
      name: "Minh Trí",
      avatar: "/avatars/user1.jpg",
    },
    content: "Vừa mua được áo đẹp quá mọi người ơi! Các bạn nghĩ sao?",
    image: "/posts/post1.png",
    likes: 124,
    time: "2 giờ trước",
    comments: [
      {
        id: 1,
        user: {
          name: "Bảo Ngọc",
          avatar: "/avatars/user2.jpg",
        },
        content: "Đẹp quá! Mua ở đâu vậy bạn?",
        likes: 12,
        time: "1 giờ trước",
        replies: [
          {
            id: 2,
            user: {
              name: "Minh Trí",
              avatar: "/avatars/user1.jpg",
            },
            content: "Mình mua ở shop ABC nha bạn",
            likes: 5,
            time: "45 phút trước",
          },
        ],
      },
    ],
    category: "discussion",
  },
  {
    id: 3,
    user: {
      name: "Admin",
      avatar: "/avatars/admin.jpg",
    },
    content:
      "📢 Thông báo: Hệ thống sẽ bảo trì vào ngày 15/05/2024 từ 22:00 - 24:00. Mong quý khách thông cảm!",
    likes: 89,
    time: "3 giờ trước",
    comments: [],
    category: "system",
  },
  {
    id: 4,
    user: {
      name: "Thanh Hà",
      avatar: "/avatars/user3.jpg",
    },
    content:
      "Mọi người cho mình hỏi về cách sử dụng công cụ phân tích kỹ thuật trên Veslg với ạ?",
    likes: 45,
    time: "4 giờ trước",
    comments: [
      {
        id: 3,
        user: {
          name: "Hoàng Minh",
          avatar: "/avatars/user4.jpg",
        },
        content: "Bạn có thể xem hướng dẫn chi tiết tại mục Học tập nhé!",
        likes: 8,
        time: "3 giờ trước",
      },
    ],
    category: "discussion",
  },
  {
    id: 5,
    user: {
      name: "Admin",
      avatar: "/avatars/admin.jpg",
    },
    content:
      "🎯 Nhiệm vụ tuần mới đã được cập nhật! Hoàn thành nhiệm vụ để nhận thưởng hấp dẫn.",
    likes: 156,
    time: "5 giờ trước",
    comments: [],
    category: "system",
  },
  {
    id: 6,
    user: {
      name: "Thu Loan",
      avatar: "/avatars/user5.jpg",
    },
    content:
      "Chia sẻ kinh nghiệm đầu tư của mình trong tháng vừa qua:\n\n1. Luôn đặt quản lý rủi ro lên hàng đầu\n2. Nghiên cứu kỹ trước khi đầu tư\n3. Không FOMO theo đám đông\n\nMong kinh nghiệm này giúp ích cho các bạn! 📈",
    likes: 278,
    time: "6 giờ trước",
    comments: [
      {
        id: 4,
        user: {
          name: "Minh Trí",
          avatar: "/avatars/user1.jpg",
        },
        content: "Cảm ơn bạn đã chia sẻ kinh nghiệm quý báu!",
        likes: 15,
        time: "5 giờ trước",
      },
    ],
    category: "discussion",
  },
];

// Dữ liệu mẫu cho nhiệm vụ
const missions: Mission[] = [
  {
    id: 1,
    title: "Điểm danh hàng ngày",
    description: "Điểm danh để nhận thưởng",
    reward: 10,
    progress: 1,
    total: 1,
    type: "daily",
    status: "completed",
  },
  {
    id: 2,
    title: "Đăng bài thảo luận",
    description: "Chia sẻ ý kiến của bạn với cộng đồng",
    reward: 5,
    progress: 0,
    total: 1,
    type: "daily",
    status: "in_progress",
  },
  {
    id: 3,
    title: "Bình luận 3 bài viết",
    description: "Tương tác với các bài viết khác",
    reward: 15,
    progress: 2,
    total: 3,
    type: "daily",
    status: "in_progress",
  },
  {
    id: 4,
    title: "Hoàn thành nhiệm vụ tuần",
    description: "Hoàn thành 5 nhiệm vụ hàng ngày",
    reward: 100,
    progress: 3,
    total: 5,
    type: "weekly",
    status: "in_progress",
    deadline: "Còn 4 ngày",
  },
  {
    id: 5,
    title: "Đạt top 10 donate",
    description: "Nằm trong top 10 người donate nhiều nhất tháng",
    reward: 500,
    progress: 0,
    total: 1,
    type: "special",
    status: "locked",
    deadline: "Còn 15 ngày",
  },
];

function CommentComponent({
  comment,
  level = 0,
}: {
  comment: Comment;
  level?: number;
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  return (
    <div
      className={`space-y-4 ${level > 0 ? "ml-8 md:ml-12 border-l pl-4" : ""}`}
    >
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 border-2 border-gray-200 cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all">
          <AvatarImage src={comment.user.avatar} />
          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="bg-muted rounded-xl p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm">{comment.user.name}</span>
              <span className="text-xs text-muted-foreground">
                {comment.time}
              </span>
            </div>
            <p className="text-sm mt-1">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 cursor-pointer hover:bg-transparent transition-transform hover:scale-110"
            >
              <ThumbsUp className="h-5 w-5 mr-1" />
              {comment.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 cursor-pointer hover:bg-transparent transition-transform hover:scale-110"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              <Reply className="h-5 w-5 mr-1" />
              Trả lời
            </Button>
          </div>

          {showReplyInput && (
            <div className="flex gap-2 mt-2">
              <Avatar className="h-8 w-8 border-2 border-gray-200">
                <AvatarImage src="/avatars/default.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="relative">
                  <Textarea
                    placeholder="Viết phản hồi..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[60px] text-sm"
                    maxLength={500}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {replyContent.length}/500
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-[100px] cursor-pointer"
                    onClick={() => {
                      setShowReplyInput(false);
                      setReplyContent("");
                    }}
                  >
                    Hủy
                  </Button>
                  <Button variant="default"
            className="h-9 w-[100px] bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-colors">
                    Đăng
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentComponent key={reply.id} comment={reply} level={level + 1} />
      ))}
    </div>
  );
}

function CreatePostCard() {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 200KB = 204800 bytes, 2MB = 2097152 bytes
      if (file.size < 10240) {
        alert("Kích thước ảnh tối thiểu là 10KB");
        return;
      }
      if (file.size > 2097152) {
        alert("Kích thước ảnh không được vượt quá 2MB");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4 w-full">
        <div className="relative">
          <Textarea
            placeholder="Bạn đang nghĩ gì?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none text-lg"
            maxLength={500}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {content.length}/500
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-black border">
            <div className="aspect-video relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain bg-gray-50 dark:bg-black"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-gray-200">
              <AvatarImage src="/avatars/default.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageSelect}
            />
            {!selectedImage && (
              <div className="relative group">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-9 w-[100px] cursor-pointer transition-colors flex items-center justify-center"
                >
                  <ImageIcon className="h-4 w-4" />
                  Thêm ảnh
                </Button>
                <div className="absolute w-max bg-black text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                  Tối đa 1 ảnh, ảnh từ 10KB đến 2MB
                </div>
              </div>
            )}
          </div>

          {/* Post Button */}
          <Button
            variant="default"
            className="h-9 w-[100px] bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-colors"
            disabled={!content.trim() && !selectedImage}
          >
            Đăng bài
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState<
    "system" | "discussion" | "missions" | "attendance" | "history"
  >("discussion");
  const [page, setPage] = useState(1);
  const postsPerPage = 5;
  const [commentContent, setCommentContent] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceStreak, setAttendanceStreak] = useState(0);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const filteredPosts = posts.filter((post) => {
    if (activeTab === "missions") return false; // Don't show posts in missions tab
    return post.category === activeTab;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  // Tạo mảng ngày trong tháng
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  // Lấy tên tháng tiếng Việt
  const getVietnameseMonth = (date: Date) => {
    return `Tháng ${date.getMonth() + 1}`;
  };

  // Xử lý điểm danh
  const handleCheckIn = () => {
    setHasCheckedIn(true);
    setAttendanceStreak((prev) => prev + 1);
    // Thêm logic lưu trữ điểm danh vào database ở đây
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster />

      {/* Categories bar - Mobile only */}
      <div className="md:hidden sticky top-[75px] z-40 bg-background border-b shadow-sm">
        <div className="flex items-center justify-between px-4 h-12">
          <Button
            variant={activeTab === "system" ? "secondary" : "ghost"}
            className="h-10 w-10 p-0 hover:bg-accent flex items-center justify-center cursor-pointer"
            onClick={() => {
              setActiveTab("system");
              toast("Bản tin", {
                description: "Xem các thông báo từ hệ thống",
                position: "bottom-center",
                duration: 2000,
              });
            }}
          >
            <Bell className="h-5 w-5 text-foreground" />
          </Button>
          <Button
            variant={activeTab === "discussion" ? "secondary" : "ghost"}
            className="h-10 w-10 p-0 hover:bg-accent flex items-center justify-center cursor-pointer"
            onClick={() => {
              setActiveTab("discussion");
              toast("Thảo luận", {
                description: "Xem các bài thảo luận",
                position: "bottom-center",
                duration: 2000,
              });
            }}
          >
            <MessageSquare className="h-5 w-5 text-foreground" />
          </Button>
          <Button
            variant={activeTab === "missions" ? "secondary" : "ghost"}
            className="h-10 w-10 p-0 hover:bg-accent flex items-center justify-center cursor-pointer"
            onClick={() => {
              setActiveTab("missions");
              toast("Nhiệm vụ", {
                description: "Xem và nhận nhiệm vụ hàng ngày",
                position: "bottom-center",
                duration: 2000,
              });
            }}
          >
            <Trophy className="h-5 w-5 text-foreground" />
          </Button>
          <Button
            variant={activeTab === "attendance" ? "secondary" : "ghost"}
            className="h-10 w-10 p-0 hover:bg-accent flex items-center justify-center cursor-pointer"
            onClick={() => {
              setActiveTab("attendance");
              toast("Điểm danh", {
                description: "Điểm danh hàng ngày nhận thưởng",
                position: "bottom-center",
                duration: 2000,
              });
            }}
          >
            <Calendar className="h-5 w-5 text-foreground" />
          </Button>
          <Button
            variant={activeTab === "history" ? "secondary" : "ghost"}
            className="h-10 w-10 p-0 hover:bg-accent flex items-center justify-center cursor-pointer"
            onClick={() => {
              setActiveTab("history");
              toast("Lịch sử", {
                description: "Xem lịch sử hoạt động của bạn",
                position: "bottom-center",
                duration: 2000,
              });
            }}
          >
            <History className="h-5 w-5 text-foreground" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 container max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Desktop sidebar */}
          <div className="hidden md:block md:col-span-3">
            <nav className="space-y-2 sticky top-6">
              <Button
                variant={activeTab === "system" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 text-base font-medium cursor-pointer hover:bg-accent"
                onClick={() => {
                  setActiveTab("system");
                  setPage(1);
                }}
              >
                <Bell className="h-5 w-5 text-foreground" />
                Bản tin
              </Button>
              <Button
                variant={activeTab === "discussion" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 text-base font-medium cursor-pointer hover:bg-accent"
                onClick={() => {
                  setActiveTab("discussion");
                  setPage(1);
                }}
              >
                <MessageSquare className="h-5 w-5 text-foreground" />
                Thảo luận
              </Button>
              <Button
                variant={activeTab === "missions" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 text-base font-medium cursor-pointer hover:bg-accent"
                onClick={() => {
                  setActiveTab("missions");
                  setPage(1);
                }}
              >
                <Trophy className="h-5 w-5 text-foreground" />
                Nhiệm vụ
              </Button>
              <Button
                variant={activeTab === "attendance" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 text-base font-medium cursor-pointer hover:bg-accent"
                onClick={() => {
                  setActiveTab("attendance");
                  setPage(1);
                }}
              >
                <Calendar className="h-5 w-5 text-foreground" />
                Điểm danh
              </Button>
              <Button
                variant={activeTab === "history" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 text-base font-medium cursor-pointer hover:bg-accent"
                onClick={() => {
                  setActiveTab("history");
                  setPage(1);
                }}
              >
                <History className="h-5 w-5 text-foreground" />
                Lịch sử
              </Button>
            </nav>
          </div>

          {/* Main column */}
          <div className="md:col-span-6 space-y-6">
            {activeTab === "missions" ? (
              <Card className="p-4 md:p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      Nhiệm vụ
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Điểm hiện tại:
                      </span>
                      <span className="text-lg font-bold text-primary">
                        1,250
                      </span>
                    </div>
                  </div>

                  {/* Mission Categories */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <Button
                      variant="outline"
                      className="shrink-0 cursor-pointer hover:bg-accent"
                    >
                      Tất cả
                    </Button>
                    <Button
                      variant="outline"
                      className="shrink-0 cursor-pointer hover:bg-accent"
                    >
                      Hàng ngày
                    </Button>
                    <Button
                      variant="outline"
                      className="shrink-0 cursor-pointer hover:bg-accent"
                    >
                      Hàng tuần
                    </Button>
                    <Button
                      variant="outline"
                      className="shrink-0 cursor-pointer hover:bg-accent"
                    >
                      Đặc biệt
                    </Button>
                  </div>

                  {/* Missions List */}
                  <div className="space-y-4">
                    {missions.map((mission) => (
                      <div
                        key={mission.id}
                        className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold text-foreground">
                                {mission.title}
                              </h3>
                              {mission.deadline && (
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                  {mission.deadline}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {mission.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all duration-300"
                                  style={{
                                    width: `${
                                      (mission.progress / mission.total) * 100
                                    }%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {mission.progress}/{mission.total}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-lg font-bold text-primary">
                              +{mission.reward}
                            </span>
                            <Button
                              variant={
                                mission.status === "completed"
                                  ? "secondary"
                                  : "default"
                              }
                              className="w-24 cursor-pointer"
                              disabled={mission.status === "locked"}
                            >
                              {mission.status === "completed"
                                ? "Hoàn thành"
                                : mission.status === "locked"
                                ? "Khóa"
                                : "Nhận"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mission Tips */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <h3 className="font-medium text-foreground">
                      Mẹo hoàn thành nhiệm vụ:
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Điểm danh hàng ngày để nhận thưởng cơ bản</li>
                      <li>
                        • Tương tác với cộng đồng để tăng điểm nhanh chóng
                      </li>
                      <li>• Hoàn thành nhiệm vụ tuần để nhận thưởng lớn</li>
                      <li>
                        • Tham gia các sự kiện đặc biệt để nhận thưởng độc quyền
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            ) : activeTab === "attendance" ? (
              <Card className="p-4 md:p-6">
                <div className="space-y-6 md:space-y-8">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Điểm danh hàng ngày
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                      Điểm danh mỗi ngày để nhận thưởng
                    </p>
                  </div>

                  {/* Calendar Grid */}
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-0">
                      <h3 className="text-lg md:text-xl font-semibold select-none">
                        {getVietnameseMonth(currentDate)}{" "}
                        {currentDate.getFullYear()}
                      </h3>
                      <Button
                        size="lg"
                        className={`w-full md:w-auto py-6 px-8 text-lg transition-transform hover:scale-105 ${
                          hasCheckedIn
                            ? "bg-gray-700 cursor-not-allowed text-white"
                            : "bg-orange-600 hover:bg-orange-700 cursor-pointer text-white"
                        }`}
                        onClick={handleCheckIn}
                        disabled={hasCheckedIn}
                      >
                        <Calendar className="w-6 h-6 mr-2" />
                        {hasCheckedIn
                          ? "Đã điểm danh hôm nay"
                          : "Điểm danh ngay"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                      {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs md:text-sm font-medium text-gray-500 py-2 md:py-3"
                        >
                          {day}
                        </div>
                      ))}

                      {Array.from(
                        {
                          length: new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            1
                          ).getDay(),
                        },
                        (_, i) => (
                          <div key={`empty-${i}`} className="h-10 md:h-14" />
                        )
                      )}

                      {getDaysInMonth(currentDate).map((day) => {
                        const isToday = day === currentDate.getDate();
                        const isPast = day < currentDate.getDate();

                        return (
                          <div
                            key={day}
                            className={`h-10 md:h-14 flex items-center justify-center rounded-lg text-sm md:text-base relative ${
                              isToday
                                ? "bg-blue-500 text-white font-bold"
                                : isPast
                                ? "bg-muted dark:bg-muted/50"
                                : "bg-background dark:bg-background/50"
                            }`}
                          >
                            {day}
                            {isPast && (
                              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 absolute -top-1 -right-1" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Streak Display */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-xl p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-foreground">
                            Chuỗi điểm danh
                          </h3>
                          <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {attendanceStreak} ngày
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rewards Progress */}
                  <div className="space-y-4 md:space-y-6">
                    <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2 text-foreground">
                      <Gift className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
                      Phần thưởng điểm danh
                    </h3>
                    <div className="grid gap-4 md:gap-6">
                      <div className="bg-green-50 dark:bg-green-950/50 rounded-xl p-4 space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-base md:text-lg font-semibold text-foreground">
                                3 ngày liên tiếp
                              </span>
                              <span className="text-base md:text-lg text-green-600 dark:text-green-400 font-bold">
                                +50 điểm
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {Math.min(attendanceStreak, 3)}/3 ngày
                            </div>
                          </div>
                          <Button
                            size="lg"
                            className={`w-full md:w-auto ${
                              attendanceStreak >= 3
                                ? "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                : "bg-gray-700 dark:bg-gray-800/80 text-gray-300 dark:text-gray-400"
                            }`}
                            disabled={attendanceStreak < 3}
                          >
                            <Gift className="w-5 h-5 mr-2" />
                            Nhận thưởng
                          </Button>
                        </div>
                        <div className="h-3 bg-green-100 dark:bg-green-900/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 dark:bg-green-400 transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                (attendanceStreak / 3) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950/50 rounded-xl p-4 space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-base md:text-lg font-semibold text-foreground">
                                7 ngày liên tiếp
                              </span>
                              <span className="text-base md:text-lg text-blue-600 dark:text-blue-400 font-bold">
                                +100 điểm
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {Math.min(attendanceStreak, 7)}/7 ngày
                            </div>
                          </div>
                          <Button
                            size="lg"
                            className={`w-full md:w-auto ${
                              attendanceStreak >= 7
                                ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                : "bg-gray-700 dark:bg-gray-800/80 text-gray-300 dark:text-gray-400"
                            }`}
                            disabled={attendanceStreak < 7}
                          >
                            <Gift className="w-5 h-5 mr-2" />
                            Nhận thưởng
                          </Button>
                        </div>
                        <div className="h-3 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                (attendanceStreak / 7) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-950/50 rounded-xl p-4 space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-base md:text-lg font-semibold text-foreground">
                                30 ngày liên tiếp
                              </span>
                              <span className="text-base md:text-lg text-purple-600 dark:text-purple-400 font-bold">
                                +500 điểm
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {Math.min(attendanceStreak, 30)}/30 ngày
                            </div>
                          </div>
                          <Button
                            size="lg"
                            className={`w-full md:w-auto ${
                              attendanceStreak >= 30
                                ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                                : "bg-gray-700 dark:bg-gray-800/80 text-gray-300 dark:text-gray-400"
                            }`}
                            disabled={attendanceStreak < 30}
                          >
                            <Gift className="w-5 h-5 mr-2" />
                            Nhận thưởng
                          </Button>
                        </div>
                        <div className="h-3 bg-purple-100 dark:bg-purple-900/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 dark:bg-purple-400 transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                (attendanceStreak / 30) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : activeTab === "history" ? (
              <Card className="p-4 md:p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      Lịch sử hoạt động
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Today */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Hôm nay
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent">
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                            <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              Điểm danh thành công
                            </p>
                            <p className="text-xs text-muted-foreground">
                              09:00
                            </p>
                          </div>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            +10 điểm
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              Đăng bài thảo luận
                            </p>
                            <p className="text-xs text-muted-foreground">
                              10:30
                            </p>
                          </div>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            +5 điểm
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Yesterday */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Hôm qua
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent">
                          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                            <Gift className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              Nhận thưởng điểm danh 3 ngày
                            </p>
                            <p className="text-xs text-muted-foreground">
                              15:45
                            </p>
                          </div>
                          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            +50 điểm
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <ThumbsUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              Bình luận được thích
                            </p>
                            <p className="text-xs text-muted-foreground">
                              11:20
                            </p>
                          </div>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            +2 điểm
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* This Week */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Tuần này
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent">
                          <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                            <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              Hoàn thành nhiệm vụ tuần
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Thứ 2
                            </p>
                          </div>
                          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                            +100 điểm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <>
                {/* Create post card - only show in discussion tab */}
                {activeTab === "discussion" && <CreatePostCard />}

                {/* Posts list */}
                <div className="space-y-6">
                  {currentPosts.map((post, index) => (
                    <Fragment key={post.id}>
                      <Card className="p-4">
                        {/* Post header */}
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar className="h-10 w-10 border-2 border-border cursor-pointer hover:ring-2 hover:ring-border transition-all">
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-medium hover:text-primary cursor-pointer transition-colors text-foreground">
                                {post.user.name}
                              </h3>
                            </div>
                            <p className="text-base text-muted-foreground">
                              {post.time}
                            </p>
                          </div>
                          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-muted text-sm font-medium select-none text-foreground">
                            #{(page - 1) * postsPerPage + index + 1}
                          </div>
                        </div>

                        {/* Post content */}
                        <div className="space-y-3 mb-3">
                          <p className="text-lg whitespace-pre-line select-text text-foreground">
                            {post.content}
                          </p>
                          {post.image && (
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted cursor-zoom-in hover:opacity-90 transition-opacity">
                              <img
                                src={post.image}
                                alt="Post image"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                        </div>

                        {/* Post actions and Comments container */}
                        <div className="border-t border-border">
                          {/* Post actions */}
                          <div className="py-2 flex items-center gap-2">
                            <Button
                              variant="ghost"
                              className="flex-1 gap-2 h-9 cursor-pointer hover:bg-transparent transition-transform hover:scale-110 text-foreground"
                            >
                              <ThumbsUp className="h-5 w-5" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex-1 gap-2 h-9 cursor-pointer hover:bg-transparent transition-transform hover:scale-110 text-foreground"
                            >
                              <MessageCircle className="h-5 w-5" />
                              <span>{post.comments.length}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex-1 gap-2 h-9 cursor-pointer hover:bg-transparent transition-transform hover:scale-110 text-foreground"
                            >
                              <Share2 className="h-5 w-5" />
                              <span>Chia sẻ</span>
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex-1 gap-2 h-9 cursor-pointer hover:bg-transparent transition-transform hover:scale-110 text-foreground"
                            >
                              <Bookmark className="h-5 w-5" />
                              <span>Lưu</span>
                            </Button>
                          </div>

                          {/* Comments section */}
                          <div className="pt-6 border-t border-border space-y-4">
                            {/* Comment input */}
                            <div className="flex gap-2">
                              <Avatar className="h-10 w-10 border-2 border-border">
                                <AvatarImage src="/avatars/default.jpg" />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="relative">
                                  <Textarea
                                    placeholder="Viết bình luận..."
                                    className="min-h-[100px] text-base bg-background"
                                    maxLength={500}
                                    value={commentContent}
                                    onChange={(e) =>
                                      setCommentContent(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="flex justify-end mt-2">
                                  <Button
                                    variant="default"
                                    className="h-9 w-[100px] bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-colors"
                                  >
                                    Đăng
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Comments list */}
                            <div className="space-y-4">
                              {post.comments.map((comment) => (
                                <CommentComponent
                                  key={comment.id}
                                  comment={comment}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Advertisement Banner after every 2 posts */}
                      {(index + 1) % 2 === 0 && (
                        <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium select-none">
                                Quảng cáo
                              </p>
                              <h4 className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors text-foreground">
                                Khám phá thêm về Veslg
                              </h4>
                              <p className="text-base text-muted-foreground">
                                Tham gia ngay để nhận nhiều ưu đãi hấp dẫn
                              </p>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer transition-transform hover:scale-105">
                              Tìm hiểu thêm
                            </Button>
                          </div>
                        </Card>
                      )}
                    </Fragment>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                          className={
                            page === 1 ? "pointer-events-none opacity-50" : ""
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNum) => (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage(pageNum);
                              }}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage(page + 1);
                          }}
                          className={
                            page === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </div>

          {/* Right sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="sticky top-6">
              <Card className="p-4 md:p-6">
                <div className="space-y-4">
                  <h4 className="text-sm md:text-base font-semibold flex items-center gap-2 text-foreground">
                    <Gift className="w-4 h-4 text-pink-500" />
                    Top donate tháng
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-orange-400 ring-2 ring-orange-200 dark:ring-orange-800 hover:scale-105 transition-transform">
                          <AvatarImage src="/avatars/user1.jpg" />
                          <AvatarFallback>MT</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-lg select-none">
                          1
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-foreground">
                          Minh Trí
                        </p>
                        <p className="text-sm font-medium text-orange-700 dark:text-orange-300 select-none">
                          2,500,000đ
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative">
                        <Avatar className="h-11 w-11 border-2 border-purple-400 ring-2 ring-purple-200 dark:ring-purple-800 hover:scale-105 transition-transform">
                          <AvatarImage src="/avatars/user2.jpg" />
                          <AvatarFallback>BN</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-lg select-none">
                          2
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-foreground">
                          Bảo Ngọc
                        </p>
                        <p className="text-sm font-medium text-purple-700 dark:text-purple-300 select-none">
                          1,800,000đ
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800 hover:scale-105 transition-transform">
                          <AvatarImage src="/avatars/user3.jpg" />
                          <AvatarFallback>TH</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-lg select-none">
                          3
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-foreground">
                          Thanh Hà
                        </p>
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300 select-none">
                          1,200,000đ
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-green-400 hover:scale-105 transition-transform">
                          <AvatarImage src="/avatars/user4.jpg" />
                          <AvatarFallback>HM</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shadow-lg select-none">
                          4
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold hover:text-green-600 dark:hover:text-green-400 transition-colors text-foreground">
                          Hoàng Minh
                        </p>
                        <p className="text-sm font-medium text-green-700 dark:text-green-300 select-none">
                          800,000đ
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-950/50 dark:to-gray-900/50 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-gray-400 hover:scale-105 transition-transform">
                          <AvatarImage src="/avatars/user5.jpg" />
                          <AvatarFallback>TL</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold shadow-lg select-none">
                          5
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold hover:text-gray-600 dark:hover:text-gray-400 transition-colors text-foreground">
                          Thu Loan
                        </p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
                          500,000đ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
