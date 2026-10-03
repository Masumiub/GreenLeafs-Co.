"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PlantProduct } from "@/types";

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (product: PlantProduct) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("greenleafs_wishlist");
      if (saved) {
        setWishlistIds(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Error reading wishlist", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("greenleafs_wishlist", JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn("Error saving wishlist", e);
    }
  }, [wishlistIds, isLoaded]);

  const toggleWishlist = (product: PlantProduct) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const isInWishlist = (id: string) => wishlistIds.includes(id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
