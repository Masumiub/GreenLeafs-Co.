"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Tag,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CheckoutClient() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    discount,
    promo,
    applyPromo,
    removePromo,
    shippingFee: cartShippingFee,
    clearCart,
  } = useCart();

  // Form State
  const [email, setEmail] = useState("plantlover@greenleafs.co");
  const [phone, setPhone] = useState("(555) 392-1084");
  const [firstName, setFirstName] = useState("Elena");
  const [lastName, setLastName] = useState("Rostova");
  const [address, setAddress] = useState("742 Evergreen Terrace");
  const [apartment, setApartment] = useState("Suite 4B");
  const [city, setCity] = useState("Portland");
  const [state, setState] = useState("OR");
  const [zip, setZip] = useState("97201");
  const [country, setCountry] = useState("United States");
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");

  // Payment mock state
  const [paymentTab, setPaymentTab] = useState<"card" | "apple" | "cod">("card");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("883");
  const [cardName, setCardName] = useState("Elena Rostova");

  // Promo code
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const effectiveShipping =
    deliveryMethod === "express"
      ? 1800 // $18.00 in cents
      : cartShippingFee;

  const estimatedTax = Math.round((subtotal - discount) * 0.07); // ~7%
  const finalTotal = Math.max(0, subtotal - discount + effectiveShipping + estimatedTax);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError("");
      setPromoInput("");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const orderPayload = {
        customerName: `${firstName} ${lastName}`.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        shippingAddress: `${address}${apartment ? `, ${apartment}` : ""}`,
        shippingCity: `${city}, ${state}`,
        shippingPostalCode: zip.trim(),
        shippingCountry: country,
        deliverySpeed: deliveryMethod,
        subtotal,
        discount,
        shippingFee: effectiveShipping,
        total: finalTotal,
        promoCode: promo ? promo.code : null,
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          size: item.size,
          pot: item.pot,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success && data.order) {
        // Save latest order ID to localStorage for quick retrieval
        try {
          localStorage.setItem("greenleafs_latest_order", JSON.stringify(data.order));
        } catch {
          // ignore
        }
        clearCart();
        router.push(`/checkout/success?orderId=${data.order.id}`);
      } else {
        setErrorMessage(data.error || "Failed to process order. Please check your details.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Order submission failed:", err);
      setErrorMessage("Network error processing order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#e9f5ed] flex items-center justify-center text-[#2d6a4f] mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#12281e]">Your basket is empty</h2>
        <p className="text-sm text-[#657d70] mt-2 mb-6">
          Add living plants or curated planters to your basket before checking out.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1b382b] text-white text-xs font-semibold hover:bg-[#244b3a] transition"
        >
          <span>Browse Living Plants</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back to shop */}
      <div className="mb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526359] hover:text-[#12281e] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continue Shopping Botanicals</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2d6a4f] flex items-center gap-1.5 mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted 256-Bit Botanical Checkout</span>
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#12281e]">
              Shipping & Payment
            </h1>
          </div>

          {/* Express Checkout Options */}
          <div className="p-4 rounded-2xl bg-white border border-[#e9e3da] shadow-2xs space-y-3">
            <span className="text-xs text-[#657d70] font-medium block text-center">
              Express 1-Click Plant Checkout
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentTab("apple")}
                className="py-3 px-4 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition flex items-center justify-center gap-1.5"
              >
                <span> Pay</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentTab("card")}
                className="py-3 px-4 rounded-xl bg-[#5a31f4] text-white text-xs font-semibold hover:bg-[#4922e3] transition flex items-center justify-center gap-1.5"
              >
                <span>Shop Pay</span>
              </button>
            </div>
            <div className="relative flex items-center justify-center pt-1">
              <span className="bg-white px-3 text-[11px] text-[#819488] relative z-10 font-medium">
                OR ENTER SHIPPING DETAILS
              </span>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#f4f0ea]" />
              </div>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* 1. Contact Information */}
            <div className="space-y-4 p-6 rounded-2xl bg-white border border-[#e9e3da]">
              <h2 className="font-serif font-bold text-base text-[#12281e] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1b382b] text-[#d8f3dc] text-xs flex items-center justify-center">
                  1
                </span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    Email for Care Guides & Tracking
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    Phone (SMS Delivery Updates)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="space-y-4 p-6 rounded-2xl bg-white border border-[#e9e3da]">
              <h2 className="font-serif font-bold text-base text-[#12281e] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1b382b] text-[#d8f3dc] text-xs flex items-center justify-center">
                  2
                </span>
                <span>Sanctuary Delivery Address</span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#12281e] block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    Apartment / Suite
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#12281e] block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-[#12281e] block mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-2 py-2.5 text-xs text-[#12281e] text-center uppercase focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#12281e] block mb-1">
                      ZIP
                    </label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-2 py-2.5 text-xs text-[#12281e] text-center focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="space-y-4 p-6 rounded-2xl bg-white border border-[#e9e3da]">
              <h2 className="font-serif font-bold text-base text-[#12281e] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1b382b] text-[#d8f3dc] text-xs flex items-center justify-center">
                  3
                </span>
                <span>Botanical Delivery Method</span>
              </h2>

              <div className="space-y-3">
                <label
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition ${
                    deliveryMethod === "standard"
                      ? "border-[#2d6a4f] bg-[#f2f8f4] ring-1 ring-[#2d6a4f]"
                      : "border-[#e9e3da] bg-[#faf8f5] hover:border-[#b7e4c7]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "standard"}
                      onChange={() => setDeliveryMethod("standard")}
                      className="mt-1 accent-[#2d6a4f]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#12281e] block">
                        Carbon-Neutral Nursery Courier (3–5 business days)
                      </span>
                      <span className="text-[11px] text-[#657d70] mt-0.5 block">
                        Aerated protective sleeves and live plant warranty.
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#12281e]">
                    {cartShippingFee === 0 ? "FREE" : formatPrice(cartShippingFee)}
                  </span>
                </label>

                <label
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition ${
                    deliveryMethod === "express"
                      ? "border-[#2d6a4f] bg-[#f2f8f4] ring-1 ring-[#2d6a4f]"
                      : "border-[#e9e3da] bg-[#faf8f5] hover:border-[#b7e4c7]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "express"}
                      onChange={() => setDeliveryMethod("express")}
                      className="mt-1 accent-[#2d6a4f]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#12281e] block flex items-center gap-1.5">
                        <span>Express Priority + Thermal Heat Pack Armor</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#faeee9] text-[#c2613d]">
                          Recommended for Rare plants
                        </span>
                      </span>
                      <span className="text-[11px] text-[#657d70] mt-0.5 block">
                        Guaranteed 1–2 day flight delivery with 72-hour temperature regulator pack.
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#12281e]">$18.00</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Details */}
            <div className="space-y-4 p-6 rounded-2xl bg-white border border-[#e9e3da]">
              <h2 className="font-serif font-bold text-base text-[#12281e] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1b382b] text-[#d8f3dc] text-xs flex items-center justify-center">
                  4
                </span>
                <span>Payment Method</span>
              </h2>

              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-[#f4f0ea] pb-3">
                <button
                  type="button"
                  onClick={() => setPaymentTab("card")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    paymentTab === "card"
                      ? "bg-[#1b382b] text-white"
                      : "bg-[#faf8f5] text-[#526359]"
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab("apple")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    paymentTab === "apple"
                      ? "bg-[#1b382b] text-white"
                      : "bg-[#faf8f5] text-[#526359]"
                  }`}
                >
                  <span> Apple Pay</span>
                </button>
              </div>

              {paymentTab === "card" ? (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-[#12281e] block mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 absolute left-3 top-3 text-[#819488]" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#12281e] block mb-1">
                        Expires (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#12281e] block mb-1">
                        CVC Security Code
                      </label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#12281e] block mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2.5 text-xs text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#faf8f5] text-center text-xs text-[#526359]">
                  Using authenticated Apple Pay authorization for {email}.
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-[#faeee9] text-[#c2613d] text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-[#1b382b] hover:bg-[#244b3a] text-white font-semibold text-base shadow-lg transition active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Nurturing Order & Packing Plants...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-[#74c69d]" />
                  <span>Place Botanical Order • {formatPrice(finalTotal)}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Sidebar (5 cols): Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e9e3da] shadow-sm space-y-6 sticky top-28">
            <h2 className="font-serif font-bold text-lg text-[#12281e] pb-4 border-b border-[#e9e3da]">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h2>

            {/* Items List */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#f4f0ea]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1b382b] text-white text-[10px] font-bold flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-xs text-[#12281e] truncate">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#657d70] truncate">{item.size}</p>
                    <p className="text-[11px] text-[#a74e2d] truncate">{item.pot}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#12281e]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="pt-4 border-t border-[#f4f0ea]">
              {promo ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#e9f5ed] border border-[#b7e4c7] text-xs">
                  <div className="flex items-center gap-1.5 text-[#244b3a] font-medium">
                    <Tag className="w-3.5 h-3.5 text-[#2d6a4f]" />
                    <span>
                      Promo <strong>{promo.code}</strong> applied
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-xs text-[#c2613d] hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code (e.g. GREEN10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-[#faf8f5] border border-[#d8d2c7] rounded-xl px-3 py-2 text-xs uppercase text-[#12281e] focus:outline-hidden focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b382b] text-white text-xs font-semibold transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-[#c2613d] mt-1">{promoError}</p>
              )}
            </div>

            {/* Totals Breakdown */}
            <div className="pt-4 border-t border-[#f4f0ea] space-y-2 text-xs text-[#526359]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#12281e]">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2d6a4f]">
                  <span>Promo Discount ({promo?.code})</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Carbon-Neutral Delivery</span>
                <span className="font-medium text-[#12281e]">
                  {effectiveShipping === 0 ? "FREE" : formatPrice(effectiveShipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Botanical Sales Tax (7%)</span>
                <span className="font-medium text-[#12281e]">{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#12281e] pt-3 border-t border-[#e9e3da]">
                <span>Total Due</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Botanical Guarantee Reminder */}
            <div className="p-3.5 rounded-xl bg-[#f2f8f4] border border-[#d8f3dc] text-xs text-[#244b3a] space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2d6a4f]" />
                30-Day Plant Health Warranty
              </span>
              <p className="text-[11px] text-[#526359]">
                If your botanical suffers transit damage or doesn't adjust to your room, our master growers provide 100% free replacements or full refunds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
