import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReviewFilters = ({
  sortType,
  starFilter,
  setSortType,
  setStarFilter
}: {
  sortType: string;
  starFilter: number | null;
  setSortType: (type: string) => void;
  setStarFilter: (stars: number | null) => void;
}) => (
  <div className="flex flex-wrap gap-3">
    {/* Dropdown Sắp xếp */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 w-40 justify-start h-12 sm:h-10 cursor-pointer">
          <Filter className="h-4 w-4" />
          {{
            newest: 'Mới nhất',
            highest: 'Cao nhất',
            lowest: 'Thấp nhất'
          }[sortType]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => setSortType("newest")} className="cursor-pointer">
          Mới nhất
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortType("highest")} className="cursor-pointer">
          Đánh giá cao nhất
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortType("lowest")} className="cursor-pointer">
          Đánh giá thấp nhất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    {/* Dropdown Lọc theo sao */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 w-40 justify-start h-12 sm:h-10 cursor-pointer">
          <Filter className="h-4 w-4" />
          {starFilter ? `${starFilter} sao` : "Lọc theo sao"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => setStarFilter(null)} className="cursor-pointer">
          Tất cả
        </DropdownMenuItem>
        {[5, 4, 3, 2, 1].map(stars => (
          <DropdownMenuItem 
            key={stars} 
            onClick={() => setStarFilter(stars)}
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
  </div>
);