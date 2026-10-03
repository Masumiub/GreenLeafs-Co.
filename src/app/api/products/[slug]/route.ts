import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug, getReviewsForProduct } from "@/lib/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const reviews = await getReviewsForProduct(product.id);

    return NextResponse.json({
      success: true,
      product,
      reviews,
    });
  } catch (error) {
    console.error("Error in GET /api/products/[slug]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
