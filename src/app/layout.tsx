import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Font Inter hỗ trợ tiếng Việt rất tốt
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"], // Hỗ trợ tiếng Việt
  display: "swap",
});
export const metadata: Metadata = {
  title: 'Veslg - Mua sắm trực tuyến',
  description: 'Khám phá sản phẩm đa dạng với giá tốt nhất',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body 
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="Veslg-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
