import { db } from "@/db";
import { products, reviews, orders } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { PlantProduct, ReviewItem, OrderRecord } from "@/types";
import { SEED_PRODUCTS, SEED_REVIEWS_MAP } from "@/db/seed-data";

export { formatPrice } from "./format";

// Ensure database is seeded with initial items
export async function ensureDatabaseSeeded(): Promise<void> {
  try {
    const existing = await db.select().from(products).limit(1);
    if (existing.length > 0) return;

    console.log("Seeding initial products into database...");
    for (const item of SEED_PRODUCTS) {
      await db.insert(products).values({
        id: item.id,
        slug: item.slug,
        name: item.name,
        botanicalName: item.botanicalName,
        price: item.price,
        compareAtPrice: item.compareAtPrice ?? null,
        category: item.category,
        tags: JSON.stringify(item.tags),
        shortDescription: item.shortDescription,
        description: item.description,
        lightRequirement: item.lightRequirement,
        waterFrequency: item.waterFrequency,
        humidity: item.humidity,
        careLevel: item.careLevel,
        petSafe: item.petSafe,
        sizes: JSON.stringify(item.sizes),
        potOptions: JSON.stringify(item.potOptions),
        images: JSON.stringify(item.images),
        inStock: item.inStock,
        stockCount: item.stockCount,
        rating: item.rating,
        reviewCount: item.reviewCount,
        featured: item.featured,
        badge: item.badge ?? null,
      });

      const revList = SEED_REVIEWS_MAP[item.id] || [];
      for (const rev of revList) {
        await db.insert(reviews).values({
          productId: item.id,
          author: rev.author,
          rating: rev.rating,
          title: rev.title,
          comment: rev.comment,
          verified: rev.verified,
          experienceLevel: rev.experienceLevel,
        });
      }
    }
    console.log("Auto-seeding complete!");
  } catch (error) {
    console.error("Error in ensureDatabaseSeeded:", error);
  }
}

export function transformDbProduct(row: typeof products.$inferSelect): PlantProduct {
  let tags: string[] = [];
  let sizes: string[] = [];
  let potOptions: string[] = [];
  let images: string[] = [];

  try {
    tags = JSON.parse(row.tags || "[]");
  } catch {
    tags = [];
  }
  try {
    sizes = JSON.parse(row.sizes || "[]");
  } catch {
    sizes = [];
  }
  try {
    potOptions = JSON.parse(row.potOptions || "[]");
  } catch {
    potOptions = [];
  }
  try {
    images = JSON.parse(row.images || "[]");
  } catch {
    images = [];
  }

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    botanicalName: row.botanicalName,
    price: row.price,
    compareAtPrice: row.compareAtPrice,
    category: row.category,
    tags,
    shortDescription: row.shortDescription,
    description: row.description,
    lightRequirement: row.lightRequirement,
    waterFrequency: row.waterFrequency,
    humidity: row.humidity,
    careLevel: row.careLevel,
    petSafe: row.petSafe,
    sizes,
    potOptions,
    images,
    inStock: row.inStock,
    stockCount: row.stockCount,
    rating: row.rating,
    reviewCount: row.reviewCount,
    featured: row.featured,
    badge: row.badge,
  };
}

export async function getAllProducts(): Promise<PlantProduct[]> {
  await ensureDatabaseSeeded();
  try {
    const rows = await db.select().from(products).orderBy(desc(products.featured), desc(products.createdAt));
    return rows.map(transformDbProduct);
  } catch (err) {
    console.error("Error fetching all products:", err);
    // Fallback to static seed data if DB table has not migrated yet
    return SEED_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<PlantProduct | null> {
  await ensureDatabaseSeeded();
  try {
    const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    if (rows.length === 0) {
      const fallback = SEED_PRODUCTS.find((p) => p.slug === slug);
      return fallback || null;
    }
    return transformDbProduct(rows[0]);
  } catch (err) {
    console.error("Error fetching product by slug:", err);
    const fallback = SEED_PRODUCTS.find((p) => p.slug === slug);
    return fallback || null;
  }
}

export async function getReviewsForProduct(productId: string): Promise<ReviewItem[]> {
  await ensureDatabaseSeeded();
  try {
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt));

    return rows.map((r) => ({
      id: r.id,
      productId: r.productId,
      author: r.author,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      verified: r.verified,
      experienceLevel: r.experienceLevel,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("Error fetching reviews:", err);
    const fallbackList = SEED_REVIEWS_MAP[productId] || [];
    return fallbackList.map((r, idx) => ({
      id: idx + 1,
      productId,
      author: r.author,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      verified: r.verified,
      experienceLevel: r.experienceLevel,
      createdAt: new Date().toISOString(),
    }));
  }
}

export async function addReview(data: {
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  experienceLevel?: string;
}): Promise<ReviewItem> {
  const [created] = await db
    .insert(reviews)
    .values({
      productId: data.productId,
      author: data.author,
      rating: data.rating,
      title: data.title,
      comment: data.comment,
      verified: true,
      experienceLevel: data.experienceLevel || "Plant Parent",
    })
    .returning();

  // Recalculate average rating & review count for the product
  const allReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, data.productId));

  const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = Number((totalRating / allReviews.length).toFixed(1));

  await db
    .update(products)
    .set({
      rating: avgRating,
      reviewCount: allReviews.length,
    })
    .where(eq(products.id, data.productId));

  return {
    id: created.id,
    productId: created.productId,
    author: created.author,
    rating: created.rating,
    title: created.title,
    comment: created.comment,
    verified: created.verified,
    experienceLevel: created.experienceLevel,
    createdAt: created.createdAt.toISOString(),
  };
}

export async function createOrderInDb(orderData: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry?: string;
  deliverySpeed?: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  promoCode?: string;
  orderNotes?: string;
  items: unknown[];
}): Promise<OrderRecord> {
  const id = `GL-${Math.floor(100000 + Math.random() * 900000)}`;

  const [row] = await db
    .insert(orders)
    .values({
      id,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone || null,
      shippingAddress: orderData.shippingAddress,
      shippingCity: orderData.shippingCity,
      shippingPostalCode: orderData.shippingPostalCode,
      shippingCountry: orderData.shippingCountry || "United States",
      deliverySpeed: orderData.deliverySpeed || "standard",
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      shippingFee: orderData.shippingFee,
      total: orderData.total,
      promoCode: orderData.promoCode || null,
      orderNotes: orderData.orderNotes || null,
      status: "processing",
      items: JSON.stringify(orderData.items),
    })
    .returning();

  return {
    id: row.id,
    customerName: row.customerName,
    customerEmail: row.customerEmail,
    customerPhone: row.customerPhone,
    shippingAddress: row.shippingAddress,
    shippingCity: row.shippingCity,
    shippingPostalCode: row.shippingPostalCode,
    shippingCountry: row.shippingCountry,
    deliverySpeed: row.deliverySpeed,
    subtotal: row.subtotal,
    discount: row.discount,
    shippingFee: row.shippingFee,
    total: row.total,
    promoCode: row.promoCode,
    status: row.status,
    orderNotes: row.orderNotes,
    items: JSON.parse(row.items),
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getOrderById(orderId: string): Promise<OrderRecord | null> {
  const [row] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!row) return null;

  return {
    id: row.id,
    customerName: row.customerName,
    customerEmail: row.customerEmail,
    customerPhone: row.customerPhone,
    shippingAddress: row.shippingAddress,
    shippingCity: row.shippingCity,
    shippingPostalCode: row.shippingPostalCode,
    shippingCountry: row.shippingCountry,
    deliverySpeed: row.deliverySpeed,
    subtotal: row.subtotal,
    discount: row.discount,
    shippingFee: row.shippingFee,
    total: row.total,
    promoCode: row.promoCode,
    status: row.status,
    orderNotes: row.orderNotes,
    items: JSON.parse(row.items),
    createdAt: row.createdAt.toISOString(),
  };
}
