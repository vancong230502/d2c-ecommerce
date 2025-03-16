import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const ReviewItem = ({ review }: { review: any }) => (
  <Card className="hover:shadow-md">
    <CardContent className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-3">
        <div>
          <h4 className="font-semibold text-gray-900">{review.user}</h4>
          <time className="text-sm text-gray-500">
            {new Date(review.date).toLocaleDateString('vi-VN')}
          </time>
        </div>
        <div className="flex items-center gap-1">
          {Array(5).fill(null).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-300"}`}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-gray-700 leading-relaxed">
        {review.comment}
      </p>
    </CardContent>
  </Card>
);