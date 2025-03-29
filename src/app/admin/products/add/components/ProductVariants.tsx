import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronUp, ChevronDown, Plus, Trash2, X, Upload, ImageIcon } from "lucide-react";
import { ProductFormData } from "../page";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Variant {
  id: string;
  combination: Record<string, string>;
  price: number;
  stock: number;
  enabled: boolean;
  image?: string;
}

interface ProductVariantsProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  validationErrors: Record<string, string>;
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  generateVariants: () => void;
}

export function ProductVariants({
  formData,
  setFormData,
  validationErrors,
  setValidationErrors,
  generateVariants,
}: ProductVariantsProps) {
  // Thêm option biến thể
  const addVariantOption = () => {
    setFormData(prev => ({
      ...prev,
      variantOptions: [...prev.variantOptions, { 
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        name: "",
        values: [""] 
      }],
    }));
  };

  // Xóa option biến thể
  const removeVariantOption = (id: string) => {
    setFormData(prev => ({
      ...prev,
      variantOptions: prev.variantOptions.filter(option => option.id !== id),
      // Xóa các biến thể đã tạo khi xóa thuộc tính
      variants: [],
    }));
  };

  // Cập nhật tên option biến thể
  const updateVariantOptionName = (id: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      variantOptions: prev.variantOptions.map(option =>
        option.id === id ? { ...option, name } : option
      ),
      // Xóa các biến thể đã tạo khi thay đổi thuộc tính
      variants: [],
    }));
  };

  // Thêm giá trị cho option biến thể
  const addVariantOptionValue = (optionId: string) => {
    setFormData(prev => ({
      ...prev,
      variantOptions: prev.variantOptions.map(option =>
        option.id === optionId ? { ...option, values: [...option.values, ""] } : option
      ),
      // Xóa các biến thể đã tạo khi thay đổi thuộc tính
      variants: [],
    }));
  };

  // Xóa giá trị của option biến thể
  const removeVariantOptionValue = (optionId: string, valueIndex: number) => {
    setFormData(prev => ({
      ...prev,
      variantOptions: prev.variantOptions.map(option =>
        option.id === optionId
          ? {
              ...option,
              values: option.values.filter((_, index) => index !== valueIndex),
            }
          : option
      ),
      // Xóa các biến thể đã tạo khi thay đổi thuộc tính
      variants: [],
    }));
  };

  // Cập nhật giá trị của option biến thể
  const updateVariantOptionValue = (optionId: string, valueIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      variantOptions: prev.variantOptions.map(option =>
        option.id === optionId
          ? {
              ...option,
              values: option.values.map((v, index) =>
                index === valueIndex ? value : v
              ),
            }
          : option
      ),
      // Xóa các biến thể đã tạo khi thay đổi thuộc tính
      variants: [],
    }));
  };

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
            4
          </div>
          <CardTitle>Biến thể sản phẩm</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center gap-3">
              <Switch
                id="variant-enabled"
                checked={formData.variantEnabled}
                onCheckedChange={(checked) => {
                  setFormData({ ...formData, variantEnabled: checked });
                  if (checked && formData.variantOptions.length === 0) {
                    addVariantOption();
                  }
                }}
                className="data-[state=checked]:bg-primary"
              />
              <Label htmlFor="variant-enabled" className="font-medium">
                Kích hoạt biến thể sản phẩm
              </Label>
            </div>
          </div>
          
          {validationErrors.variants && (
            <p className="text-sm text-destructive bg-destructive/10 p-4 rounded-lg border border-destructive/20">{validationErrors.variants}</p>
          )}
          
          {formData.variantEnabled && (
            <div className="space-y-2">
              {formData.variantOptions.length > 0 ? (
                <div className="space-y-8">
                  {formData.variantOptions.map((option) => (
                    <Card key={option.id} className="border shadow-sm hover:border-primary/30 transition-colors gap-0">
                      <CardHeader className="p-4 pb-0 bg-muted/20">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <Label htmlFor={`option-name-${option.id}`} className="text-sm font-medium mb-2 block">
                              Thuộc tính
                            </Label>
                            <Input
                              id={`option-name-${option.id}`}
                              value={option.name}
                              onChange={(e) => updateVariantOptionName(option.id, e.target.value)}
                              placeholder="Ví dụ: Kích thước, Màu sắc..."
                              className="h-10"
                            />
                          </div>
                          {formData.variantOptions.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeVariantOption(option.id)}
                              className="h-10 w-10 rounded-full hover:bg-rose-100 hover:text-rose-500 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-8">
                          <Label className="text-sm font-medium mb-2 block">
                            Giá trị thuộc tính
                          </Label>
                          
                          <div className="grid gap-3">
                            {option.values.map((value, valueIndex) => (
                              <div key={valueIndex} className="flex items-center gap-2">
                                <Input
                                  value={value}
                                  onChange={(e) => updateVariantOptionValue(option.id, valueIndex, e.target.value)}
                                  placeholder={`Giá trị ${valueIndex + 1}`}
                                  className="flex-1 h-10"
                                />
                                {option.values.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeVariantOptionValue(option.id, valueIndex)}
                                    className="h-10 w-10 rounded-full hover:bg-rose-100 hover:text-rose-500 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 transition-colors cursor-pointer"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => addVariantOptionValue(option.id)}
                            className="w-full h-10 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                            disabled={option.values.length >= 10}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm giá trị
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addVariantOption}
                    className="w-full h-10 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    disabled={formData.variantOptions.length >= 3}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm thuộc tính
                  </Button>
                  
                  {formData.variantOptions.some(option => option.name && option.values.some(v => v)) && (
                    <Button 
                      variant="default"
                      onClick={generateVariants}
                      className="w-full h-10 font-medium shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tạo biến thể từ thuộc tính
                    </Button>
                  )}
                  
                  {formData.variants.length > 0 && (
                    <div className="mt-2 space-y-6 mb-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Biến thể sản phẩm ({formData.variants.length})</h3>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              variants: prev.variants.map(v => ({
                                ...v,
                                price: prev.price,
                                stock: prev.stock
                              }))
                            }));
                          }}
                          className="h-10 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          Áp dụng giá & số lượng mặc định
                        </Button>
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="px-4 py-3 text-left font-medium w-[100px]">Hình ảnh</th>
                              <th className="px-4 py-3 text-left font-medium">Biến thể</th>
                              <th className="px-4 py-3 text-left font-medium w-[200px]">Giá</th>
                              <th className="px-4 py-3 text-left font-medium w-[200px]">Số lượng</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {formData.variants.map((variant: Variant, index) => (
                              <tr key={variant.id} className="hover:bg-muted/5 transition-colors">
                                <td className="px-4 py-3">
                                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border group hover:border-primary transition-colors">
                                    {variant.image || formData.images[0] ? (
                                      <Image
                                        src={variant.image || formData.images[0]}
                                        alt={`Biến thể ${Object.values(variant.combination).join(" - ")}`}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                      </div>
                                    )}
                                    <label 
                                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                      htmlFor={`variant-image-${index}`}
                                    >
                                      <Upload className="h-5 w-5 text-white" />
                                    </label>
                                    <input
                                      type="file"
                                      id={`variant-image-${index}`}
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const reader = new FileReader();
                                          reader.onloadend = () => {
                                            setFormData(prev => ({
                                              ...prev,
                                              variants: prev.variants.map((v, i) => 
                                                i === index ? { ...v, image: reader.result as string } : v
                                              )
                                            }));
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="space-y-1 py-1">
                                    {Object.entries(variant.combination).map(([key, value]) => (
                                      <div key={key} className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">{key}:</span>
                                        <span className="font-medium">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="relative">
                                    <Input
                                      type="number"
                                      value={variant.price ?? ''}
                                      onChange={(e) => {
                                        const newPrice = e.target.value === '' ? 0 : Number(e.target.value);
                                        setFormData(prev => ({
                                          ...prev,
                                          variants: prev.variants.map((v, i) => 
                                            i === index ? { ...v, price: newPrice } : v
                                          )
                                        }));
                                      }}
                                      className="w-full h-10 text-left cursor-text"
                                    />
                                    <div className="absolute -bottom-5 left-5 text-xs text-muted-foreground">
                                      {(variant.price ?? 0).toLocaleString('vi-VN')}đ
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <Input
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) => {
                                      const newStock = Number(e.target.value);
                                      setFormData(prev => ({
                                        ...prev,
                                        variants: prev.variants.map((v, i) => 
                                          i === index ? { ...v, stock: newStock } : v
                                        )
                                      }));
                                    }}
                                    className="w-full h-10 text-left cursor-text"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-muted/20 p-6 rounded-lg border text-center space-y-6">
                  <p className="text-muted-foreground">Chưa có thuộc tính biến thể</p>
                  <Button 
                    variant="default"
                    onClick={addVariantOption}
                    className="h-10 shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm thuộc tính
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}