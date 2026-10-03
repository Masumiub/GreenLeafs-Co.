"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  PackageCheck,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface HeaderProps {
  onOpenPlantFinder?: () => void;
}

export function Header({ onOpenPlantFinder }: HeaderProps) {
  const router = useRouter();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Botanical Announcement Bar */}
      <div className="bg-[#12281e] text-[#d8f3dc] text-xs py-2 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-center">
          <div className="hidden md:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#74c69d] animate-pulse"></span>
            <span>Nursery-Grown & Hand-Inspected Botanicals</span>
          </div>
          <div className="mx-auto flex items-center justify-center gap-3">
            <span>🌿 <strong>Free Climate-Neutral Delivery</strong> on orders over $75</span>
            <span className="text-[#74c69d]/50 hidden sm:inline">•</span>
            <span className="hidden sm:inline">30-Day Plant Health Guarantee</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-xs text-[#b7e4c7]">
            <Link href="/orders" className="hover:text-white transition flex items-center gap-1">
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e9e3da]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#1b382b] hover:text-[#40916c] transition"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-full bg-[#1b382b] flex items-center justify-center text-[#d8f3dc] group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <Leaf className="w-5 h-5 text-[#74c69d]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#12281e] group-hover:text-[#2d6a4f] transition-colors leading-none">
                    GreenLeafs<span className="text-[#c2613d] font-sans">&</span>Co.
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#526359] mt-0.5">
                    Botanical Living
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#26372d]">
              <Link
                href="/shop"
                className="hover:text-[#2d6a4f] py-1 border-b-2 border-transparent hover:border-[#2d6a4f] transition-all"
              >
                Shop All
              </Link>
              <Link
                href="/shop?category=rare"
                className="hover:text-[#2d6a4f] py-1 border-b-2 border-transparent hover:border-[#2d6a4f] transition-all flex items-center gap-1.5"
              >
                <span>Rare Finds</span>
                <span className="bg-[#c2613d]/15 text-[#a74e2d] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  Exotic
                </span>
              </Link>
              <Link
                href="/shop?petSafe=true"
                className="hover:text-[#2d6a4f] py-1 border-b-2 border-transparent hover:border-[#2d6a4f] transition-all"
              >
                Pet-Safe
              </Link>
              <Link
                href="/shop?category=large"
                className="hover:text-[#2d6a4f] py-1 border-b-2 border-transparent hover:border-[#2d6a4f] transition-all"
              >
                Statement Trees
              </Link>
              <Link
                href="/care-guide"
                className="hover:text-[#2d6a4f] py-1 border-b-2 border-transparent hover:border-[#2d6a4f] transition-all"
              >
                Care Guides
              </Link>
              {onOpenPlantFinder && (
                <button
                  type="button"
                  onClick={onOpenPlantFinder}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#e9f5ed] text-[#2d6a4f] hover:bg-[#d8f3dc] transition shadow-xs border border-[#b7e4c7]/60"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#2d6a4f]" />
                  <span>Plant Match Quiz</span>
                </button>
              )}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Toggle button */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#244b3a] hover:text-[#12281e] hover:bg-[#ebe6de] rounded-full transition"
                aria-label="Search plants"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/shop?wishlist=true"
                className="p-2 text-[#244b3a] hover:text-[#12281e] hover:bg-[#ebe6de] rounded-full transition relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#c2613d] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Slide-out Cart trigger */}
              <button
                type="button"
                onClick={openCart}
                className="flex items-center gap-2 px-3 py-2 bg-[#1b382b] hover:bg-[#244b3a] text-white rounded-full transition shadow-sm active:scale-95"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#b7e4c7]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#d97757] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold hidden sm:inline">
                  {itemCount > 0 ? `${itemCount} items` : "Cart"}
                </span>
              </button>
            </div>
          </div>

          {/* Expandable Search Bar */}
          {searchOpen && (
            <div className="py-3 pb-4 border-t border-[#e9e3da]">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-[#657d70]" />
                <input
                  type="text"
                  placeholder="Search plants by name, botanical variety, or care need (e.g. Monstera, low light)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-white border border-[#d8d2c7] rounded-full pl-10 pr-24 py-2.5 text-sm text-[#1b382b] placeholder-[#819488] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-1.5 text-xs font-semibold bg-[#2d6a4f] hover:bg-[#1b382b] text-white rounded-full transition"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative ml-0 mr-auto w-full max-w-xs bg-[#faf8f5] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#e9e3da]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1b382b] flex items-center justify-center text-[#d8f3dc]">
                    <Leaf className="w-4 h-4 text-[#74c69d]" />
                  </div>
                  <span className="font-serif text-lg font-bold text-[#12281e]">GreenLeafs&Co.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#526359] hover:text-[#12281e]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-4 text-base font-medium text-[#1b382b]">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-[#f4f0ea]"
                >
                  <span>Shop All Botanicals</span>
                  <ChevronRight className="w-4 h-4 text-[#819488]" />
                </Link>
                <Link
                  href="/shop?category=rare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-[#f4f0ea]"
                >
                  <span className="flex items-center gap-2">
                    <span>Rare & Variegated</span>
                    <span className="bg-[#c2613d]/15 text-[#a74e2d] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      Rare
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#819488]" />
                </Link>
                <Link
                  href="/shop?petSafe=true"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-[#f4f0ea]"
                >
                  <span>Pet-Friendly Plants</span>
                  <ChevronRight className="w-4 h-4 text-[#819488]" />
                </Link>
                <Link
                  href="/shop?category=large"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-[#f4f0ea]"
                >
                  <span>Statement & Floor Plants</span>
                  <ChevronRight className="w-4 h-4 text-[#819488]" />
                </Link>
                <Link
                  href="/care-guide"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-[#f4f0ea]"
                >
                  <span>Botanical Care Guides</span>
                  <ChevronRight className="w-4 h-4 text-[#819488]" />
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-[#f4f0ea]"
                >
                  <span>Track Existing Order</span>
                  <ChevronRight className="w-4 h-4 text-[#819488]" />
                </Link>
              </div>

              {onOpenPlantFinder && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPlantFinder();
                  }}
                  className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1b382b] text-[#d8f3dc] font-semibold text-sm shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#74c69d]" />
                  <span>Take Plant Match Quiz</span>
                </button>
              )}
            </div>

            <div className="pt-6 border-t border-[#e9e3da] text-xs text-[#526359] space-y-2">
              <p>🌿 30-Day Healthy Plant Guarantee</p>
              <p>📦 Insulated, eco-conscious packaging</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
