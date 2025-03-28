"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Save, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import { ProductBasicInfo } from "./components/ProductBasicInfo";
import { ProductPriceStock } from "./components/ProductPriceStock";
import { ProductVariants } from "./components/ProductVariants";
import { ProductImages } from "./components/ProductImages";

const categories = [
  { id: "1", name: "Áo" },
  { id: "2", name: "Quần" },
  { id: "3", name: "Giày" },
  { id: "4", name: "Phụ kiện" },
];

export type ProductFormData = {
  name: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  variantEnabled: boolean;
  variantOptions: {
    id: string;
    name: string;
    values: string[];
  }[];
  variants: {
    id: string;
    combination: Record<string, string>;
    price: number;
    stock: number;
    enabled: boolean;
  }[];
};

export default function AddProductPage() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    description: "",
    images: [],
    price: 0,
    stock: 0,
    variantEnabled: false,
    variantOptions: [],
    variants: [],
  });

  // Xử lý upload ảnh
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Convert FileList to array and create URLs
    const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...fileUrls],
    }));

    if (validationErrors.images) {
      setValidationErrors(prev => ({ ...prev, images: "" }));
    }
  };

  // Xóa ảnh
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Tạo biến thể
  const generateVariants = () => {
    const options = formData.variantOptions;
    if (options.length === 0) return;

    // Tạo tất cả các tổ hợp có thể
    const generateCombinations = (optionIndex: number, current: Record<string, string>): Record<string, string>[] => {
      if (optionIndex === options.length) {
        return [current];
      }

      const currentOption = options[optionIndex];
      const combinations: Record<string, string>[] = [];

      currentOption.values.forEach(value => {
        if (value.trim()) {
          const newCombination = { ...current, [currentOption.name]: value };
          combinations.push(...generateCombinations(optionIndex + 1, newCombination));
        }
      });

      return combinations;
    };

    const combinations = generateCombinations(0, {});
    
    // Tạo variants từ các tổ hợp
    const newVariants = combinations.map(combination => ({
      id: crypto.randomUUID(),
      combination,
      price: formData.price,
      stock: formData.stock,
      enabled: true,
    }));

    setFormData(prev => ({
      ...prev,
      variants: newVariants,
    }));
  };

  // Xử lý lưu sản phẩm
  const handleSaveProduct = () => {
    const errors: Record<string, string> = {};

    // Validate các trường bắt buộc
    if (!formData.name.trim()) {
      errors.name = "Vui lòng nhập tên sản phẩm";
    }

    if (!formData.category) {
      errors.category = "Vui lòng chọn danh mục";
    }

    if (formData.images.length === 0) {
      errors.images = "Vui lòng thêm ít nhất 1 ảnh";
    }

    if (formData.price <= 0) {
      errors.price = "Vui lòng nhập giá bán hợp lệ";
    }

    if (formData.stock < 0) {
      errors.stock = "Vui lòng nhập số lượng hợp lệ";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // TODO: Gọi API để lưu sản phẩm
    alert("Đã lưu sản phẩm thành công!");
    router.push("/admin/products/list");
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="max-w-4xl space-y-6">
        <ProductBasicInfo 
          formData={formData}
          setFormData={setFormData}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          categories={categories}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
        />

        <ProductImages
          formData={formData}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
        />
        
        <ProductPriceStock
          formData={formData}
          setFormData={setFormData}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
        />
        
        <ProductVariants
          formData={formData}
          setFormData={setFormData}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          generateVariants={generateVariants}
        />

        {/* Nút lưu và xem trước */}
        <div className="border-t bg-background pt-6">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Xem trước
            </Button>
            <Button onClick={handleSaveProduct}>
              <Save className="h-4 w-4 mr-2" />
              Lưu sản phẩm
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[800px] h-[90vh]">
          <DialogHeader>
            <DialogTitle>Xem trước sản phẩm</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Ảnh sản phẩm */}
                <div>
                  {formData.images.length > 0 ? (
                    <div className="aspect-square relative rounded-lg overflow-hidden border">
                      <Image
                        src={formData.images[0]}
                        alt={formData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center bg-muted rounded-lg">
                      <p className="text-muted-foreground">Chưa có ảnh</p>
                    </div>
                  )}
                  
                  {formData.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {formData.images.map((image, index) => (
                        <div 
                          key={index} 
                          className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border"
                        >
                          <Image
                            src={image}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Thông tin sản phẩm */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold">{formData.name || "Tên sản phẩm"}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{formData.category || "Danh mục"}</Badge>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-primary">
                    {formData.price ? `${formData.price.toLocaleString()}đ` : "0đ"}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Số lượng: {formData.stock}
                  </div>

                  {formData.description && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">Mô tả sản phẩm</h3>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {formData.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Biến thể sản phẩm */}
              {formData.variantEnabled && formData.variants.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Biến thể sản phẩm</h3>
                    <div className="grid gap-2">
                      {formData.variants.map((variant) => (
                        <div 
                          key={variant.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            {Object.entries(variant.combination).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="text-muted-foreground">{key}:</span> {value}
                              </div>
                            ))}
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{variant.price.toLocaleString()}đ</div>
                            <div className="text-sm text-muted-foreground">
                              Còn {variant.stock}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
} 