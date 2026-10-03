"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle,
  Package,
  Truck,
  Leaf,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Home,
  Copy,
} from "lucide-react";
import { OrderRecord } from "@/types";
import { formatPrice } from "@/lib/format";

interface SuccessClientProps {
  order: OrderRecord;
}

export default function SuccessClient({ order }: SuccessClientProps) {
  useEffect(() => {
    // Fire celebratory plant confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2d6a4f", "#74c69d", "#b7e4c7", "#d97757", "#c2613d"],
      });
    } catch (e) {
      console.warn("Confetti failed", e);
    }
  }, []);

  const [copied, setCopied] = React.useState(false);

  const copyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Delivery estimate: 3 to 5 business days from today
  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 3);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 5);

  const formatEstDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Top Banner */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#e9f5ed] flex items-center justify-center text-[#2d6a4f] mx-auto shadow-sm">
          <CheckCircle className="w-9 h-9" />
        </div>
        <span className="inline-block text-xs uppercase font-bold tracking-widest text-[#2d6a4f] bg-[#e9f5ed] px-3 py-1 rounded-full">
          Order Confirmed & Nursery Registered
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281e]">
          Thank you, {order.customerName.split(" ")[0]}!
        </h1>
        <p className="text-sm text-[#657d70] max-w-lg mx-auto leading-relaxed">
          Your living botanicals have been reserved at our nursery. Our master horticulturists will prepare, hydrate, and safely secure their root balls for transit.
        </p>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e9e3da] shadow-2xs text-xs">
          <span className="text-[#657d70]">Order Confirmation:</span>
          <strong className="text-[#12281e] font-mono text-sm">{order.id}</strong>
          <button
            type="button"
            onClick={copyOrderId}
            className="text-[#2d6a4f] hover:text-[#1b382b] p-1"
            title="Copy order ID"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {copied && <span className="text-[10px] text-[#2d6a4f] font-bold">Copied!</span>}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="p-6 rounded-3xl bg-white border border-[#e9e3da] shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#526359] mb-6">
          Botanical Delivery Progress
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="flex sm:flex-col items-center sm:text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b382b] text-[#d8f3dc] flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-[#74c69d]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12281e]">Order Confirmed</p>
              <p className="text-[11px] text-[#657d70]">Payment processed</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex sm:flex-col items-center sm:text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e9f5ed] text-[#2d6a4f] flex items-center justify-center shrink-0 border-2 border-[#2d6a4f]">
              <Leaf className="w-5 h-5 text-[#2d6a4f] animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2d6a4f]">Nursery Hydration & Packing</p>
              <p className="text-[11px] text-[#657d70]">Thermal root wrapping</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex sm:flex-col items-center sm:text-center gap-3 opacity-60">
            <div className="w-10 h-10 rounded-full bg-[#faf8f5] text-[#819488] flex items-center justify-center shrink-0 border border-[#d8d2c7]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12281e]">Climate-Neutral Transit</p>
              <p className="text-[11px] text-[#657d70]">With priority courier</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex sm:flex-col items-center sm:text-center gap-3 opacity-60">
            <div className="w-10 h-10 rounded-full bg-[#faf8f5] text-[#819488] flex items-center justify-center shrink-0 border border-[#d8d2c7]">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12281e]">Sanctuary Arrival</p>
              <p className="text-[11px] text-[#657d70]">
                {formatEstDate(deliveryStart)} - {formatEstDate(deliveryEnd)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Purchased Items */}
        <div className="p-6 rounded-3xl bg-white border border-[#e9e3da] shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-[#12281e] pb-3 border-b border-[#f4f0ea]">
            Living Items in this Order
          </h3>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#f4f0ea]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-xs text-[#12281e] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#657d70]">
                    Qty: {item.quantity} • {item.size}
                  </p>
                  <p className="text-[11px] text-[#a74e2d]">{item.pot}</p>
                </div>
                <span className="text-xs font-semibold text-[#12281e]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#f4f0ea] space-y-1 text-xs text-[#526359]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#2d6a4f]">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#12281e] pt-2 border-t border-[#e9e3da]">
              <span>Total Paid</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Destination */}
        <div className="p-6 rounded-3xl bg-white border border-[#e9e3da] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-[#12281e] pb-3 border-b border-[#f4f0ea]">
              Shipping & Recipient
            </h3>

            <div className="space-y-2 text-xs text-[#3e5246]">
              <p className="font-bold text-[#12281e]">{order.customerName}</p>
              <p>{order.shippingAddress}</p>
              <p>
                {order.shippingCity}, {order.shippingPostalCode}
              </p>
              <p>{order.shippingCountry}</p>
              <div className="pt-2">
                <span className="text-[#657d70]">Updates sent to:</span>{" "}
                <span className="font-medium text-[#12281e]">{order.customerEmail}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f2f8f4] border border-[#d8f3dc] text-xs text-[#244b3a] space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
              30-Day Plant Health Warranty Active
            </span>
            <p className="text-[11px] text-[#526359]">
              Your order is safeguarded against shipping transit stress. If any branch or leaf is unhappy, contact us for instant resolution.
            </p>
          </div>
        </div>
      </div>

      {/* Your Plant Care Primer */}
      <div className="p-8 rounded-3xl bg-[#1b382b] text-white space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#74c69d]" />
          <h3 className="font-serif text-xl font-bold">
            Your First-48-Hours Botanical Primer
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#d8f3dc] leading-relaxed">
          <div className="p-4 rounded-2xl bg-[#244b3a] space-y-1.5">
            <h4 className="font-bold text-white text-sm">1. Unbox Gently</h4>
            <p className="text-[#b7e4c7]">
              Cut open the tape carefully. Slide the plant out horizontally. Remove the breathable biodegradable root wrap.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#244b3a] space-y-1.5">
            <h4 className="font-bold text-white text-sm">2. Hydrate & Acclimate</h4>
            <p className="text-[#b7e4c7]">
              Check the soil moisture with your fingertip. If dry, give it a room-temperature drink. Keep it in gentle indirect light for 48 hours.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#244b3a] space-y-1.5">
            <h4 className="font-bold text-white text-sm">3. No Immediate Repotting</h4>
            <p className="text-[#b7e4c7]">
              Let your plant adjust to its new room climate for 2-3 weeks before transferring into another vessel.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1b382b] hover:bg-[#244b3a] text-white font-semibold text-xs transition shadow-sm text-center flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/care-guide"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-[#d8d2c7] hover:bg-[#faf8f5] text-[#12281e] font-semibold text-xs transition shadow-2xs text-center"
        >
          <span>Browse Botanical Care Guides</span>
        </Link>
      </div>
    </div>
  );
}
