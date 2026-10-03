import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { getAllProducts } from "@/lib/products";
import { PlantProduct } from "@/types";

export const metadata: Metadata = {
  title: "GreenLeafs & Co. | Nursery-Grown Plants for Plant Lovers",
  description:
    "Curated collection of healthy indoor plants, rare variegated specimens, statement trees, and handcrafted ceramic pots delivered with 30-day health guarantee.",
  keywords: ["plants", "houseplants", "indoor plants", "rare plants", "monstera", "plant delivery", "ceramic pots"],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  let products: PlantProduct[] = [];
  try {
    products = await getAllProducts();
  } catch (e) {
    console.error("Layout failed to load products:", e);
  }

  return (
    <html lang="en">
      <body className="bg-[#faf8f5] text-[#1b382b] antialiased selection:bg-[#74c69d]/40 selection:text-[#12281e]">
        <Providers initialProducts={products}>{children}</Providers>
      </body>
    </html>
  );
}
