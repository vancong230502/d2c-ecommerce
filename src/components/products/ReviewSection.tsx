import { useState } from "react";
import { ReviewFilters } from "@/components/products/ReviewFilters";
import { ReviewItem } from "@/components/products/ReviewItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star } from "lucide-react";

export const ReviewSection = ({
  reviews,
  sortType,
  starFilter,
  setSortType,
  setStarFilter
}: {
  reviews: any[];
  sortType: string;
  starFilter: number | null;
  setSortType: (type: string) => void;
  setStarFilter: (stars: number | null) => void;
}) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý submit đánh giá
  };

  return (
    <div className="space-y-6">
      {/* Form viết đánh giá */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 sm:p-5 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Viết đánh giá của bạn</h3>
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent cursor-text bg-white"
          placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-5">
          {/* Dropdown chọn số sao */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-40 justify-between gap-2 h-12 sm:h-10 cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="text-sm">{reviewRating} sao</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 opacity-50"
                  viewBox="0 0 18 18"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              {[5, 4, 3, 2, 1].map((stars) => (
                <DropdownMenuItem
                  key={stars}
                  onClick={() => setReviewRating(stars)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-8">
                    <span className="w-4 text-right">{stars}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 18 18"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Nút gửi đánh giá */}
          <Button
            type="submit"
            className="w-full sm:w-40 bg-orange-500 hover:bg-orange-600 cursor-pointer h-12 sm:h-10"
          >
            Gửi đánh giá
          </Button>
        </div>
      </form>

      {/* Phần đánh giá từ khách hàng */}
      <div className="bg-gray-50 p-4 sm:p-5 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Đánh giá từ khách hàng</h3>
        
        {/* Bộ lọc đánh giá */}
        <ReviewFilters
          sortType={sortType}
          starFilter={starFilter}
          setSortType={setSortType}
          setStarFilter={setStarFilter}
        />

        {/* Danh sách đánh giá */}
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};