"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf, Mail, ShieldCheck, Heart, Sparkles, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#12281e] text-[#d8f3dc] pt-16 pb-12 border-t border-[#1b382b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-[#1b382b]/80 border border-[#244b3a] rounded-3xl p-8 sm:p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-[#74c69d]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#244b3a] text-[#74c69d] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The GreenLeafs Guild</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Get 10% off your first botanical companion
              </h3>
              <p className="text-sm text-[#b7e4c7] mt-2 max-w-lg leading-relaxed">
                Join our community of plant parents. Receive curated watering schedules, seasonal repotting tips, and early access to rare botanical drops.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-4 rounded-2xl bg-[#244b3a] text-white border border-[#74c69d]/40">
                  <Check className="w-5 h-5 text-[#74c69d]" />
                  <div>
                    <p className="font-semibold text-sm">Welcome to the Guild!</p>
                    <p className="text-xs text-[#b7e4c7]">Use promo code <strong>GREEN10</strong> at checkout for 10% off.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#74c69d]" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#12281e] border border-[#2d6a4f] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#74c69d]/60 focus:outline-hidden focus:ring-2 focus:ring-[#74c69d]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#c2613d] hover:bg-[#a74e2d] text-white text-sm font-semibold transition shadow-sm active:scale-98"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-[#244b3a]">
          {/* Brand Col */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-full bg-[#244b3a] flex items-center justify-center text-[#74c69d]">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                GreenLeafs<span className="text-[#d97757] font-sans">&</span>Co.
              </span>
            </Link>
            <p className="text-sm text-[#95b8a3] max-w-sm leading-relaxed mb-4">
              Purveyors of sustainably grown, architectural houseplants, rare variegated specimens, and handcrafted ceramic stoneware for botanical sanctuaries.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#b7e4c7]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#74c69d]" />
                30-Day Plant Health Guarantee
              </span>
            </div>
          </div>

          {/* Plant Collections */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#b7e4c7] mb-3">
              Collections
            </h4>
            <ul className="space-y-2 text-sm text-[#95b8a3]">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  All Indoor Botanicals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=rare" className="hover:text-white transition">
                  Rare & Variegated
                </Link>
              </li>
              <li>
                <Link href="/shop?petSafe=true" className="hover:text-white transition">
                  Pet-Safe Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?category=large" className="hover:text-white transition">
                  Statement Trees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=easy-care" className="hover:text-white transition">
                  Low Light & Easy Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Plant Care & Support */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#b7e4c7] mb-3">
              Plant Care
            </h4>
            <ul className="space-y-2 text-sm text-[#95b8a3]">
              <li>
                <Link href="/care-guide" className="hover:text-white transition">
                  Care Guides & Diagnostics
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition">
                  Track Your Delivery
                </Link>
              </li>
              <li>
                <span className="text-[#95b8a3]">Winter Heat Pack Transit</span>
              </li>
              <li>
                <span className="text-[#95b8a3]">30-Day Health Warranty</span>
              </li>
              <li>
                <span className="text-[#95b8a3]">Repotting Masterclasses</span>
              </li>
            </ul>
          </div>

          {/* Our Promise */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#b7e4c7] mb-3">
              Ethos
            </h4>
            <ul className="space-y-2 text-sm text-[#95b8a3]">
              <li className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#74c69d]" />
                <span>100% Peat-Free Soil</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#74c69d]" />
                <span>Carbon-Neutral Transit</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#c2613d]" />
                <span>Nursery Grown with Care</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#708d7c]">
          <p>© {new Date().getFullYear()} GreenLeafs&Co. All rights reserved. Handcrafted for plant lovers.</p>
          <div className="flex items-center gap-4">
            <span>Climate Neutral Certified</span>
            <span>•</span>
            <span>Non-Toxic Packaging</span>
            <span>•</span>
            <span>Master Growers Guild</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
