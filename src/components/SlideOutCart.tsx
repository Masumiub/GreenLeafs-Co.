"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export function SlideOutCart() {
  const {
    cart,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    itemCount,
    subtotal,
    discount,
    promo,
    applyPromo,
    removePromo,
    freeShippingThreshold,
    amountUntilFreeShipping,
    shippingFee,
    total,
    orderNotes,
    setOrderNotes,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{
    text: string;
    isError?: boolean;
  } | null>(null);
  const [showNotes, setShowNotes] = useState(Boolean(orderNotes));

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoFeedback({
      text: res.message,
      isError: !res.success,
    });
    if (res.success) {
      setPromoInput("");
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountUntilFreeShipping) / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#12281e]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-[#faf8f5] shadow-2xl flex flex-col justify-between border-l border-[#e9e3da] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#e9e3da] bg-white/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1b382b] flex items-center justify-center text-[#74c69d]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#12281e]">
                    Botanical Basket
                  </h2>
                  <p className="text-xs text-[#657d70]">
                    {itemCount} {itemCount === 1 ? "living specimen" : "living specimens"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 text-[#526359] hover:text-[#12281e] hover:bg-[#f4f0ea] rounded-full transition"
                aria-label="Close basket"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="mt-4 p-3 rounded-xl bg-[#f2f8f4] border border-[#d8f3dc]">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                {amountUntilFreeShipping > 0 ? (
                  <span className="text-[#244b3a]">
                    Add <strong>{formatPrice(amountUntilFreeShipping)}</strong> more for <strong>Free Delivery</strong>
                  </span>
                ) : (
                  <span className="text-[#2d6a4f] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f]" />
                    Unlocked Free Climate-Neutral Delivery!
                  </span>
                )}
                <span className="text-xs font-bold text-[#2d6a4f]">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#d8f3dc] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2d6a4f] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-[#e9f5ed] flex items-center justify-center text-[#2d6a4f] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#12281e]">Your basket is empty</h3>
                <p className="text-sm text-[#657d70] mt-1 max-w-xs">
                  Fill your home with oxygen, serene green foliage, and natural beauty.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1b382b] text-white text-sm font-semibold hover:bg-[#244b3a] transition shadow-xs"
                >
                  <span>Explore Nursery Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-white border border-[#e9e3da] shadow-2xs hover:border-[#b7e4c7] transition"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#f4f0ea]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="font-serif font-bold text-sm text-[#12281e] hover:text-[#2d6a4f] line-clamp-1 transition"
                          >
                            {item.name}
                          </Link>
                          <p className="text-[11px] italic text-[#657d70] line-clamp-1">
                            {item.botanicalName}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#9aa7a0] hover:text-[#c2613d] p-1 transition"
                          aria-label="Remove plant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-1 text-[11px]">
                        <span className="px-2 py-0.5 rounded-md bg-[#f4f0ea] text-[#3e5246] font-medium">
                          {item.size}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#faeee9] text-[#a74e2d] font-medium">
                          {item.pot}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-[#d8d2c7] rounded-lg bg-[#faf8f5] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#e9e3da] text-[#1b382b] transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#12281e]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#e9e3da] text-[#1b382b] transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-semibold text-sm text-[#12281e]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#e9e3da] bg-white/90 space-y-3.5">
              {/* Promo code accordion */}
              <div>
                {promo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#e9f5ed] border border-[#b7e4c7] text-xs">
                    <div className="flex items-center gap-1.5 text-[#244b3a] font-medium">
                      <Tag className="w-3.5 h-3.5 text-[#2d6a4f]" />
                      <span>
                        Promo <strong>{promo.code}</strong>: {promo.description}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-xs text-[#a74e2d] hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#819488]" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. GREEN10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl pl-8 pr-3 py-2 text-xs uppercase text-[#12281e] placeholder-[#819488] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b382b] text-white text-xs font-semibold transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && (
                  <p
                    className={`text-[11px] mt-1 ${
                      promoFeedback.isError ? "text-[#c2613d]" : "text-[#2d6a4f]"
                    }`}
                  >
                    {promoFeedback.text}
                  </p>
                )}
              </div>

              {/* Gift message / Order note toggle */}
              <div>
                {!showNotes ? (
                  <button
                    type="button"
                    onClick={() => setShowNotes(true)}
                    className="text-xs text-[#2d6a4f] hover:underline font-medium flex items-center gap-1"
                  >
                    <span>+ Add gift note or nursery instructions</span>
                  </button>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#526359] block">
                      Gift Note or Packing Request
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="e.g. Please write 'Happy Housewarming!' on the botanical card."
                      rows={2}
                      className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl p-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                    />
                  </div>
                )}
              </div>

              {/* Calculations breakdown */}
              <div className="space-y-1.5 text-xs text-[#526359] pt-2 border-t border-[#f4f0ea]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#12281e]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2d6a4f]">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Carbon-Neutral Shipping</span>
                  <span className="font-medium text-[#12281e]">
                    {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#12281e] pt-1 border-t border-[#e9e3da]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1b382b] hover:bg-[#244b3a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-[#657d70] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2d6a4f]" />
                  30-Day Guarantee
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#2d6a4f]" />
                  Safe Plant Arrival
                </span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
