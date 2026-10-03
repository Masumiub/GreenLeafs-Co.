import { db } from "./index";
import { products, reviews } from "./schema";
import { SEED_PRODUCTS, SEED_REVIEWS_MAP } from "./seed-data";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  console.log("Starting database seed...");

  for (const item of SEED_PRODUCTS) {
    const existing = await db.select().from(products).where(eq(products.id, item.id)).limit(1);

    const productPayload = {
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
    };

    if (existing.length === 0) {
      await db.insert(products).values(productPayload);
      console.log(`Inserted product: ${item.name}`);
    } else {
      await db.update(products).set(productPayload).where(eq(products.id, item.id));
      console.log(`Updated product: ${item.name}`);
    }

    // Seed reviews
    const productReviews = SEED_REVIEWS_MAP[item.id] || [];
    for (const rev of productReviews) {
      const existingReviews = await db
        .select()
        .from(reviews)
        .where(eq(reviews.productId, item.id));

      const found = existingReviews.find((r) => r.author === rev.author && r.title === rev.title);
      if (!found) {
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
  }

  console.log("Database seed completed successfully.");
}

// Allow direct run
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seed script finished");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Seed script error:", err);
      process.exit(1);
    });
}
