"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle, X } from "lucide-react";

export function ToastNotification() {
  const { toast, setToast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1b382b] text-white shadow-xl border border-[#2d6a4f]/50 max-w-sm">
        <CheckCircle className="w-5 h-5 text-[#74c69d] shrink-0" />
        <p className="text-xs font-medium text-[#d8f3dc] flex-1">{toast}</p>
        <button
          type="button"
          onClick={() => setToast(null)}
          className="text-[#74c69d] hover:text-white transition p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
