import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, ChevronUp, ChevronDown, X } from "lucide-react";
import Image from "next/image";
import { ProductFormData } from "../page";
import { cn } from "@/lib/utils";

interface ProductImagesProps {
  formData: ProductFormData;
  validationErrors: Record<string, string>;
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

export function ProductImages({
  formData,
  validationErrors,
  setValidationErrors,
  handleImageUpload,
  removeImage,
}: ProductImagesProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            validationErrors.images
              ? "bg-destructive text-destructive-foreground"
              : "bg-primary/10 text-primary"
          )}>
            2
          </div>
          <CardTitle>Hình ảnh sản phẩm</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="image" className={validationErrors.images ? "text-destructive" : ""}>
              Hình ảnh sản phẩm <span className="text-destructive">*</span>
            </Label>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => document.getElementById('image')?.click()}
                  className="flex items-center gap-2"
                >
                  <ImagePlus className="h-4 w-4" />
                  Thêm ảnh
                </Button>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {validationErrors.images && (
                <p className="text-sm text-destructive">{validationErrors.images}</p>
              )}
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {formData.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="group relative aspect-square rounded-lg overflow-hidden border bg-muted"
                    >
                      <Image
                        src={image}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {index === 0 && (
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs text-center py-1">
                          Ảnh bìa
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <p>• Ảnh đầu tiên sẽ được sử dụng làm ảnh bìa</p>
                <p>• Có thể tải lên nhiều ảnh cùng lúc</p>
                <p>• Định dạng: JPG, PNG. Tối đa 5MB/ảnh</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 