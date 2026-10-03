"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Sun, PawPrint, Star, Plus, Check } from "lucide-react";
import { PlantProduct } from "@/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: PlantProduct;
  onQuickView?: (product: PlantProduct) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const favorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, product.sizes[0], product.potOptions[0], 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const getLightLabel = (light: string) => {
    switch (light) {
      case "low":
        return "Low Light";
      case "indirect":
        return "Medium / Indirect";
      case "bright":
        return "Bright Light";
      case "direct":
        return "Direct Sunlight";
      default:
        return "Indirect Light";
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#e9e3da] hover:border-[#b7e4c7] hover:shadow-md transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-4/5 w-full bg-[#f4f0ea] overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0] || "/images/hero-greenleafs.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span
              className={`text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-xs backdrop-blur-md ${
                product.badge.toLowerCase().includes("rare")
                  ? "bg-[#c2613d] text-white"
                  : product.badge.toLowerCase().includes("staff")
                  ? "bg-[#1b382b] text-[#d8f3dc]"
                  : "bg-white/90 text-[#1b382b] border border-[#e9e3da]"
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.petSafe && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#e9f5ed]/95 text-[#2d6a4f] border border-[#b7e4c7]/50 shadow-xs backdrop-blur-xs">
              <PawPrint className="w-3 h-3" />
              Pet-Safe
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition shadow-xs z-10 ${
            favorited
              ? "bg-[#faeee9] text-[#c2613d]"
              : "bg-white/80 text-[#526359] hover:text-[#c2613d] hover:bg-white"
          }`}
          aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
        </button>

        {/* Quick Add Overlay on bottom of image */}
        <div className="absolute inset-x-3 bottom-3 opacity-95 translate-y-0 sm:opacity-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1b382b]/95 hover:bg-[#12281e] text-white text-xs font-semibold backdrop-blur-md flex items-center justify-center gap-1.5 shadow-md transition active:scale-98 disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4 text-[#74c69d]" />
                <span>Added to Basket</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Quick Add • {formatPrice(product.price)}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Details container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Care attributes pill */}
          <div className="flex items-center gap-2 text-[11px] text-[#657d70] mb-1.5">
            <span className="flex items-center gap-1">
              <Sun className="w-3 h-3 text-[#c2613d]" />
              {getLightLabel(product.lightRequirement)}
            </span>
            <span>•</span>
            <span className="capitalize">{product.careLevel} friendly</span>
          </div>

          {/* Plant Name & Botanical Name */}
          <Link href={`/products/${product.slug}`} className="block group/link">
            <h3 className="font-serif font-bold text-base text-[#12281e] group-hover/link:text-[#2d6a4f] transition line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs italic text-[#708477] line-clamp-1 mt-0.5">
              {product.botanicalName}
            </p>
          </Link>
        </div>

        {/* Rating and Price */}
        <div className="mt-4 pt-3 border-t border-[#f4f0ea] flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center text-[#d97757]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-[#1b382b]">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-[#819488]">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-baseline gap-1.5">
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#9aa7a0] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-sm font-bold text-[#12281e]">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
