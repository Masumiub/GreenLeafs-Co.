"use client";

import React, { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SlideOutCart } from "@/components/SlideOutCart";
import { ToastNotification } from "@/components/ToastNotification";
import { PlantFinderModal } from "@/components/PlantFinderModal";
import { PlantProduct } from "@/types";

interface ProvidersProps {
  children: React.ReactNode;
  initialProducts?: PlantProduct[];
}

export function Providers({ children, initialProducts = [] }: ProvidersProps) {
  const [plantFinderOpen, setPlantFinderOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1b382b]">
          <Header onOpenPlantFinder={() => setPlantFinderOpen(true)} />
          <main className="flex-1">{children}</main>
          <Footer />
          <SlideOutCart />
          <ToastNotification />
          <PlantFinderModal
            isOpen={plantFinderOpen}
            onClose={() => setPlantFinderOpen(false)}
            products={initialProducts}
          />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
