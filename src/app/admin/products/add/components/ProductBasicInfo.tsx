import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ProductFormData } from "../page";
import { cn } from "@/lib/utils";

interface ProductBasicInfoProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  validationErrors: Record<string, string>;
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  categories: { id: string; name: string }[];
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

export function ProductBasicInfo({
  formData,
  setFormData,
  validationErrors,
  setValidationErrors,
  categories,
}: ProductBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            validationErrors.name || validationErrors.category
              ? "bg-destructive text-destructive-foreground"
              : "bg-primary/10 text-primary"
          )}>
            1
          </div>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 max-w-2xl">
          <div className="grid gap-2">
            <Label htmlFor="name" className={validationErrors.name ? "text-destructive" : ""}>
              Tên sản phẩm <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (validationErrors.name) {
                  setValidationErrors(prev => ({ ...prev, name: "" }));
                }
              }}
              placeholder="Nhập tên sản phẩm"
              className={validationErrors.name ? "border-destructive" : ""}
            />
            {validationErrors.name && (
              <p className="text-sm text-destructive">{validationErrors.name}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category" className={validationErrors.category ? "text-destructive" : ""}>
              Danh mục <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                setFormData({ ...formData, category: value });
                if (validationErrors.category) {
                  setValidationErrors(prev => ({ ...prev, category: "" }));
                }
              }}
            >
              <SelectTrigger 
                id="category" 
                className={cn(
                  "w-full",
                  validationErrors.category && "border-destructive"
                )}
              >
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validationErrors.category && (
              <p className="text-sm text-destructive">{validationErrors.category}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Mô tả sản phẩm</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Nhập mô tả sản phẩm"
              rows={5}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 