import { pgTable, text, integer, boolean, timestamp, real, serial } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  botanicalName: text("botanical_name").notNull(),
  price: integer("price").notNull(), // in cents ($58.00 = 5800)
  compareAtPrice: integer("compare_at_price"), // cents
  category: text("category").notNull(), // 'indoor', 'rare', 'pet-safe', 'large', 'easy-care', 'planters'
  tags: text("tags").notNull().default("[]"), // JSON stringified array of tags
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  lightRequirement: text("light_requirement").notNull(), // 'low', 'indirect', 'bright', 'direct'
  waterFrequency: text("water_frequency").notNull(),
  humidity: text("humidity").notNull(),
  careLevel: text("care_level").notNull(), // 'beginner', 'intermediate', 'master'
  petSafe: boolean("pet_safe").notNull().default(false),
  sizes: text("sizes").notNull().default("[]"), // JSON array of available sizes
  potOptions: text("pot_options").notNull().default("[]"), // JSON array of pot finishes
  images: text("images").notNull().default("[]"), // JSON array of image URLs
  inStock: boolean("in_stock").notNull().default(true),
  stockCount: integer("stock_count").notNull().default(15),
  rating: real("rating").notNull().default(4.8),
  reviewCount: integer("review_count").notNull().default(12),
  featured: boolean("featured").notNull().default(false),
  badge: text("badge"), // 'Bestseller', 'Staff Pick', 'Rare Find', 'New', 'Sale'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: text("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  author: text("author").notNull(),
  rating: integer("rating").notNull(),
  title: text("title").notNull(),
  comment: text("comment").notNull(),
  verified: boolean("verified").notNull().default(true),
  experienceLevel: text("experience_level").notNull().default("Plant Parent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  shippingAddress: text("shipping_address").notNull(),
  shippingCity: text("shipping_city").notNull(),
  shippingPostalCode: text("shipping_postal_code").notNull(),
  shippingCountry: text("shipping_country").notNull().default("United States"),
  deliverySpeed: text("delivery_speed").notNull().default("standard"),
  subtotal: integer("subtotal").notNull(),
  discount: integer("discount").notNull().default(0),
  shippingFee: integer("shipping_fee").notNull().default(0),
  total: integer("total").notNull(),
  promoCode: text("promo_code"),
  status: text("status").notNull().default("processing"),
  orderNotes: text("order_notes"),
  items: text("items").notNull(), // JSON array of ordered items with pot, size, price, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
