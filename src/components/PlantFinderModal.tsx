"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Sparkles, Sun, Moon, PawPrint, Shield, ArrowRight, RotateCcw } from "lucide-react";
import { PlantProduct } from "@/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";

interface PlantFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: PlantProduct[];
}

export function PlantFinderModal({ isOpen, onClose, products }: PlantFinderModalProps) {
  const { addItem } = useCart();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    light: "", // 'low', 'indirect', 'bright'
    petSafe: "", // 'yes', 'no'
    care: "", // 'easy', 'hands-on', 'large'
  });

  if (!isOpen) return null;

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      setStep(4); // Results step
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ light: "", petSafe: "", care: "" });
  };

  // Find matches based on answers
  const matchedProducts = products.filter((p) => {
    if (answers.petSafe === "yes" && !p.petSafe) return false;
    if (answers.light === "low" && p.lightRequirement !== "low") return false;
    if (answers.light === "bright" && p.lightRequirement === "low") return false;
    if (answers.care === "easy" && p.careLevel !== "beginner") return false;
    if (answers.care === "large" && p.category !== "large") return false;
    return true;
  });

  // Fallbacks if strictly 0 matches
  const displayMatches = matchedProducts.length > 0 ? matchedProducts.slice(0, 3) : products.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#12281e]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#faf8f5] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#e9e3da] z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e9e3da]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1b382b] flex items-center justify-center text-[#74c69d]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#12281e]">
                GreenLeafs Plant Match Quiz
              </h3>
              <p className="text-xs text-[#657d70]">Step {Math.min(step, 3)} of 3</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#526359] hover:text-[#12281e] rounded-full hover:bg-[#f4f0ea]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question 1: Lighting */}
        {step === 1 && (
          <div className="py-6 space-y-4">
            <div className="text-center">
              <h4 className="font-serif text-xl font-bold text-[#12281e]">
                How much natural light does your space receive?
              </h4>
              <p className="text-xs text-[#657d70] mt-1">
                Choose the location where your botanical companion will live.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <button
                type="button"
                onClick={() => handleSelect("light", "low")}
                className="p-4 rounded-2xl bg-white border border-[#e9e3da] hover:border-[#2d6a4f] hover:bg-[#f2f8f4] text-left transition flex flex-col items-start gap-2 shadow-2xs group"
              >
                <div className="p-2.5 rounded-xl bg-[#e9f5ed] text-[#2d6a4f] group-hover:scale-105 transition">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-[#12281e]">Low / Shady</h5>
                  <p className="text-[11px] text-[#657d70] mt-0.5">
                    North-facing windows, offices, hallways with soft light
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelect("light", "indirect")}
                className="p-4 rounded-2xl bg-white border border-[#e9e3da] hover:border-[#2d6a4f] hover:bg-[#f2f8f4] text-left transition flex flex-col items-start gap-2 shadow-2xs group"
              >
                <div className="p-2.5 rounded-xl bg-[#faeee9] text-[#c2613d] group-hover:scale-105 transition">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-[#12281e]">Bright Indirect</h5>
                  <p className="text-[11px] text-[#657d70] mt-0.5">
                    Near bright sunny windows filtered through sheer drapes
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelect("light", "bright")}
                className="p-4 rounded-2xl bg-white border border-[#e9e3da] hover:border-[#2d6a4f] hover:bg-[#f2f8f4] text-left transition flex flex-col items-start gap-2 shadow-2xs group"
              >
                <div className="p-2.5 rounded-xl bg-[#fff3d4] text-[#b47a16] group-hover:scale-105 transition">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-[#12281e]">Direct Sun</h5>
                  <p className="text-[11px] text-[#657d70] mt-0.5">
                    South or west facing windows with sunny beams
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Question 2: Pets */}
        {step === 2 && (
          <div className="py-6 space-y-4">
            <div className="text-center">
              <h4 className="font-serif text-xl font-bold text-[#12281e]">
                Do you share your home with furry friends?
              </h4>
              <p className="text-xs text-[#657d70] mt-1">
                We take ASPCA non-toxic botanical safety seriously.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              <button
                type="button"
                onClick={() => handleSelect("petSafe", "yes")}
                className="p-4 rounded-2xl bg-white border border-[#e9e3da] hover:border-[#2d6a4f] hover:bg-[#f2f8f4] text-left transition flex flex-col items-start gap-2 shadow-2xs group"
              >
                <div className="p-2.5 rounded-xl bg-[#e9f5ed] text-[#2d6a4f] group-hover:scale-105 transition">
                  <PawPrint className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-[#12281e]">Yes, 100% Pet-Safe Only!</h5>
                  <p className="text-[11px] text-[#657d70] mt-0.5">
                    I have curious cats or dogs who occasionally nibble leaves
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelect("petSafe", "no")}
                className="p-4 rounded-2xl bg-white border border-[#e9e3da] hover:border-[#2d6a4f] hover:bg-[#f2f8f4] text-left transition flex flex-col items-start gap-2 shadow-2xs group"
              >
                <div className="p-2.5 rounded-xl bg-[#faeee9] text-[#c2613d] group-hover:scale-105 transition">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-[#12281e]">No Pets / Safe Shelves</h5>
                  <p className="text-[11px] text-[#657d70] mt-0.5">
                    No animals or my plants live high out of reach
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Question 3: Plant Care Style */}
        {step === 3 && (
          <div className="py-6 space-y-4">
            <div className="text-center">
              <h4 className="font-serif text-xl font-bold text-[#12281e]">
                What is your plant parenting philosophy?
              </h4>
              <p className="text-xs text-[#657d70] mt-1">
                Tell us how hands-on you want to be.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <button
                type="button"
                onClick={() => handleSelect("care", "easy")}
                className="p-4 rounded-2xl bg-white border border-[#e9e3da] hover:border-[#2d6a4f] hover:bg-[#f2f8f4] text-left transition flex flex-col items-start gap-2 shadow-2xs group"
              >
                <span className="text-2xl">🌵</span>
                <div>
                  <h5 className="font-bold text-sm text-[#12281e]">Set & Forget</h5>
                  <p className="text-[11px] text-[#657d70] mt-0.5">
                    I travel or forget waterings. Give me an indestructible survivor.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelect("care", "hands-on")}
                className="p-4 rounded-2xl bg-white border border-[#e9e3da] hover:border-[#2d6a4f] hover:bg-[#f2f8f4] text-left transition flex flex-col items-start gap-2 shadow-2xs group"
              >
                <span className="text-2xl">🌱</span>
                <div>
                  <h5 className="font-bold text-sm text-[#12281e]">Attentive Parent</h5>
                  <p className="text-[11px] text-[#657d70] mt-0.5">
                    I love misting, rotating, and caring for rare foliage.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelect("care", "large")}
                className="p-4 rounded-2xl bg-white border border-[#e9e3da] hover:border-[#2d6a4f] hover:bg-[#f2f8f4] text-left transition flex flex-col items-start gap-2 shadow-2xs group"
              >
                <span className="text-2xl">🌴</span>
                <div>
                  <h5 className="font-bold text-sm text-[#12281e]">Room Transformation</h5>
                  <p className="text-[11px] text-[#657d70] mt-0.5">
                    I want a soaring statement tree to define my room aesthetic.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {step === 4 && (
          <div className="py-4 space-y-4">
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#e9f5ed] text-[#2d6a4f] text-xs font-semibold mb-2">
                ✨ Curated Match
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#12281e]">
                Here are your ideal botanical matches!
              </h4>
              <p className="text-xs text-[#657d70] mt-1">
                Selected by our master nursery team based on your living conditions.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {displayMatches.map((match) => (
                <div
                  key={match.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#e9e3da] shadow-2xs"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#f4f0ea]">
                    <Image
                      src={match.images[0] || "/images/hero-greenleafs.jpg"}
                      alt={match.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif font-bold text-sm text-[#12281e] truncate">
                      {match.name}
                    </h5>
                    <p className="text-xs italic text-[#657d70] truncate">
                      {match.botanicalName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-[#2d6a4f]">
                        {formatPrice(match.price)}
                      </span>
                      {match.petSafe && (
                        <span className="text-[10px] text-[#2d6a4f] font-semibold bg-[#e9f5ed] px-1.5 py-0.5 rounded-sm">
                          Pet Safe
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <Link
                      href={`/products/${match.slug}`}
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-lg bg-[#f4f0ea] hover:bg-[#e9e3da] text-[#12281e] text-xs font-semibold text-center transition"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        addItem(match, match.sizes[0], match.potOptions[0], 1);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#1b382b] hover:bg-[#244b3a] text-white text-xs font-semibold transition"
                    >
                      Add to Basket
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#e9e3da]">
              <button
                type="button"
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 text-xs text-[#526359] hover:text-[#12281e] font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
              <Link
                href="/shop"
                onClick={onClose}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2d6a4f] hover:underline"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
