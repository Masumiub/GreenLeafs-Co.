"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PackageCheck,
  Search,
  Truck,
  CheckCircle,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { OrderRecord } from "@/types";
import { formatPrice } from "@/lib/format";

export default function OrderLookupClient() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [error, setError] = useState("");

  // Check if there is a recent order stored locally
  useEffect(() => {
    try {
      const recent = localStorage.getItem("greenleafs_latest_order");
      if (recent) {
        const parsed = JSON.parse(recent);
        if (parsed && parsed.id) {
          setOrderIdInput(parsed.id);
          setOrder(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?id=${encodeURIComponent(orderIdInput.trim())}`);
      const data = await res.json();

      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setError("Order not found. Please verify your order number (e.g. GL-123456).");
      }
    } catch (err) {
      console.error("Lookup error:", err);
      setError("Failed to query order tracking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#1b382b] flex items-center justify-center text-[#74c69d] mx-auto shadow-sm">
          <PackageCheck className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281e]">
          Track Your Botanical Delivery
        </h1>
        <p className="text-sm text-[#657d70]">
          Enter your order confirmation number to check greenhouse status, packing updates, and transit milestones.
        </p>

        {/* Search Input */}
        <form onSubmit={handleLookup} className="pt-4 flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#819488]" />
            <input
              type="text"
              required
              placeholder="e.g. GL-582914"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="w-full bg-white border border-[#d8d2c7] rounded-full pl-10 pr-4 py-3 text-xs uppercase font-mono text-[#12281e] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full bg-[#1b382b] hover:bg-[#244b3a] text-white text-xs font-semibold transition shadow-xs disabled:opacity-50"
          >
            {loading ? "Searching..." : "Track Order"}
          </button>
        </form>

        {error && (
          <div className="p-3 rounded-xl bg-[#faeee9] text-[#c2613d] text-xs font-semibold flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Found Order Card */}
      {order && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e9e3da] shadow-sm space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#f4f0ea]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d6a4f]">
                Order Found in System
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#12281e] mt-0.5">
                {order.id}
              </h2>
              <p className="text-xs text-[#657d70] mt-0.5">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9f5ed] text-[#2d6a4f] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2d6a4f] animate-ping" />
              <span>Status: Nursery Hydration & Dispatch Prep</span>
            </div>
          </div>

          {/* Purchased Items in this Order */}
          <div>
            <h3 className="font-serif font-bold text-sm text-[#12281e] mb-4">
              Items in Transit ({order.items.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-[#faf8f5] border border-[#e9e3da]"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#f4f0ea]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs text-[#12281e] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#657d70]">Qty: {item.quantity}</p>
                    <p className="text-[11px] text-[#a74e2d] truncate">{item.pot}</p>
                    <span className="text-xs font-semibold text-[#12281e] mt-1 block">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#f4f0ea] text-xs">
            <div className="space-y-1 text-[#3e5246]">
              <h4 className="font-bold text-[#12281e]">Recipient Destination:</h4>
              <p className="font-medium text-[#12281e]">{order.customerName}</p>
              <p>{order.shippingAddress}</p>
              <p>
                {order.shippingCity}, {order.shippingPostalCode}
              </p>
            </div>

            <div className="space-y-1 text-[#3e5246]">
              <h4 className="font-bold text-[#12281e]">Delivery Speed:</h4>
              <p className="capitalize">
                {order.deliverySpeed === "express"
                  ? "Express Priority + Thermal Heat Pack Armor"
                  : "Standard Carbon-Neutral Nursery Courier"}
              </p>
              <p className="text-[#657d70] pt-2">
                Total paid: <strong>{formatPrice(order.total)}</strong>
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#2d6a4f] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>30-Day Plant Guarantee Active</span>
            </div>
            <Link
              href={`/checkout/success?orderId=${order.id}`}
              className="text-xs font-semibold text-[#2d6a4f] hover:underline flex items-center gap-1"
            >
              <span>View Full Confirmation Receipt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
