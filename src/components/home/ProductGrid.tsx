import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Sách cổ vĩ đại",
    price: 19,
    image: "/images/default.png",
  },
  {
    id: 2,
    name: "Rìu",
    price: 19,
    image: "/images/default.png",
  },
  {
    id: 3,
    name: "Giày thể thao trắng",
    price: 79,
    image: "/images/default.png",
  },
  {
    id: 4,
    name: "Ba lô thời trang",
    price: 39,
    image: "/images/default.png",
  },
  {
    id: 5,
    name: "Đồng hồ thông minh",
    price: 129,
    image: "/images/default.png",
  },
  {
    id: 6,
    name: "Kính râm phong cách",
    price: 29,
    image: "/images/default.png",
  },
];

export function ProductGrid() {
  return (
    <section className="max-w-5xl mx-auto space-y-10 py-12 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center sm:text-5xl">
        Sản phẩm nổi bật
      </h2>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer overflow-hidden border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
            >
              <CardContent className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 sm:h-36 w-full object-contain rounded-t-2xl transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 sm:text-xl cursor-pointer">
                  {product.name}
                </h3>
                <p className="text-gray-700 font-medium text-sm sm:text-base mt-2 flex items-center">
                  {product.price}
                  <img
                    src="/icons/chit.png" 
                    alt="currency"
                    className="w-4 h-4 ml-1"
                  />
                </p>
                <Button className="mt-3 w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white text-sm sm:text-base rounded-lg py-2.5 transition-all cursor-pointer active:scale-95">
                  Mua ngay
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
