import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ProductFormData } from "../page";
import { cn } from "@/lib/utils";

interface ProductPriceStockProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  validationErrors: Record<string, string>;
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function ProductPriceStock({
  formData,
  setFormData,
  validationErrors,
  setValidationErrors,
}: ProductPriceStockProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            validationErrors.price || validationErrors.stock
              ? "bg-destructive text-destructive-foreground"
              : "bg-primary/10 text-primary"
          )}>
            3
          </div>
          <CardTitle>Giá & Kho hàng</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="price" className={validationErrors.price ? "text-destructive" : ""}>
              Giá bán <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => {
                setFormData({ ...formData, price: Number(e.target.value) });
                if (validationErrors.price) {
                  setValidationErrors(prev => ({ ...prev, price: "" }));
                }
              }}
              placeholder="Nhập giá bán"
              className={validationErrors.price ? "border-destructive" : ""}
            />
            {validationErrors.price && (
              <p className="text-sm text-destructive">{validationErrors.price}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="stock" className={validationErrors.stock ? "text-destructive" : ""}>
              Số lượng <span className="text-destructive">*</span>
            </Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => {
                setFormData({ ...formData, stock: Number(e.target.value) });
                if (validationErrors.stock) {
                  setValidationErrors(prev => ({ ...prev, stock: "" }));
                }
              }}
              placeholder="Nhập số lượng"
              className={validationErrors.stock ? "border-destructive" : ""}
            />
            {validationErrors.stock && (
              <p className="text-sm text-destructive">{validationErrors.stock}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 