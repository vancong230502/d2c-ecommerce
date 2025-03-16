import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentSales = [
  {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    amount: "2.500.000đ",
  },
  {
    name: "Trần Thị B",
    email: "tranthib@example.com",
    amount: "3.200.000đ",
  },
  {
    name: "Lê Văn C",
    email: "levanc@example.com",
    amount: "1.800.000đ",
  },
  {
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    amount: "4.200.000đ",
  },
  {
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    amount: "2.900.000đ",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${sale.email}.png`} alt={sale.name} />
            <AvatarFallback>
              {sale.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
} 