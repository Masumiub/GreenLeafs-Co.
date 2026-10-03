import React from "react";
import Link from "next/link";
import { Sun, Droplets, CloudSun, Scissors, ShieldAlert, Sparkles, ArrowRight, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Botanical Care Guides & Diagnostics | GreenLeafs & Co.",
  description:
    "Master horticulturist guides on indoor lighting, proper hydration physics, soil aeration, and seasonal houseplant care.",
};

export default function CareGuidePage() {
  const guides = [
    {
      icon: Sun,
      title: "Lighting & Window Orientation",
      subtitle: "Understanding Lux, Foot-Candles, and Sun Geometry",
      points: [
        "South-facing: Maximum bright direct sun. Ideal for Cacti, Succulents, and Bird of Paradise.",
        "East-facing: Gentle, cool morning sun. Perfect for Monstera, Ficus, and Philodendrons.",
        "West-facing: Warm afternoon rays. Requires slight set-back from glass panes.",
        "North-facing: Soft, diffused indirect light. Best for Snake Plants, ZZ Plants, and Cast Iron Plants.",
      ],
    },
    {
      icon: Droplets,
      title: "Hydration & Soil Physics",
      subtitle: "The 'Soak and Dry' method vs. scheduled watering",
      points: [
        "Always test moisture 2 inches down with your index finger before adding water.",
        "Yellow limp leaves often indicate chronic overwatering and root suffocation.",
        "Crispy brown leaf tips generally mean underwatering or low room humidity.",
        "Always ensure your pot has drainage holes so roots don't sit in stagnant water.",
      ],
    },
    {
      icon: CloudSun,
      title: "Atmospheric Humidity",
      subtitle: "Replicating tropical cloud forest environments",
      points: [
        "Most tropical plants thrive between 50% and 70% relative humidity.",
        "Cluster plants together to create a localized micro-climate of transpiration.",
        "Use pebble trays filled with water underneath saucers to elevate local moisture.",
        "Keep botanicals away from forced-air winter radiators and cooling AC vents.",
      ],
    },
    {
      icon: Scissors,
      title: "Seasonal Pruning & Propagation",
      subtitle: "Encouraging bushier foliage and multiplying your jungle",
      points: [
        "Prune yellowing outer leaves at the stem base using sterilized shears.",
        "Monstera & Pothos: cut below aerial nodes to root directly in clean glass water vessels.",
        "Wipe broad leaves once a month with a damp microfiber cloth to remove dust.",
        "Repot every 18–24 months into a vessel 2 inches larger in diameter.",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e9f5ed] text-[#2d6a4f] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Master Horticulturist Archives</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#12281e]">
          The Plant Lover’s Living Handbook
        </h1>
        <p className="text-sm sm:text-base text-[#657d70] leading-relaxed">
          Plants don’t follow clocks — they respond to light, temperature, and soil ecology. Here is your roadmap to thriving indoor greenery.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guides.map((guide, idx) => {
          const Icon = guide.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-[#e9e3da] shadow-sm space-y-5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#e9f5ed] flex items-center justify-center text-[#2d6a4f]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#12281e]">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-[#657d70]">{guide.subtitle}</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-[#3e5246] leading-relaxed border-t border-[#f4f0ea] pt-4">
                {guide.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Doctor Helpline Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#1b382b] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#74c69d]">
            <HeartHandshake className="w-4 h-4" />
            <span>Complimentary Plant Doctor Service</span>
          </div>
          <h3 className="font-serif text-2xl font-bold">
            Notice a wilting leaf or mystery pest?
          </h3>
          <p className="text-xs text-[#b7e4c7] leading-relaxed">
            Every GreenLeafs plant customer gets lifetime email consultations. Snap a photo of your leaf and root ball, and our nursery specialists will diagnose it within 24 hours.
          </p>
        </div>

        <Link
          href="/shop"
          className="px-6 py-3.5 rounded-full bg-[#c2613d] hover:bg-[#a74e2d] text-white font-semibold text-xs transition shadow-md shrink-0 flex items-center gap-2"
        >
          <span>Adopt a Plant with Confidence</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
