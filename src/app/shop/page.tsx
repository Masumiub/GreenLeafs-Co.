import React, { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "Shop All Botanicals | GreenLeafs & Co.",
  description:
    "Explore our full collection of nursery-grown indoor plants, rare variegated philodendrons, large architectural trees, and handcrafted ceramic pots.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-[#657d70]">Loading botanicals...</div>}>
      <ShopClient initialProducts={products} />
    </Suspense>
  );
}
