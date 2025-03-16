"use client";

import { useState, useRef } from "react";
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
  Trash2
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
  category: 'system' | 'discussion' | 'following' | 'saved';
}

// Dữ liệu mẫu
const posts: Post[] = [
  {
    id: 1,
    user: {
      name: "Admin",
      avatar: "/avatars/admin.jpg",
    },
    content: "🎉 Chào mừng bạn đến với diễn đàn của chúng tôi!",
    likes: 324,
    time: "2 giờ trước",
    comments: [],
    category: 'system'
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
    category: 'discussion'
  },
  // Thêm các bài viết khác...
];

function CommentComponent({ comment, level = 0 }: { comment: Comment; level?: number }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  return (
    <div className={`space-y-4 ${level > 0 ? 'ml-8 md:ml-12 border-l pl-4' : ''}`}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 border-2 border-gray-200">
          <AvatarImage src={comment.user.avatar} />
          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="bg-muted rounded-xl p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm">{comment.user.name}</span>
              <span className="text-xs text-muted-foreground">{comment.time}</span>
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
                    className="cursor-pointer"
                    onClick={() => {
                      setShowReplyInput(false);
                      setReplyContent("");
                    }}
                  >
                    Hủy
                  </Button>
                  <Button size="sm" className="cursor-pointer">Đăng</Button>
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
      fileInputRef.current.value = '';
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
            className="min-h-[100px] resize-none text-base"
            maxLength={500}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {content.length}/500
          </div>
        </div>
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative rounded-lg overflow-hidden bg-gray-100 border">
            <div className="aspect-[16/9] relative">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
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
            <div className="relative group">
              <Button
                variant={selectedImage ? "destructive" : "outline"}
                onClick={selectedImage ? removeImage : () => fileInputRef.current?.click()}
                className="h-9 w-[100px] cursor-pointer transition-colors flex items-center justify-center"
              >
                {selectedImage ? (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Xóa ảnh
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-4 w-4" />
                    Thêm ảnh
                  </>
                )}
              </Button>
              {!selectedImage && (
                <div className="absolute w-max bg-black text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                  Tối đa 1 ảnh, ảnh từ 10KB đến 2MB
                </div>
              )}
            </div>
          </div>
          
          {/* Post Button */}
          <Button 
            variant="default"
            className="h-9 w-[100px] bg-black hover:bg-black/90 cursor-pointer"
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
  const [activeTab, setActiveTab] = useState<'system' | 'discussion' | 'following' | 'your-posts' | 'saved'>('discussion');
  const [page, setPage] = useState(1);
  const postsPerPage = 5;
  const [commentContent, setCommentContent] = useState("");

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'your-posts') {
      return post.user.name === "Minh Trí"; // Giả sử đây là user hiện tại
    }
    return post.category === activeTab;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster />
      
      {/* Categories bar - Mobile only */}
      <div className="md:hidden sticky top-[64px] z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 h-12">
          <Button
            variant={activeTab === 'system' ? 'secondary' : 'ghost'}
            className="h-10 w-10 p-0 hover:bg-gray-200 flex items-center justify-center"
            onClick={() => {
              setActiveTab('system');
              toast("Tin hệ thống", {
                description: "Xem các thông báo từ hệ thống",
                position: "bottom-center",
                duration: 4000,
              });
            }}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant={activeTab === 'discussion' ? 'secondary' : 'ghost'}
            className="h-10 w-10 p-0 hover:bg-gray-200 flex items-center justify-center"
            onClick={() => {
              setActiveTab('discussion');
              toast("Thảo luận", {
                description: "Xem các bài thảo luận",
                position: "bottom-center",
                duration: 2000,
              });
            }}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant={activeTab === 'your-posts' ? 'secondary' : 'ghost'}
            className="h-10 w-10 p-0 hover:bg-gray-200 flex items-center justify-center"
            onClick={() => {
              setActiveTab('your-posts');
              toast("Bài viết của bạn", {
                description: "Xem các bài viết bạn đã đăng",
                position: "bottom-center",
                duration: 2000,
              });
            }}
          >
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant={activeTab === 'following' ? 'secondary' : 'ghost'}
            className="h-10 w-10 p-0 hover:bg-gray-200 flex items-center justify-center"
            onClick={() => {
              setActiveTab('following');
              toast("Đang theo dõi", {
                description: "Xem các bài viết bạn đang theo dõi",
                position: "bottom-center",
                duration: 2000,
              });
            }}
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button
            variant={activeTab === 'saved' ? 'secondary' : 'ghost'}
            className="h-10 w-10 p-0 hover:bg-gray-200 flex items-center justify-center"
            onClick={() => {
              setActiveTab('saved');
              toast("Bài viết đã lưu", {
                description: "Xem các bài viết bạn đã lưu",
                position: "bottom-center",
                duration: 2000,
              });
            }}
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Desktop sidebar */}
          <div className="hidden md:block md:col-span-3">
            <nav className="space-y-2 sticky top-6">
              <Button
                variant={activeTab === 'system' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium cursor-pointer"
                onClick={() => {
                  setActiveTab('system');
                  setPage(1);
                }}
              >
                <Bell className="h-5 w-5" />
                Tin hệ thống
              </Button>
              <Button
                variant={activeTab === 'discussion' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium cursor-pointer"
                onClick={() => {
                  setActiveTab('discussion');
                  setPage(1);
                }}
              >
                <MessageSquare className="h-5 w-5" />
                Thảo luận
              </Button>
              <Button
                variant={activeTab === 'your-posts' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium cursor-pointer"
                onClick={() => {
                  setActiveTab('your-posts');
                  setPage(1);
                }}
              >
                <User className="h-5 w-5" />
                Bài viết của bạn
              </Button>
              <Button
                variant={activeTab === 'following' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium cursor-pointer"
                onClick={() => {
                  setActiveTab('following');
                  setPage(1);
                }}
              >
                <Users className="h-5 w-5" />
                Đang theo dõi
              </Button>
              <Button
                variant={activeTab === 'saved' ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 font-medium cursor-pointer"
                onClick={() => {
                  setActiveTab('saved');
                  setPage(1);
                }}
              >
                <Bookmark className="h-5 w-5" />
                Bài viết đã lưu
              </Button>
            </nav>
          </div>

          {/* Main column */}
          <div className="md:col-span-6 space-y-6">
            {/* Create post card */}
            <CreatePostCard />

            {/* Posts list */}
            <div className="space-y-6">
              {currentPosts.map((post) => (
                <Card key={post.id} className="p-4">
                  {/* Post header */}
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-9 w-9 border-2 border-gray-200">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{post.user.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500">{post.time}</p>
                    </div>
                    <Button variant="outline" className="h-9 w-[100px] cursor-pointer">
                      Theo dõi
                    </Button>
                  </div>

                  {/* Post content */}
                  <div className="space-y-3 mb-3">
                    <p className="whitespace-pre-line">{post.content}</p>
                    {post.image && (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={post.image}
                          alt="Post image"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Post actions and Comments container */}
                  <div className="border-t">
                    {/* Post actions */}
                    <div className="py-2 flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        className="flex-1 gap-2 h-9 cursor-pointer hover:bg-transparent transition-transform hover:scale-110"
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex-1 gap-2 h-9 cursor-pointer hover:bg-transparent transition-transform hover:scale-110"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments.length}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex-1 gap-2 h-9 cursor-pointer hover:bg-transparent transition-transform hover:scale-110"
                      >
                        <Share2 className="h-5 w-5" />
                        <span>Chia sẻ</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex-1 gap-2 h-9 cursor-pointer hover:bg-transparent transition-transform hover:scale-110"
                      >
                        <Bookmark className="h-5 w-5" />
                        <span>Lưu</span>
                      </Button>
                    </div>

                    {/* Comments section */}
                    <div className="pt-6 border-t space-y-4">
                      {/* Comment input */}
                      <div className="flex gap-2">
                        <Avatar className="h-9 w-9 border-2 border-gray-200">
                          <AvatarImage src="/avatars/default.jpg" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="relative">
                            <Textarea
                              placeholder="Viết bình luận..."
                              className="min-h-[100px] text-sm"
                              maxLength={500}
                              value={commentContent}
                              onChange={(e) => setCommentContent(e.target.value)}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                              {commentContent.length}/500
                            </div>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button className="h-9 w-[100px] bg-black hover:bg-black/90 cursor-pointer">
                              Đăng
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Comments list */}
                      <div className="space-y-4">
                        {post.comments.map((comment) => (
                          <CommentComponent key={comment.id} comment={comment} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        onClick={() => setPage(p)}
                        isActive={page === p}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          {/* Right sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="sticky top-6">
              <Card className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold mb-2">Chủ đề hot</h3>
                  <Button variant="ghost" className="w-full justify-start text-sm h-9 cursor-pointer">
                    #ThoiTrangNam
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm h-9 cursor-pointer">
                    #PhongCachHe
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm h-9 cursor-pointer">
                    #SaleThang3
                  </Button>
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