"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, Filter, MoreVertical, Save, AlertCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Variant {
  sku: string;
  price: number;
  stock: number;
  image?: string;
  attributes: Record<string, string>;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  status: string;
  variants: Variant[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Áo thun basic",
    price: 250000,
    stock: 100,
    image: "/products/tshirt.jpg",
    category: "Áo",
    status: "Còn hàng",
    variants: [
      {
        sku: "AT-BLACK-M",
        price: 250000,
        stock: 30,
        attributes: { color: "Đen", size: "M" }
      },
      {
        sku: "AT-BLACK-L",
        price: 250000,
        stock: 40,
        attributes: { color: "Đen", size: "L" }
      },
      {
        sku: "AT-WHITE-M",
        price: 250000,
        stock: 30,
        attributes: { color: "Trắng", size: "M" }
      }
    ]
  },
  {
    id: 2,
    name: "Mũ lưỡi trai basic",
    price: 150000,
    stock: 50,
    image: "/products/cap.jpg",
    category: "Phụ kiện",
    status: "Còn hàng",
    variants: [
      {
        sku: "MLT-DEFAULT",
        price: 150000,
        stock: 50,
        attributes: {}
      }
    ]
  },
  {
    id: 3,
    name: "Vớ cổ cao",
    price: 35000,
    stock: 200,
    image: "/products/socks.jpg",
    category: "Phụ kiện",
    status: "Còn hàng",
    variants: [
      {
        sku: "VC-DEFAULT",
        price: 35000,
        stock: 200,
        attributes: {}
      }
    ]
  },
  {
    id: 4,
    name: "Dây nịt da",
    price: 250000,
    stock: 30,
    image: "/products/belt.jpg",
    category: "Phụ kiện",
    status: "Còn hàng",
    variants: [
      {
        sku: "DN-DEFAULT",
        price: 250000,
        stock: 30,
        attributes: {}
      }
    ]
  },
  {
    id: 5,
    name: "Quần jeans slim",
    price: 450000,
    stock: 50,
    image: "/products/jeans.jpg", 
    category: "Quần",
    status: "Còn hàng",
    variants: [
      {
        sku: "QJ-BLACK-28",
        price: 450000,
        stock: 20,
        attributes: { color: "Đen", size: "28" }
      },
      {
        sku: "QJ-BLACK-30",
        price: 450000,
        stock: 20,
        attributes: { color: "Đen", size: "30" }
      },
      {
        sku: "QJ-WHITE-28",
        price: 450000,
        stock: 10,
        attributes: { color: "Trắng", size: "28" }
      }
    ]
  },
  {
    id: 6,
    name: "Giày sneaker",
    price: 850000,
    stock: 30,
    image: "/products/shoes.jpg", 
    category: "Giày",
    status: "Còn hàng",
    variants: [
      {
        sku: "GS-BLACK-42",
        price: 850000,
        stock: 10,
        attributes: { color: "Đen", size: "42" }
      },
      {
        sku: "GS-WHITE-42",
        price: 850000,
        stock: 10,
        attributes: { color: "Trắng", size: "42" }
      },
      {
        sku: "GS-RED-42",
        price: 850000,
        stock: 10,
        attributes: { color: "Đỏ", size: "42" }
      }
    ]
  },
  {
    id: 7,
    name: "Túi xách mini",
    price: 350000,
    stock: 15,
    image: "/products/bag.jpg", 
    category: "Phụ kiện",
    status: "Sắp hết",
    variants: [
      {
        sku: "TB-BLACK-M",
        price: 350000,
        stock: 5,
        attributes: { color: "Đen", size: "M" }
      },
      {
        sku: "TB-BLACK-L",
        price: 350000,
        stock: 5,
        attributes: { color: "Đen", size: "L" }
      },
      {
        sku: "TB-WHITE-M",
        price: 350000,
        stock: 5,
        attributes: { color: "Trắng", size: "M" }
      }
    ]
  },
  {
    id: 8,
    name: "Áo khoác bomber",
    price: 750000,
    stock: 0,
    image: "/products/jacket.jpg", 
    category: "Áo",
    status: "Hết hàng",
    variants: [
      {
        sku: "AK-BLACK-M",
        price: 750000,
        stock: 0,
        attributes: { color: "Đen", size: "M" }
      },
      {
        sku: "AK-BLACK-L",
        price: 750000,
        stock: 0,
        attributes: { color: "Đen", size: "L" }
      },
      {
        sku: "AK-WHITE-M",
        price: 750000,
        stock: 0,
        attributes: { color: "Trắng", size: "M" }
      }
    ]
  },
];

const categories = [
  { id: 1, name: "Tất cả" },
  { id: 2, name: "Áo" },
  { id: 3, name: "Quần" },
  { id: 4, name: "Giày" },
  { id: 5, name: "Phụ kiện" },
];

const statusColors = {
  "Còn hàng": "bg-green-100 text-green-800",
  "Sắp hết": "bg-yellow-100 text-yellow-800",
  "Hết hàng": "bg-red-100 text-red-800",
} as const;

interface VariantEditDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (productId: number, variants: Variant[]) => void;
}

function VariantEditDialog({ product, isOpen, onClose, onSave }: VariantEditDialogProps) {
  const [editedVariants, setEditedVariants] = useState<Variant[]>(
    product.variants.map(v => ({
      ...v,
      image: v.image || product.image
    }))
  );

  const handleVariantChange = (index: number, field: 'price' | 'stock' | 'image', value: number | string) => {
    const newVariants = [...editedVariants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value
    };
    setEditedVariants(newVariants);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleVariantChange(index, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveVariant = (index: number) => {
    onSave(product.id, editedVariants);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[65vw] xl:max-w-[55vw] w-full">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa biến thể - {product.name}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[70vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15%]">Hình ảnh</TableHead>
                <TableHead className="w-[35%]">Thuộc tính</TableHead>
                <TableHead className="w-[20%]">Giá</TableHead>
                <TableHead className="w-[20%]">Số lượng</TableHead>
                <TableHead className="w-[10%] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editedVariants.map((variant, index) => (
                <TableRow key={variant.sku}>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border group">
                        <Image
                          src={variant.image || product.image}
                          alt={`${product.name} - ${Object.values(variant.attributes).join(" ")}`}
                          fill
                          className="object-cover"
                        />
                        <label 
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          htmlFor={`image-upload-${index}`}
                        >
                          <Upload className="h-5 w-5 text-white" />
                        </label>
                        <input
                          type="file"
                          id={`image-upload-${index}`}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Click để thay đổi
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(variant.attributes).length > 0 ? (
                        Object.entries(variant.attributes).map(([key, value]) => (
                          <Badge key={key} variant="secondary" className="px-2 py-1">
                            {key}: {value}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">Không có thuộc tính</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      SKU: {variant.sku}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, 'price', Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-muted-foreground whitespace-nowrap">đ</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, 'stock', Number(e.target.value))}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleSaveVariant(index)}
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Lưu
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteConfirmDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productId: number) => void;
}

function DeleteConfirmDialog({ product, isOpen, onClose, onConfirm }: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-lg font-semibold text-destructive">Xác nhận xóa sản phẩm</div>
              <div className="text-sm text-muted-foreground mt-1">Hành động này không thể hoàn tác</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="text-sm text-muted-foreground mb-3">
            Bạn có chắc chắn muốn xóa sản phẩm này?
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
            <div className="relative w-12 h-12 rounded overflow-hidden border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-muted-foreground">
                {product.variants.length} biến thể • {product.category}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex flex-col-reverse sm:flex-row w-full gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="sm:flex-1"
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onConfirm(product.id);
                onClose();
              }}
              className="sm:flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xác nhận xóa
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const handleSaveVariants = (productId: number, updatedVariants: Variant[]) => {
    // Implement API call to save variants
    console.log('Saving variants for product', productId, updatedVariants);
    // Update local state if needed
  };

  const handleDeleteProduct = (productId: number) => {
    // Implement API call to delete product
    console.log('Deleting product', productId);
    // Update local state if needed
  };

  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "Tất cả" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Hình ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead className="hidden md:table-cell">Danh mục</TableHead>
                <TableHead className="text-right">Giá</TableHead>
                <TableHead className="text-center hidden md:table-cell">Số lượng</TableHead>
                <TableHead className="text-center hidden md:table-cell">Biến thể</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-lg overflow-hidden border">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                    <TableCell className="text-right">
                      {product.price.toLocaleString()}đ
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">{product.stock}</TableCell>
                    <TableCell className="text-center hidden md:table-cell">{product.variants.length}</TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[product.status as keyof typeof statusColors]
                      }`}>
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Sửa
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeletingProduct(product)}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy sản phẩm nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Variant Edit Dialog */}
      {editingProduct && (
        <VariantEditDialog
          product={editingProduct}
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveVariants}
        />
      )}

      {/* Delete Confirm Dialog */}
      {deletingProduct && (
        <DeleteConfirmDialog
          product={deletingProduct}
          isOpen={!!deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
} 