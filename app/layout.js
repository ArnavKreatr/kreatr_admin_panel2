import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kreatr Admin Panel",
  description: "Kreatr Admin Panel to post and see data which is there on aws",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>{children}</body>
    </html>
  );
}
