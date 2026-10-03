"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  Droplets,
  CloudSun,
  PawPrint,
  ShieldCheck,
  Truck,
  Heart,
  Star,
  Plus,
  Minus,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  MessageSquare,
  X,
} from "lucide-react";
import { PlantProduct, ReviewItem } from "@/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: PlantProduct;
  initialReviews: ReviewItem[];
  relatedProducts: PlantProduct[];
}

export default function ProductDetailClient({
  product,
  initialReviews,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Selected options
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "Standard");
  const [selectedPot, setSelectedPot] = useState<string>(product.potOptions[0] || "Nursery Pot");
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialReviews);
  const [reviewFilter, setReviewFilter] = useState<number | "all">("all");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewExperience, setReviewExperience] = useState("Plant Parent (1-3 yrs)");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState("");

  const favorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedPot, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewTitle.trim() || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          author: reviewAuthor.trim(),
          rating: reviewRating,
          title: reviewTitle.trim(),
          comment: reviewComment.trim(),
          experienceLevel: reviewExperience,
        }),
      });

      const data = await res.json();
      if (data.success && data.review) {
        setReviewsList((prev) => [data.review, ...prev]);
        setReviewSuccessMsg("Thank you! Your verified plant review has been posted.");
        setTimeout(() => {
          setReviewModalOpen(false);
          setReviewSuccessMsg("");
          setReviewTitle("");
          setReviewComment("");
        }, 1500);
      }
    } catch (err) {
      console.error("Failed to post review", err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Review statistics
  const totalReviews = reviewsList.length;
  const ratingSum = reviewsList.reduce((acc, r) => acc + r.rating, 0);
  const avgRating = totalReviews > 0 ? (ratingSum / totalReviews).toFixed(1) : product.rating.toFixed(1);

  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviewsList.filter((r) => r.rating === stars).length,
    percent: totalReviews > 0 ? (reviewsList.filter((r) => r.rating === stars).length / totalReviews) * 100 : 0,
  }));

  const filteredReviews = reviewFilter === "all"
    ? reviewsList
    : reviewsList.filter((r) => r.rating === reviewFilter);

  // Map pot names to descriptive colors
  const getPotColor = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("terracotta")) return "bg-[#d97757]";
    if (lower.includes("sandstone") || lower.includes("cream")) return "bg-[#e9e3da]";
    if (lower.includes("charcoal") || lower.includes("black")) return "bg-[#2c2523]";
    if (lower.includes("olive") || lower.includes("green")) return "bg-[#40916c]";
    if (lower.includes("basket") || lower.includes("seagrass")) return "bg-[#c79c6e]";
    return "bg-[#6c757d]";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#657d70]">
        <Link href="/" className="hover:text-[#1b382b] transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#1b382b] transition">
          Shop Botanicals
        </Link>
        <span>/</span>
        <span className="text-[#12281e] font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Gallery (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Photo */}
          <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden bg-[#f4f0ea] border border-[#e9e3da] shadow-sm">
            <Image
              src={product.images[activeImageIndex] || "/images/hero-greenleafs.jpg"}
              alt={`${product.name} specimen`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Badges on main photo */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              {product.badge && (
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#1b382b] text-[#d8f3dc] shadow-sm backdrop-blur-md">
                  {product.badge}
                </span>
              )}
              {product.petSafe && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#e9f5ed]/95 text-[#2d6a4f] shadow-sm border border-[#b7e4c7]">
                  <PawPrint className="w-3.5 h-3.5" />
                  100% Pet-Safe
                </span>
              )}
            </div>

            {/* Wishlist Heart */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition shadow-md ${
                favorited
                  ? "bg-[#faeee9] text-[#c2613d]"
                  : "bg-white/80 text-[#526359] hover:text-[#c2613d] hover:bg-white"
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-5 h-5 ${favorited ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition ${
                    activeImageIndex === idx
                      ? "border-[#2d6a4f] ring-2 ring-[#74c69d]/40"
                      : "border-[#e9e3da] opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info & Purchasing Controls (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-[#2d6a4f]">
                Artisanal Living Botanical
              </span>
              <span className="text-[#819488]">•</span>
              <span className="text-xs text-[#657d70] capitalize">{product.category}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281e] tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm italic font-serif text-[#526359] mt-1">
              {product.botanicalName}
            </p>

            {/* Rating jump link */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-[#d97757]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(Number(avgRating)) ? "fill-current" : "text-[#d8d2c7]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[#12281e]">{avgRating}</span>
              <a
                href="#reviews"
                className="text-xs text-[#2d6a4f] hover:underline font-medium"
              >
                ({totalReviews} customer reviews)
              </a>
            </div>
          </div>

          {/* Pricing & Stock status */}
          <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e9e3da] flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-[#12281e]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-[#9aa7a0] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="text-right">
              {product.stockCount <= 5 ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c2613d] bg-[#faeee9] px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c2613d] animate-ping" />
                  Only {product.stockCount} left in greenhouse
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2d6a4f] bg-[#e9f5ed] px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2d6a4f]" />
                  In Stock • Ships in 24h
                </span>
              )}
            </div>
          </div>

          {/* Short description */}
          <p className="text-sm text-[#3e5246] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#526359] block">
              1. Select Plant Size: <span className="text-[#12281e] font-normal">{selectedSize}</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition ${
                    selectedSize === sz
                      ? "border-[#2d6a4f] bg-[#f2f8f4] text-[#12281e] ring-1 ring-[#2d6a4f]"
                      : "border-[#e9e3da] bg-white text-[#526359] hover:border-[#b7e4c7]"
                  }`}
                >
                  <span>{sz}</span>
                  {selectedSize === sz && (
                    <CheckCircle className="w-4 h-4 text-[#2d6a4f]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Designer Ceramic Pot Finishes */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#526359] block">
              2. Ceramic Stoneware Finish: <span className="text-[#12281e] font-normal">{selectedPot}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {product.potOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedPot(opt)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2.5 transition ${
                    selectedPot === opt
                      ? "border-[#2d6a4f] bg-[#f2f8f4] text-[#12281e] ring-1 ring-[#2d6a4f]"
                      : "border-[#e9e3da] bg-white text-[#526359] hover:border-[#b7e4c7]"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full shrink-0 border border-black/10 ${getPotColor(opt)}`} />
                  <span className="truncate">{opt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#d8d2c7] rounded-xl bg-white overflow-hidden shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-3.5 text-[#1b382b] hover:bg-[#f4f0ea] transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 font-bold text-sm text-[#12281e] min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-3.5 text-[#1b382b] hover:bg-[#f4f0ea] transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Basket CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#1b382b] hover:bg-[#244b3a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
              >
                {addedAnimation ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#74c69d]" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#b7e4c7]" />
                    <span>Add to Basket • {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-[#526359]">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#e9e3da]">
                <ShieldCheck className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                <span>30-Day Plant Guarantee</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#e9e3da]">
                <Truck className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                <span>Safe Climate Transit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botanical Care Matrix */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e9e3da] shadow-sm">
        <div className="max-w-2xl mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#2d6a4f]">
            Horticultural Breakdown
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#12281e] mt-1">
            Plant Care Matrix
          </h2>
          <p className="text-xs sm:text-sm text-[#657d70] mt-1">
            Every plant ships with our personalized botanical instruction card.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Light */}
          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e9e3da] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#faeee9] flex items-center justify-center text-[#c2613d]">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#12281e]">Light Requirement</h3>
            <p className="text-xs text-[#526359] leading-relaxed capitalize">
              {product.lightRequirement} lighting. Prefers gentle indirect sunlight or bright filtered exposure.
            </p>
          </div>

          {/* Water */}
          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e9e3da] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#e9f5ed] flex items-center justify-center text-[#2d6a4f]">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#12281e]">Watering Schedule</h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              {product.waterFrequency}
            </p>
          </div>

          {/* Humidity */}
          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e9e3da] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#e9f5ed] flex items-center justify-center text-[#2d6a4f]">
              <CloudSun className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#12281e]">Humidity & Climate</h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              {product.humidity}
            </p>
          </div>

          {/* Pet Safety */}
          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e9e3da] space-y-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              product.petSafe ? "bg-[#e9f5ed] text-[#2d6a4f]" : "bg-[#faeee9] text-[#c2613d]"
            }`}>
              <PawPrint className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#12281e]">Toxicity & Pets</h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              {product.petSafe
                ? "100% ASPCA certified non-toxic. Safe for households with dogs & cats."
                : "Mildly toxic if ingested by pets. Best placed on higher stands or plant shelves."}
            </p>
          </div>
        </div>

        {/* Full Plant Description */}
        <div className="mt-8 pt-8 border-t border-[#f4f0ea]">
          <h3 className="font-serif font-bold text-lg text-[#12281e] mb-2">
            The Botanical Heritage
          </h3>
          <p className="text-sm text-[#3e5246] leading-relaxed max-w-3xl">
            {product.description}
          </p>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="bg-[#faf8f5] rounded-3xl p-8 sm:p-10 border border-[#e9e3da]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#c2613d]">
              Verified Feedback
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#12281e] mt-1">
              Customer Reviews ({totalReviews})
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setReviewModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1b382b] text-white text-xs font-semibold hover:bg-[#244b3a] transition shadow-xs self-start md:self-auto"
          >
            <MessageSquare className="w-4 h-4 text-[#74c69d]" />
            <span>Write a Plant Review</span>
          </button>
        </div>

        {/* Rating Breakdown Scorecard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-2xl bg-white border border-[#e9e3da] mb-8 items-center">
          <div className="md:col-span-4 text-center md:text-left md:border-r border-[#f4f0ea] md:pr-6">
            <span className="font-serif text-5xl font-bold text-[#12281e]">
              {avgRating}
            </span>
            <div className="flex items-center justify-center md:justify-start text-[#d97757] my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(Number(avgRating)) ? "fill-current" : "text-[#d8d2c7]"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-[#657d70]">
              Based on {totalReviews} verified greenhouse plant adoptions
            </p>
          </div>

          <div className="md:col-span-8 space-y-1.5">
            {ratingCounts.map(({ stars, count, percent }) => (
              <button
                key={stars}
                type="button"
                onClick={() => setReviewFilter(reviewFilter === stars ? "all" : stars)}
                className={`w-full flex items-center gap-3 text-xs transition p-1 rounded-lg ${
                  reviewFilter === stars ? "bg-[#f2f8f4]" : "hover:bg-[#faf8f5]"
                }`}
              >
                <span className="w-12 text-left font-medium text-[#12281e]">
                  {stars} stars
                </span>
                <div className="flex-1 h-2 bg-[#f4f0ea] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2d6a4f] rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[#819488] font-medium">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar for reviews */}
        {reviewFilter !== "all" && (
          <div className="flex items-center gap-2 mb-4 text-xs">
            <span className="text-[#657d70]">Showing {reviewFilter}-star reviews</span>
            <button
              type="button"
              onClick={() => setReviewFilter("all")}
              className="text-[#c2613d] hover:underline font-semibold"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#657d70] bg-white rounded-2xl border border-[#e9e3da]">
              No reviews with {reviewFilter} stars yet. Be the first to review!
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white border border-[#e9e3da] shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-[#d97757]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? "fill-current" : "text-[#e9e3da]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-xs text-[#12281e]">{rev.title}</span>
                  </div>
                  <span className="text-[11px] text-[#819488]">
                    {new Date(rev.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <p className="text-xs text-[#3e5246] leading-relaxed">{rev.comment}</p>

                <div className="pt-2 flex items-center gap-3 text-[11px] text-[#708477]">
                  <span className="font-medium text-[#12281e]">{rev.author}</span>
                  <span>•</span>
                  <span className="text-[#2d6a4f] flex items-center gap-1 font-semibold">
                    <CheckCircle className="w-3 h-3 text-[#2d6a4f]" />
                    Verified Botanical Buyer
                  </span>
                  <span>•</span>
                  <span>{rev.experienceLevel}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Plants */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#2d6a4f]">
                Curated Pairings
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#12281e] mt-1">
                Complete your indoor sanctuary.
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#2d6a4f] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Write a Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#12281e]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setReviewModalOpen(false)}
          />

          <div className="relative bg-[#faf8f5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e9e3da] z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#e9e3da]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#12281e]">
                  Write a Botanical Review
                </h3>
                <p className="text-xs text-[#657d70]">for {product.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="p-1.5 text-[#526359] hover:text-[#12281e] rounded-full hover:bg-[#f4f0ea]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSuccessMsg ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-[#2d6a4f] mx-auto" />
                <p className="font-serif font-bold text-base text-[#12281e]">
                  {reviewSuccessMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="py-4 space-y-4">
                {/* Rating selection */}
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-1.5 text-[#d97757]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 focus:outline-hidden"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewRating ? "fill-current" : "text-[#d8d2c7]"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#12281e] ml-2">
                      {reviewRating} of 5 Stars
                    </span>
                  </div>
                </div>

                {/* Author Name */}
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Charlotte M."
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    className="w-full bg-white border border-[#d8d2c7] rounded-xl px-3 py-2 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>

                {/* Experience Level */}
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    Plant Experience Level
                  </label>
                  <select
                    value={reviewExperience}
                    onChange={(e) => setReviewExperience(e.target.value)}
                    className="w-full bg-white border border-[#d8d2c7] rounded-xl px-3 py-2 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  >
                    <option value="First-Time Plant Parent">First-Time Plant Parent</option>
                    <option value="Plant Parent (1-3 yrs)">Plant Parent (1-3 yrs)</option>
                    <option value="Experienced Botanical Enthusiast">Experienced Botanical Enthusiast</option>
                    <option value="Master Collector">Master Collector</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stunning foliage, arrived safe and sound!"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full bg-white border border-[#d8d2c7] rounded-xl px-3 py-2 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    Detailed Experience
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell other plant lovers how it arrived, your lighting setup, and growth progress..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-white border border-[#d8d2c7] rounded-xl px-3 py-2 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full py-3 rounded-xl bg-[#1b382b] hover:bg-[#244b3a] text-white text-xs font-semibold transition disabled:opacity-50"
                  >
                    {isSubmittingReview ? "Submitting Review..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
