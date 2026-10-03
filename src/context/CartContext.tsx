"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, PlantProduct } from "@/types";

interface PromoInfo {
  code: string;
  type: "percent" | "fixed";
  value: number; // 10 = 10% or 1500 = $15 off
  description: string;
}

const VALID_PROMOS: Record<string, PromoInfo> = {
  GREEN10: { code: "GREEN10", type: "percent", value: 10, description: "10% off botanical order" },
  PLANTLOVE: { code: "PLANTLOVE", type: "percent", value: 15, description: "15% off plant lovers welcome" },
  FREESHIP: { code: "FREESHIP", type: "fixed", value: 900, description: "Free standard shipping credit" },
  SPRINGBLOOM: { code: "SPRINGBLOOM", type: "fixed", value: 1500, description: "$15 off orders over $60" },
};

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: PlantProduct, size?: string, pot?: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  promo: PromoInfo | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  shippingFee: number;
  total: number;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  toast: string | null;
  setToast: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promo, setPromo] = useState<PromoInfo | null>(null);
  const [orderNotes, setOrderNotes] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("greenleafs_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedPromo = localStorage.getItem("greenleafs_promo");
      if (savedPromo) {
        setPromo(JSON.parse(savedPromo));
      }
      const savedNotes = localStorage.getItem("greenleafs_notes");
      if (savedNotes) {
        setOrderNotes(savedNotes);
      }
    } catch (e) {
      console.warn("Could not read cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("greenleafs_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not write cart to localStorage", e);
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (promo) {
        localStorage.setItem("greenleafs_promo", JSON.stringify(promo));
      } else {
        localStorage.removeItem("greenleafs_promo");
      }
    } catch (e) {
      console.warn("Could not write promo to localStorage", e);
    }
  }, [promo, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("greenleafs_notes", orderNotes);
    } catch (e) {
      console.warn("Could not write notes to localStorage", e);
    }
  }, [orderNotes, isLoaded]);

  // Toast timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (
    product: PlantProduct,
    size?: string,
    pot?: string,
    quantity = 1
  ) => {
    const selectedSize = size || product.sizes[0] || 'Standard';
    const selectedPot = pot || product.potOptions[0] || 'Nursery Pot';
    const itemId = `${product.id}-${selectedSize.replace(/\s+/g, "_")}-${selectedPot.replace(/\s+/g, "_")}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            botanicalName: product.botanicalName,
            price: product.price,
            image: product.images[0] || "/images/hero-greenleafs.jpg",
            size: selectedSize,
            pot: selectedPot,
            quantity,
            petSafe: product.petSafe,
          },
        ];
      }
    });

    setToast(`Added ${product.name} to your basket`);
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromo(null);
    setOrderNotes("");
    try {
      localStorage.removeItem("greenleafs_cart");
      localStorage.removeItem("greenleafs_promo");
      localStorage.removeItem("greenleafs_notes");
    } catch (e) {
      console.warn("Could not clear localStorage", e);
    }
  };

  const applyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    const matched = VALID_PROMOS[upper];
    if (matched) {
      setPromo(matched);
      setToast(`Promo code applied: ${matched.description}`);
      return { success: true, message: `Promo applied: ${matched.description}` };
    }
    return {
      success: false,
      message: "Invalid code. Try GREEN10 or PLANTLOVE for a discount!",
    };
  };

  const removePromo = () => {
    setPromo(null);
    setToast("Promo code removed");
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (promo) {
    if (promo.type === "percent") {
      discount = Math.round((subtotal * promo.value) / 100);
    } else if (promo.type === "fixed") {
      discount = Math.min(subtotal, promo.value);
    }
  }

  const freeShippingThreshold = 7500; // $75.00 in cents
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - (subtotal - discount));
  const shippingFee = cart.length === 0 ? 0 : amountUntilFreeShipping === 0 ? 0 : 900;
  const total = Math.max(0, subtotal - discount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
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
        toast,
        setToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
