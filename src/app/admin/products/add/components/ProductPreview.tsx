import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Save } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProductFormData } from "../page";

interface ProductPreviewProps {
  formData: ProductFormData;
  expandedSections: string[];
  setExpandedSections: React.Dispatch<React.SetStateAction<string[]>>;
  handleSaveProduct: () => void;
}

export default function ProductPreview({
  formData,
  expandedSections,
  setExpandedSections,
  handleSaveProduct
}: ProductPreviewProps) {
  return (
    <Card id="section-4">
      <CardHeader 
        className="cursor-pointer"
        onClick={() => {
          setExpandedSections(prev => 
            prev.includes("section-4") 
              ? prev.filter(id => id !== "section-4") 
              : [...prev, "section-4"]
          );
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              expandedSections.includes("section-4")
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}>
              4
            </div>
            <CardTitle>Xem trước & Lưu</CardTitle>
          </div>
          {expandedSections.includes("section-4") ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </CardHeader>
      
      {expandedSections.includes("section-4") && (
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium text-lg">Xem trước sản phẩm</h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
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
                            {index === 0 && (
                              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                                Ảnh bìa
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{formData.name || "Tên sản phẩm"}</h2>
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
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-2">Mô tả sản phẩm</h3>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {formData.description}
                        </p>
                      </div>
                    )}
                    
                    {formData.variantEnabled && formData.variants.length > 0 && (
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-2">Biến thể sản phẩm ({formData.variants.length})</h3>
                        <div className="border rounded-lg overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-muted">
                                <th className="px-4 py-2 text-left">Biến thể</th>
                                <th className="px-4 py-2 text-right">Giá</th>
                                <th className="px-4 py-2 text-right">Số lượng</th>
                                <th className="px-4 py-2 text-center">Trạng thái</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.variants.map((variant) => (
                                <tr key={variant.id} className="border-b">
                                  <td className="px-4 py-2">
                                    {Object.entries(variant.combination).map(([key, value]) => (
                                      <div key={key}>
                                        <span className="text-muted-foreground">{key}:</span> {value}
                                      </div>
                                    ))}
                                  </td>
                                  <td className="px-4 py-2 text-right">
                                    {variant.price.toLocaleString()}đ
                                  </td>
                                  <td className="px-4 py-2 text-right">{variant.stock}</td>
                                  <td className="px-4 py-2 text-center">
                                    <Badge variant={variant.enabled ? "default" : "destructive"}>
                                      {variant.enabled ? "Đang bán" : "Đã ẩn"}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                size="lg"
                onClick={handleSaveProduct}
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu sản phẩm
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
} 