"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  PawPrint,
  Sun,
  Sparkles,
  Check,
  ChevronDown,
  RotateCcw,
  Heart,
} from "lucide-react";
import { PlantProduct } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

interface ShopClientProps {
  initialProducts: PlantProduct[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isInWishlist, wishlistCount } = useWishlist();

  // URL search params
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("q") || "";
  const initialPetSafe = searchParams.get("petSafe") === "true";
  const initialWishlistOnly = searchParams.get("wishlist") === "true";
  const initialFilterTag = searchParams.get("filter") || "";

  // Local state for filters
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedLight, setSelectedLight] = useState<string>("all");
  const [selectedCare, setSelectedCare] = useState<string>("all");
  const [petSafeOnly, setPetSafeOnly] = useState<boolean>(initialPetSafe);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [wishlistOnly, setWishlistOnly] = useState<boolean>(initialWishlistOnly);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(200); // dollars
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get("q");
    if (q !== null) setSearchQuery(q);
    const pet = searchParams.get("petSafe");
    if (pet === "true") setPetSafeOnly(true);
    const wish = searchParams.get("wishlist");
    if (wish === "true") setWishlistOnly(true);
    const flt = searchParams.get("filter");
    if (flt === "bestseller") setSortBy("rating");
  }, [searchParams]);

  const categories = [
    { id: "all", label: "All Botanicals" },
    { id: "indoor", label: "Indoor Classics" },
    { id: "rare", label: "Rare & Variegated" },
    { id: "pet-safe", label: "Pet-Safe" },
    { id: "large", label: "Statement Trees" },
    { id: "easy-care", label: "Low Maintenance" },
    { id: "planters", label: "Pots & Accessories" },
  ];

  const lightOptions = [
    { id: "all", label: "Any Light Condition" },
    { id: "low", label: "Low Light / Shade" },
    { id: "indirect", label: "Medium / Indirect" },
    { id: "bright", label: "Bright / Direct Sun" },
  ];

  const careOptions = [
    { id: "all", label: "Any Care Level" },
    { id: "beginner", label: "Beginner Friendly" },
    { id: "intermediate", label: "Intermediate" },
    { id: "master", label: "Master Grower" },
  ];

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedLight("all");
    setSelectedCare("all");
    setPetSafeOnly(false);
    setInStockOnly(false);
    setWishlistOnly(false);
    setMaxPrice(200);
    setSortBy("featured");
    router.replace("/shop");
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Wishlist only
      if (wishlistOnly && !isInWishlist(product.id)) {
        return false;
      }

      // Category
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBotanical = product.botanicalName.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBotanical && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Light requirement
      if (selectedLight !== "all" && product.lightRequirement !== selectedLight) {
        return false;
      }

      // Care level
      if (selectedCare !== "all" && product.careLevel !== selectedCare) {
        return false;
      }

      // Pet safe
      if (petSafeOnly && !product.petSafe) {
        return false;
      }

      // In stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Price filter (cents to dollars)
      if (product.price / 100 > maxPrice) {
        return false;
      }

      return true;
    });
  }, [
    initialProducts,
    wishlistOnly,
    isInWishlist,
    selectedCategory,
    searchQuery,
    selectedLight,
    selectedCare,
    petSafeOnly,
    inStockOnly,
    maxPrice,
  ]);

  // Sort
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedLight !== "all" ? 1 : 0) +
    (selectedCare !== "all" ? 1 : 0) +
    (petSafeOnly ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (wishlistOnly ? 1 : 0) +
    (maxPrice < 200 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner & Header */}
      <div className="pb-8 border-b border-[#e9e3da]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c2613d] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nursery Greenhouse Collection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281e]">
              {wishlistOnly
                ? "Your Plant Wishlist"
                : selectedCategory === "rare"
                ? "Rare & Variegated Botanicals"
                : selectedCategory === "pet-safe"
                ? "ASPCA Non-Toxic Houseplants"
                : selectedCategory === "large"
                ? "Statement & Architectural Trees"
                : "Botanical Marketplace"}
            </h1>
            <p className="text-sm text-[#657d70] mt-1 max-w-2xl">
              {wishlistOnly
                ? `You have saved ${wishlistCount} botanical companions for your sanctuary.`
                : "Explore living greenery curated for natural light levels, non-toxic pet spaces, and architectural beauty."}
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#819488]" />
              <input
                type="text"
                placeholder="Search plants or care type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#d8d2c7] rounded-full pl-10 pr-9 py-2.5 text-xs text-[#12281e] placeholder-[#819488] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-[#819488] hover:text-[#12281e]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setWishlistOnly(false);
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition shadow-2xs ${
                selectedCategory === cat.id && !wishlistOnly
                  ? "bg-[#1b382b] text-white"
                  : "bg-white text-[#26372d] border border-[#e9e3da] hover:border-[#b7e4c7] hover:bg-[#f2f8f4]"
              }`}
            >
              {cat.label}
            </button>
          ))}

          {/* Wishlist filter tab */}
          <button
            type="button"
            onClick={() => {
              setWishlistOnly(!wishlistOnly);
              if (!wishlistOnly) setSelectedCategory("all");
            }}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition shadow-2xs flex items-center gap-1.5 ${
              wishlistOnly
                ? "bg-[#c2613d] text-white"
                : "bg-white text-[#26372d] border border-[#e9e3da] hover:border-[#faeee9]"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlistOnly ? "fill-current" : ""}`} />
            <span>Wishlist ({wishlistCount})</span>
          </button>
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#e9e3da]">
            <h3 className="font-serif font-bold text-base text-[#12281e] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#2d6a4f]" />
              <span>Filters</span>
            </h3>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#c2613d] hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}
          </div>

          {/* Light Requirement Filter */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#526359] block">
              Light Exposure
            </label>
            <div className="space-y-1.5">
              {lightOptions.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2 text-xs text-[#26372d] cursor-pointer hover:text-[#2d6a4f]"
                >
                  <input
                    type="radio"
                    name="light"
                    checked={selectedLight === opt.id}
                    onChange={() => setSelectedLight(opt.id)}
                    className="accent-[#2d6a4f]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Care Level Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#f4f0ea]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#526359] block">
              Experience Level
            </label>
            <div className="space-y-1.5">
              {careOptions.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2 text-xs text-[#26372d] cursor-pointer hover:text-[#2d6a4f]"
                >
                  <input
                    type="radio"
                    name="care"
                    checked={selectedCare === opt.id}
                    onChange={() => setSelectedCare(opt.id)}
                    className="accent-[#2d6a4f]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Max Price Range Slider */}
          <div className="space-y-2.5 pt-4 border-t border-[#f4f0ea]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#526359]">
                Max Price
              </label>
              <span className="text-xs font-bold text-[#12281e]">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={200}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#2d6a4f] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#819488]">
              <span>$30</span>
              <span>$100</span>
              <span>$200+</span>
            </div>
          </div>

          {/* Toggles (Pet Safe & In Stock) */}
          <div className="space-y-3 pt-4 border-t border-[#f4f0ea]">
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl bg-white border border-[#e9e3da] hover:border-[#b7e4c7] transition">
              <span className="text-xs font-medium text-[#12281e] flex items-center gap-1.5">
                <PawPrint className="w-3.5 h-3.5 text-[#2d6a4f]" />
                Pet-Safe Only
              </span>
              <input
                type="checkbox"
                checked={petSafeOnly}
                onChange={(e) => setPetSafeOnly(e.target.checked)}
                className="w-4 h-4 accent-[#2d6a4f] rounded"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl bg-white border border-[#e9e3da] hover:border-[#b7e4c7] transition">
              <span className="text-xs font-medium text-[#12281e]">
                In Stock Only
              </span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#2d6a4f] rounded"
              />
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#e9e3da]">
            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f4f0ea] hover:bg-[#e9e3da] text-xs font-semibold text-[#1b382b]"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
              </button>

              <span className="text-xs font-medium text-[#657d70]">
                Showing <strong>{sortedProducts.length}</strong> living specimens
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#526359] hidden sm:inline">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#faf8f5] border border-[#d8d2c7] text-xs font-medium text-[#12281e] rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-[#708477]">Active filters:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e9f5ed] text-[#2d6a4f] text-xs font-semibold">
                  <span>Category: {selectedCategory}</span>
                  <button type="button" onClick={() => setSelectedCategory("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedLight !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#faeee9] text-[#a74e2d] text-xs font-semibold">
                  <span>Light: {selectedLight}</span>
                  <button type="button" onClick={() => setSelectedLight("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCare !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4f0ea] text-[#3e5246] text-xs font-semibold">
                  <span>Care: {selectedCare}</span>
                  <button type="button" onClick={() => setSelectedCare("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {petSafeOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e9f5ed] text-[#2d6a4f] text-xs font-semibold">
                  <span>Pet-Safe</span>
                  <button type="button" onClick={() => setPetSafeOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {wishlistOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#faeee9] text-[#c2613d] text-xs font-semibold">
                  <span>Wishlist Only</span>
                  <button type="button" onClick={() => setWishlistOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#d8d2c7] text-[#12281e] text-xs font-semibold">
                  <span>"{searchQuery}"</span>
                  <button type="button" onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#c2613d] hover:underline font-semibold ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Grid of Products */}
          {sortedProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#e9e3da] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f4f0ea] flex items-center justify-center text-[#708477] mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#12281e]">
                No matching botanicals found
              </h3>
              <p className="text-xs text-[#657d70] max-w-sm mx-auto">
                Try loosening your light, care, or price filters to discover more specimens.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-full bg-[#1b382b] text-white text-xs font-semibold hover:bg-[#244b3a] transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#faf8f5] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#e9e3da]">
                <h3 className="font-serif font-bold text-lg text-[#12281e]">Filters</h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-[#526359] hover:text-[#12281e]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Controls */}
              <div className="py-4 space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#526359] block mb-2">
                    Light Requirement
                  </label>
                  <div className="space-y-1.5">
                    {lightOptions.map((opt) => (
                      <label key={opt.id} className="flex items-center gap-2 text-xs text-[#12281e]">
                        <input
                          type="radio"
                          name="mobile-light"
                          checked={selectedLight === opt.id}
                          onChange={() => setSelectedLight(opt.id)}
                          className="accent-[#2d6a4f]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e9e3da]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#526359] block mb-2">
                    Care Level
                  </label>
                  <div className="space-y-1.5">
                    {careOptions.map((opt) => (
                      <label key={opt.id} className="flex items-center gap-2 text-xs text-[#12281e]">
                        <input
                          type="radio"
                          name="mobile-care"
                          checked={selectedCare === opt.id}
                          onChange={() => setSelectedCare(opt.id)}
                          className="accent-[#2d6a4f]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e9e3da]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#526359] block mb-1">
                    Max Price: ${maxPrice}
                  </label>
                  <input
                    type="range"
                    min={30}
                    max={200}
                    step={5}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#2d6a4f]"
                  />
                </div>

                <div className="pt-3 border-t border-[#e9e3da] space-y-2">
                  <label className="flex items-center justify-between text-xs text-[#12281e]">
                    <span>Pet-Safe Only</span>
                    <input
                      type="checkbox"
                      checked={petSafeOnly}
                      onChange={(e) => setPetSafeOnly(e.target.checked)}
                      className="accent-[#2d6a4f]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-xs text-[#12281e]">
                    <span>In Stock Only</span>
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="accent-[#2d6a4f]"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e9e3da] flex gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="w-1/2 py-2.5 rounded-xl border border-[#d8d2c7] text-xs font-semibold text-[#526359]"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-[#1b382b] text-white text-xs font-semibold"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
