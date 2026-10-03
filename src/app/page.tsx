import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Leaf,
  Heart,
  Sun,
  Star,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const allProducts = await getAllProducts();

  const featuredProducts = allProducts.filter((p) => p.featured).slice(0, 4);
  const bestsellers = allProducts.slice(0, 8);

  const collections = [
    {
      title: "Rare & Variegated",
      description: "Exotic cultivars with rare chimeric foliage and pink or snowy marbling.",
      href: "/shop?category=rare",
      image: "/images/pink-princess.jpg",
      badge: "Collector's Corner",
    },
    {
      title: "Statement Trees",
      description: "Towering 4–7ft architectural trees that anchor living rooms and lofts.",
      href: "/shop?category=large",
      image: "/images/bird-of-paradise.jpg",
      badge: "Architectural",
    },
    {
      title: "Pet-Safe Sanctuary",
      description: "100% ASPCA non-toxic botanicals safe for inquisitive cats and dogs.",
      href: "/shop?petSafe=true",
      image: "https://images.pexels.com/photos/7335935/pexels-photo-7335935.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      badge: "Pet Friendly",
    },
    {
      title: "Handcrafted Planters",
      description: "Wheel-thrown ceramic pots, stoneware drainage saucers & brass misters.",
      href: "/shop?category=planters",
      image: "/images/ceramic-planters.jpg",
      badge: "Studio Goods",
    },
  ];

  const testimonials = [
    {
      name: "Camille Laurent",
      location: "San Francisco, CA",
      quote:
        "My Monstera arrived in zero-waste packaging that kept the soil pristine and not a single leaflet creased. Within 3 weeks it already pushed out two new split leaves!",
      plant: "Monstera Deliciosa",
      stars: 5,
      avatar: "https://images.pexels.com/photos/16853190/pexels-photo-16853190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Marcus Thorne",
      location: "Austin, TX",
      quote:
        "The Fiddle Leaf Fig is hands-down the healthiest indoor tree I've ever received. The heavy fluted sandstone pot feels like a piece from a high-end design showroom.",
      plant: "Fiddle Leaf Fig Tree",
      stars: 5,
      avatar: "https://images.pexels.com/photos/6208083/pexels-photo-6208083.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    },
    {
      name: "Dr. Alistair Finch",
      location: "Seattle, WA",
      quote:
        "Finding true non-toxic botanicals for a home with three playful rescue cats was always a headache. GreenLeafs&Co pet-safe curation made styling our home effortless.",
      plant: "Calathea Orbifolia",
      stars: 5,
      avatar: "https://images.pexels.com/photos/5942622/pexels-photo-5942622.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1b382b] text-white">
        <div className="absolute inset-0 z-0 opacity-45 mix-blend-overlay">
          <Image
            src="/images/hero-greenleafs.jpg"
            alt="Botanical living sanctuary"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#244b3a]/90 text-[#b7e4c7] text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-6 border border-[#74c69d]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#74c69d]" />
              <span>Nursery Grown Botanical Purveyors</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              Living sculptures for conscious sanctuaries.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#d8f3dc]/90 font-light leading-relaxed max-w-xl">
              Nurtured by master horticulturists in climate-balanced glasshouses, potted in wheel-thrown stoneware, and delivered to your doorstep with our unconditional 30-day health guarantee.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 rounded-full bg-[#c2613d] hover:bg-[#a74e2d] text-white font-semibold text-sm transition shadow-lg flex items-center gap-2 active:scale-98"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop?category=rare"
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md transition border border-white/20"
              >
                Rare & Variegated
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-xs sm:text-sm">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#b7e4c7]">
                  100%
                </span>
                <span className="text-[#a8cbba] text-xs">Peat-Free Potting</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#b7e4c7]">
                  30 Days
                </span>
                <span className="text-[#a8cbba] text-xs">Health Guarantee</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#b7e4c7]">
                  48,000+
                </span>
                <span className="text-[#a8cbba] text-xs">Plants Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#e9e3da] grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e9f5ed] flex items-center justify-center text-[#2d6a4f] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#12281e]">30-Day Guarantee</h4>
              <p className="text-xs text-[#657d70] mt-0.5">
                Full refund or replacement if your plant falters within 30 days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#faeee9] flex items-center justify-center text-[#c2613d] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#12281e]">Thermal Transit Armor</h4>
              <p className="text-xs text-[#657d70] mt-0.5">
                Engineered recycled inserts with heat packs in winter & cool vents in summer.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e9f5ed] flex items-center justify-center text-[#2d6a4f] shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#12281e]">Nursery Raised Direct</h4>
              <p className="text-xs text-[#657d70] mt-0.5">
                No warehouse middleman. Grown under master botanists with clean root systems.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#faeee9] flex items-center justify-center text-[#c2613d] shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#12281e]">Lifetime Care Advice</h4>
              <p className="text-xs text-[#657d70] mt-0.5">
                Email our master growers with photos anytime for bespoke plant doctoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#c2613d]">
              Curated Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281e] mt-1">
              Find your botanical sanctuary.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2d6a4f] hover:text-[#1b382b] mt-3 md:mt-0"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative rounded-3xl overflow-hidden aspect-4/5 bg-[#1b382b] flex flex-col justify-end p-6 border border-[#e9e3da] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12281e] via-[#12281e]/40 to-transparent" />

              <div className="relative z-10">
                <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white mb-2">
                  {col.badge}
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#b7e4c7] transition">
                  {col.title}
                </h3>
                <p className="text-xs text-[#d8f3dc]/80 mt-1 line-clamp-2">
                  {col.description}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Bestsellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#2d6a4f]">
              Most Beloved
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281e] mt-1">
              Bestsellers this season.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2d6a4f] hover:text-[#1b382b] mt-3 md:mt-0"
          >
            <span>View All ({allProducts.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Split Banner: The GreenLeafs Difference */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f2f8f4] border border-[#d8f3dc] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#2d6a4f]">
              Artisanal Horticulture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281e] leading-snug">
              Every plant is hand-selected and nurtured to full botanical vitality.
            </h2>
            <p className="text-sm text-[#486354] leading-relaxed">
              Unlike industrial retail chains where plants sit under fluorescent tubes and neglected shelves, every GreenLeafs botanical grows in our climate-balanced glasshouse nurseries. Before shipment, each specimen undergoes a 4-point health audit: root check, foliage hydration, pest-screen, and custom organic feeding.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#12281e]">Peat-Free Organic Soil</h4>
                  <p className="text-xs text-[#657d70]">Sustainable coco coir, perlite & worm castings.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#12281e]">Custom Pot Matching</h4>
                  <p className="text-xs text-[#657d70]">Designer stoneware pots glazed by master potters.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1b382b] hover:bg-[#244b3a] text-white text-xs font-semibold transition shadow-sm"
              >
                <span>Shop Healthy Botanicals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-80 sm:h-96 lg:h-full min-h-[400px] lg:col-span-5">
            <Image
              src="/images/hero-greenleafs.jpg"
              alt="GreenLeafs master nursery greenhouse"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Customer Plant Stories / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#c2613d]">
            Sanctuary Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12281e] mt-1">
            Loved by plant parents everywhere.
          </h2>
          <p className="text-xs sm:text-sm text-[#657d70] mt-2">
            Real homes, real verified plant lovers, and vibrant botanical growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e9e3da] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#d97757] mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#26372d] italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#f4f0ea] flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#e9f5ed]">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#12281e] flex items-center gap-1">
                    <span>{t.name}</span>
                    <span className="text-[10px] text-[#2d6a4f] bg-[#e9f5ed] px-1.5 py-0.2 rounded-full font-semibold">
                      Verified
                    </span>
                  </h4>
                  <p className="text-[11px] text-[#708477]">{t.location}</p>
                  <p className="text-[11px] font-serif text-[#2d6a4f] mt-0.5">
                    Parent to: {t.plant}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
