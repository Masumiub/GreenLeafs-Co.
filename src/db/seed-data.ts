export interface SeedProduct {
  id: string;
  slug: string;
  name: string;
  botanicalName: string;
  price: number;
  compareAtPrice?: number;
  category: "indoor" | "rare" | "pet-safe" | "large" | "easy-care" | "planters";
  tags: string[];
  shortDescription: string;
  description: string;
  lightRequirement: "low" | "indirect" | "bright" | "direct";
  waterFrequency: string;
  humidity: string;
  careLevel: "beginner" | "intermediate" | "master";
  petSafe: boolean;
  sizes: string[];
  potOptions: string[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  badge?: string;
}

export interface SeedReview {
  author: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  experienceLevel: string;
}

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    id: "monstera-deliciosa",
    slug: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    botanicalName: "Monstera deliciosa",
    price: 6400,
    compareAtPrice: 7500,
    category: "indoor",
    tags: ["bestseller", "statement", "tropical", "climbing"],
    shortDescription: "Iconic split leaves and dramatic tropical silhouette. The quintessential master botanical statement for any living space.",
    description: "Monstera Deliciosa, often celebrated as the Swiss Cheese Plant, is beloved for its magnificent fenestrated foliage that develops perforated cutouts as it matures. Naturally thriving in the sheltered understory of tropical rainforests, this forgiving and vibrant botanical brings rich lushness and an architectural presence to your sanctuary. Each specimen is hand-selected from our artisanal nursery, pest-screened, and packed in sustainable aerated root wraps.",
    lightRequirement: "indirect",
    waterFrequency: "Every 1–2 weeks, allowing the top 2 inches of soil to dry out",
    humidity: "Prefers 50-70% humidity; mist twice weekly or place on a pebble tray",
    careLevel: "beginner",
    petSafe: false,
    sizes: ["Medium (6\" Nursery Pot)", "Large (8\" Grower Pot)", "Extra Large (10\" Specimen)"],
    potOptions: ["Raw Terracotta Saucer", "Matte Sandstone Glaze", "Charcoal Fluted Ceramic", "Nursery Grower Pot"],
    images: [
      "https://images.pexels.com/photos/4894424/pexels-photo-4894424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/8259264/pexels-photo-8259264.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/18207316/pexels-photo-18207316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/34454855/pexels-photo-34454855.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewCount: 42,
    featured: true,
    badge: "Bestseller"
  },
  {
    id: "fiddle-leaf-fig",
    slug: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig Tree",
    botanicalName: "Ficus lyrata",
    price: 11800,
    compareAtPrice: 13500,
    category: "large",
    tags: ["statement", "tree", "architectural", "high-ceiling"],
    shortDescription: "Dramatic violin-shaped emerald leaves on a structural trunk. The ultimate luxury indoor statement tree.",
    description: "The Fiddle Leaf Fig is the crown jewel of interior design. Characterized by its broad, glossy scalloped leaves that resemble the curves of a violin, this West African native demands bright, gentle filtered light and steady watering. Grown in temperature-controlled glasshouses, each tree exhibits strong trunk development and balanced crown symmetry.",
    lightRequirement: "bright",
    waterFrequency: "Every 7–10 days when the top 2-3 inches feel dry",
    humidity: "Moderate to high humidity; keep away from heating drafts",
    careLevel: "intermediate",
    petSafe: false,
    sizes: ["Standard 3–4 ft (8\" Pot)", "Tall 5–6 ft Specimen (10\" Pot)", "Grand 6–7 ft Statement (12\" Pot)"],
    potOptions: ["Matte Sandstone Glaze", "Charcoal Fluted Ceramic", "Handwoven Seagrass Basket", "Nursery Grower Pot"],
    images: [
      "https://images.pexels.com/photos/6894213/pexels-photo-6894213.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/27221639/pexels-photo-27221639.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/36783435/pexels-photo-36783435.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    inStock: true,
    stockCount: 5,
    rating: 4.8,
    reviewCount: 29,
    featured: true,
    badge: "Staff Pick"
  },
  {
    id: "pink-princess-philodendron",
    slug: "pink-princess-philodendron",
    name: "Pink Princess Philodendron",
    botanicalName: "Philodendron erubescens 'Pink Princess'",
    price: 8900,
    compareAtPrice: 11000,
    category: "rare",
    tags: ["rare", "variegated", "collector", "pink"],
    shortDescription: "Rare collector's jewel showcasing deep burgundy leaves kissed with splashes of bubblegum pink.",
    description: "One of the most sought-after botanicals in the world, the Pink Princess Philodendron boasts dramatic foliage ranging from glossy dark jade and burgundy to vivid bubblegum pink sectors and marbled brushstrokes. Because variegation is unstable in tissue culture, our specimens are selectively propagated from mature, highly-pigmented mother plants to guarantee rich contrast.",
    lightRequirement: "indirect",
    waterFrequency: "Water thoroughly when the top 50% of the potting medium is dry",
    humidity: "High humidity (>60%) encourages rapid unfurling of vibrant pink leaves",
    careLevel: "intermediate",
    petSafe: false,
    sizes: ["Young Collector (4\" Pot)", "Established Beauty (6\" Pot)"],
    potOptions: ["Matte Sandstone Glaze", "Raw Terracotta Saucer", "Charcoal Fluted Ceramic"],
    images: [
      "/images/pink-princess.jpg",
      "https://images.pexels.com/photos/8858104/pexels-photo-8858104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/7335935/pexels-photo-7335935.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ],
    inStock: true,
    stockCount: 4,
    rating: 5.0,
    reviewCount: 19,
    featured: true,
    badge: "Rare Find"
  },
  {
    id: "bird-of-paradise",
    slug: "bird-of-paradise",
    name: "White Bird of Paradise",
    botanicalName: "Strelitzia nicolai",
    price: 12800,
    category: "large",
    tags: ["large", "tropical", "sculptural", "bestseller"],
    shortDescription: "Sweeping banana-shaped paddle leaves that evoke sun-drenched coastal pavilions and breezy botanical gardens.",
    description: "The White Bird of Paradise is celebrated worldwide for its dramatic, arching foliage and statuesque growth. In nature, wind creates intentional natural splits along the leaf veins to protect the plant — a hallmark of genuine tropical authenticity. It loves basking near sunny south or west windows and rewards your home with towering emerald presence.",
    lightRequirement: "bright",
    waterFrequency: "Keep soil consistently moist during growth; water weekly in spring/summer",
    humidity: "Adapts to average room humidity; enjoys occasional leaf showers",
    careLevel: "beginner",
    petSafe: false,
    sizes: ["Medium 3–4 ft (8\" Pot)", "Tall 5 ft (10\" Pot)", "Floor-to-Ceiling 6–7 ft (12\" Pot)"],
    potOptions: ["Matte Sandstone Glaze", "Raw Terracotta Saucer", "Handwoven Seagrass Basket"],
    images: [
      "/images/bird-of-paradise.jpg",
      "https://images.pexels.com/photos/8068650/pexels-photo-8068650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/6508425/pexels-photo-6508425.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
    ],
    inStock: true,
    stockCount: 6,
    rating: 4.9,
    reviewCount: 34,
    featured: true,
    badge: "Bestseller"
  },
  {
    id: "snake-plant-laurentii",
    slug: "snake-plant-laurentii",
    name: "Snake Plant Laurentii",
    botanicalName: "Sansevieria trifasciata 'Laurentii'",
    price: 4800,
    category: "easy-care",
    tags: ["indestructible", "low-light", "air-purifying", "bedroom"],
    shortDescription: "Sword-like upright leaves bordered in bright gold. Practically indestructible and naturally air-purifying.",
    description: "Ideal for plant parents with busy schedules or low-light apartments, the Snake Plant Laurentii is revered for its resilient demeanor. Its architectural, erect blade-like foliage boasts mottled deep green bands framed by electric yellow margins. A NASA clean-air study standout, it quietly produces oxygen and filters impurities even through the night.",
    lightRequirement: "low",
    waterFrequency: "Every 2–4 weeks; drought-tolerant and prefers being slightly dry",
    humidity: "Any humidity level; tolerates dry winter heating with ease",
    careLevel: "beginner",
    petSafe: false,
    sizes: ["Tabletop (4\" Pot)", "Standard (6\" Pot)", "Architectural (8\" Pot)"],
    potOptions: ["Charcoal Fluted Ceramic", "Matte Sandstone Glaze", "Raw Terracotta Saucer", "Nursery Grower Pot"],
    images: [
      "https://images.pexels.com/photos/6208083/pexels-photo-6208083.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/37542276/pexels-photo-37542276.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 56,
    featured: false,
    badge: "Easy Care"
  },
  {
    id: "calathea-orbifolia",
    slug: "calathea-orbifolia",
    name: "Calathea Orbifolia",
    botanicalName: "Goeppertia orbifolia",
    price: 5400,
    compareAtPrice: 6200,
    category: "pet-safe",
    tags: ["pet-safe", "patterned", "prayer-plant", "designer"],
    shortDescription: "Broad silvery-green leaves patterned with fine metallic brushstrokes. 100% non-toxic to cats and dogs.",
    description: "Calathea Orbifolia is celebrated for its oversized, rounded foliage adorned with delicate silver-striped brush marks. In true prayer-plant fashion, its leaves gently rise in the evening like hands folded in gratitude and spread wide to catch morning light. Completely pet-safe and non-toxic, it brings serene elegance to any pet-loving home.",
    lightRequirement: "indirect",
    waterFrequency: "Keep evenly moist with filtered or rainwater; water when top inch is dry",
    humidity: "Enjoys high humidity (60%+); loves a humidifier or warm bathroom light",
    careLevel: "intermediate",
    petSafe: true,
    sizes: ["Desktop (6\" Pot)", "Lush Full (8\" Pot)"],
    potOptions: ["Matte Sandstone Glaze", "Raw Terracotta Saucer", "Charcoal Fluted Ceramic"],
    images: [
      "https://images.pexels.com/photos/7335935/pexels-photo-7335935.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/8858104/pexels-photo-8858104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ],
    inStock: true,
    stockCount: 9,
    rating: 4.7,
    reviewCount: 22,
    featured: true,
    badge: "Pet Friendly"
  },
  {
    id: "golden-pothos",
    slug: "golden-pothos",
    name: "Golden Pothos Trailing Vine",
    botanicalName: "Epipremnum aureum",
    price: 3600,
    category: "easy-care",
    tags: ["trailing", "easy-care", "vine", "bookshelf"],
    shortDescription: "Cascading vines of heart-shaped marbled gold and emerald leaves. Perfect for hanging planters and bookshelf edges.",
    description: "The Golden Pothos is the ultimate companion for plant lovers of every skill level. Cascading gracefully over shelves, mantels, or macrame hangers, its heart-shaped leaves glow with splashes of creamy chartreuse. It thrives under minimal fuss and is known as one of the fastest growing indoor vines.",
    lightRequirement: "low",
    waterFrequency: "Every 7–10 days when the top inch or two of soil is dry",
    humidity: "Tolerates standard household humidity and dry conditions",
    careLevel: "beginner",
    petSafe: false,
    sizes: ["Hanging Basket (6\" Pot)", "Specimen Vine (8\" Pot)"],
    potOptions: ["Raw Terracotta Saucer", "Matte Sandstone Glaze", "Charcoal Fluted Ceramic", "Nursery Grower Pot"],
    images: [
      "https://images.pexels.com/photos/4894423/pexels-photo-4894423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/16799768/pexels-photo-16799768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ],
    inStock: true,
    stockCount: 21,
    rating: 4.9,
    reviewCount: 68,
    featured: false,
    badge: "Fast Grower"
  },
  {
    id: "peperomia-watermelon",
    slug: "peperomia-watermelon",
    name: "Watermelon Peperomia",
    botanicalName: "Peperomia argyreia",
    price: 4200,
    category: "pet-safe",
    tags: ["pet-safe", "compact", "cute", "desktop"],
    shortDescription: "Charming teardrop foliage boasting iconic silver and deep green watermelon stripes on crimson stems.",
    description: "With leaves that look delightfully like mini watermelon rinds, Peperomia argyreia is a perennial favorite for desks, coffee tables, and plant stands. Thick, semi-succulent leaves retain moisture well and stay compact. 100% ASPCA certified pet-friendly, making it completely harmless to curious kittens and puppies.",
    lightRequirement: "indirect",
    waterFrequency: "Every 1–2 weeks, allowing soil to dry halfway down between waterings",
    humidity: "Standard room humidity is great; avoid waterlogged soil",
    careLevel: "beginner",
    petSafe: true,
    sizes: ["Petite (4\" Pot)", "Standard (6\" Pot)"],
    potOptions: ["Raw Terracotta Saucer", "Matte Sandstone Glaze", "Charcoal Fluted Ceramic"],
    images: [
      "https://images.pexels.com/photos/32513154/pexels-photo-32513154.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/4299171/pexels-photo-4299171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ],
    inStock: true,
    stockCount: 14,
    rating: 4.8,
    reviewCount: 31,
    featured: false,
    badge: "Pet Friendly"
  },
  {
    id: "zz-plant",
    slug: "zz-plant",
    name: "ZZ Plant 'Raven & Emerald'",
    botanicalName: "Zamioculcas zamiifolia",
    price: 5200,
    category: "easy-care",
    tags: ["low-light", "indestructible", "glossy", "dorm-friendly"],
    shortDescription: "Ultra-glossy feathered stems that store water in underground rhizomes. Thrives even in windowless corners.",
    description: "If you have a shaded entryway, office cubicle, or low-light bedroom, the ZZ Plant is your botanical champion. Its glossy, feather-like stems reflect light and retain water like a cactus. Forgiving of missed waterings and neglect, it remains lush green without fading.",
    lightRequirement: "low",
    waterFrequency: "Once every 3–4 weeks; allows soil to completely dry out",
    humidity: "Adapts to low and average room humidity",
    careLevel: "beginner",
    petSafe: false,
    sizes: ["Compact (4\" Pot)", "Standard (6\" Pot)", "Mature (8\" Pot)"],
    potOptions: ["Charcoal Fluted Ceramic", "Matte Sandstone Glaze", "Raw Terracotta Saucer", "Nursery Grower Pot"],
    images: [
      "https://images.pexels.com/photos/4186045/pexels-photo-4186045.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/8581366/pexels-photo-8581366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 37,
    featured: true,
    badge: "Low Light Hero"
  },
  {
    id: "artisanal-planter-brass-set",
    slug: "artisanal-planter-brass-set",
    name: "Handcrafted Ceramic Planter & Brass Mister",
    botanicalName: "GreenLeafs Studio Goods",
    price: 4600,
    category: "planters",
    tags: ["planter", "accessories", "brass", "gift"],
    shortDescription: "Wheel-thrown fluted ceramic planter with drainage tray plus our precision solid brass botanical mister.",
    description: "Elevate your indoor jungle aesthetic with this curated plant care pairing. Includes a hand-finished fluted stoneware ceramic pot with matching catchment saucer and drainage hole, plus a solid brushed brass continuous fine-mist sprayer. Packaged in an embossed gift box, ready for holiday gifting or home indulgence.",
    lightRequirement: "indirect",
    waterFrequency: "N/A — Hand-wash pot and wipe brass with soft microfiber cloth",
    humidity: "Rust-resistant brass finish and high-fire glazed stoneware",
    careLevel: "beginner",
    petSafe: true,
    sizes: ["6\" Stoneware Pot + 300ml Brass Mister", "8\" Stoneware Pot + 300ml Brass Mister"],
    potOptions: ["Warm Terracotta", "Matte Sandstone Cream", "Forest Olive Glaze"],
    images: [
      "/images/ceramic-planters.jpg",
      "https://images.pexels.com/photos/3101767/pexels-photo-3101767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ],
    inStock: true,
    stockCount: 15,
    rating: 5.0,
    reviewCount: 28,
    featured: true,
    badge: "Gift Set"
  },
  {
    id: "haworthia-succulent-trio",
    slug: "haworthia-succulent-trio",
    name: "Zebra Haworthia Succulent Trio",
    botanicalName: "Haworthiopsis fasciata",
    price: 3800,
    category: "pet-safe",
    tags: ["pet-safe", "succulent", "windowsill", "drought-tolerant"],
    shortDescription: "Trio of sculptural rosette succulents with raised chalk-white pearled stripes. Completely pet-safe.",
    description: "A delightful set of three distinct Haworthia succulents planted in matching miniature terracotta vessels with decorative river stones. Native to South Africa, these sun-worshipping architectural succulents are non-toxic to dogs and cats, require very little water, and fit perfectly on sunny windowsills.",
    lightRequirement: "direct",
    waterFrequency: "Every 2–3 weeks; soak thoroughly then allow bone dry soil",
    humidity: "Low humidity; excels in dry, sunny rooms",
    careLevel: "beginner",
    petSafe: true,
    sizes: ["Trio of 3.5\" Terracotta Pots"],
    potOptions: ["Mini Terracotta Pots with Saucers"],
    images: [
      "https://images.pexels.com/photos/4299171/pexels-photo-4299171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/20324601/pexels-photo-20324601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ],
    inStock: true,
    stockCount: 16,
    rating: 4.8,
    reviewCount: 24,
    featured: false,
    badge: "Pet Friendly"
  },
  {
    id: "monstera-albo-borsigiana",
    slug: "monstera-albo-borsigiana",
    name: "Variegated Monstera Albo",
    botanicalName: "Monstera deliciosa var. borsigiana albo",
    price: 16500,
    compareAtPrice: 19500,
    category: "rare",
    tags: ["rare", "variegated", "collector", "albo"],
    shortDescription: "The holy grail of houseplant collectors. High-contrast pure white sectoral half-moons and marbling.",
    description: "Regarded as the pinnacle of botanical curation, our Monstera Albo Borsigiana specimens showcase breathtaking sectoral variegation, with snowy half-moon leaves, constellation specks, and jade green marbling. Cultivated under monitored nursery conditions with strong root networks, every cutting is shipped with a live transit temperature guarantee.",
    lightRequirement: "indirect",
    waterFrequency: "Water when the top 2-3 inches are dry; avoid overwatering white sectors",
    humidity: "High humidity (65%+) keeps white leaf sections lush and pristine",
    careLevel: "master",
    petSafe: false,
    sizes: ["Collector Starter (4\" Pot, 3-4 Leaves)", "Established Mid-Size (6\" Pot, 5-7 Fenestrated Leaves)"],
    potOptions: ["Matte Sandstone Glaze", "Raw Terracotta Saucer", "Charcoal Fluted Ceramic"],
    images: [
      "https://images.pexels.com/photos/15378704/pexels-photo-15378704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/37936133/pexels-photo-37936133.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ],
    inStock: true,
    stockCount: 3,
    rating: 5.0,
    reviewCount: 14,
    featured: true,
    badge: "Rare Find"
  }
];

export const SEED_REVIEWS_MAP: Record<string, SeedReview[]> = {
  "monstera-deliciosa": [
    {
      author: "Elena Rostova",
      rating: 5,
      title: "Arrived in flawless condition — 2 new leaves already!",
      comment: "I was skeptical about ordering such a large plant online, but GreenLeafs&Co packing is unmatched. The packaging kept every stem safe, the soil was still nicely moist, and within 3 weeks it already unfurled two gorgeous fenestrated leaves. Couldn't be happier!",
      verified: true,
      experienceLevel: "Plant Parent (3+ years)"
    },
    {
      author: "Marcus Chen",
      rating: 5,
      title: "The ceramic pot is heavy and gorgeous",
      comment: "Got the Matte Sandstone Glaze pot with mine. The pot alone feels like a $60 designer piece. The Monstera has transformed my living room into a serene sanctuary.",
      verified: true,
      experienceLevel: "Casual Plant Lover"
    },
    {
      author: "Chloe Davenport",
      rating: 5,
      title: "Huge, lush, and healthy",
      comment: "I went with the 8-inch grower pot. It is much fuller than the ones at local big box nurseries. You can clearly tell this was grown by master horticulturists.",
      verified: true,
      experienceLevel: "Botanical Enthusiast"
    }
  ],
  "fiddle-leaf-fig": [
    {
      author: "David Vance",
      rating: 5,
      title: "Five stars for the packaging alone",
      comment: "A 5-foot tree shipped across the country without dropping a single leaf. The wooden support stake was secure, and the care instructions provided gave me total confidence.",
      verified: true,
      experienceLevel: "Plant Parent"
    },
    {
      author: "Samantha Bell",
      rating: 4,
      title: "Magnificent architectural presence",
      comment: "Took about two weeks to acclimate to my loft's lighting, but now it is pushing out new glossy leaves at the top crown. Follow their watering card closely!",
      verified: true,
      experienceLevel: "Experienced Collector"
    }
  ],
  "pink-princess-philodendron": [
    {
      author: "Aria Montgomery",
      rating: 5,
      title: "Unreal pink variegation!",
      comment: "I was worried it might only have tiny pink specks, but mine came with a complete half-moon bubblegum pink leaf! Absolute showstopper for my plant shelf.",
      verified: true,
      experienceLevel: "Aroid Collector"
    },
    {
      author: "Julian Sterling",
      rating: 5,
      title: "Healthy roots and vibrant color",
      comment: "Inspected the root ball upon arrival: thick, clean white roots. Worth every single penny. Already thinking about my next GreenLeafs purchase.",
      verified: true,
      experienceLevel: "Master Gardener"
    }
  ],
  "bird-of-paradise": [
    {
      author: "Harrison Wells",
      rating: 5,
      title: "Brings instant tropical resort vibes",
      comment: "Placed this next to our floor-to-ceiling glass patio door. The sheer scale and rich green leaves make the entire room feel like a botanical resort.",
      verified: true,
      experienceLevel: "Casual Plant Lover"
    }
  ],
  "calathea-orbifolia": [
    {
      author: "Maya Lin",
      rating: 5,
      title: "Pet safe and mesmerizing patterns",
      comment: "With two mischievous cats, having non-toxic plants is non-negotiable. My cats sniffed it and walked away, and the silver stripes on the leaves look like hand-painted artwork.",
      verified: true,
      experienceLevel: "Pet & Plant Mom"
    }
  ]
};
