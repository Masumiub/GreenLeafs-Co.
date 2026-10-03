import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, getReviewsForProduct, getAllProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Botanical Not Found | GreenLeafs & Co.",
    };
  }

  return {
    title: `${product.name} (${product.botanicalName}) | GreenLeafs & Co.`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [reviews, allProducts] = await Promise.all([
    getReviewsForProduct(product.id),
    getAllProducts(),
  ]);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      initialReviews={reviews}
      relatedProducts={relatedProducts}
    />
  );
}
