import { NextRequest, NextResponse } from "next/server";
import { addReview, getReviewsForProduct } from "@/lib/products";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ success: false, error: "productId is required" }, { status: 400 });
    }

    const reviews = await getReviewsForProduct(productId);
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Error in GET /api/reviews:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, author, rating, title, comment, experienceLevel } = body;

    if (!productId || !author || !rating || !title || !comment) {
      return NextResponse.json(
        { success: false, error: "Missing required review fields" },
        { status: 400 }
      );
    }

    const parsedRating = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));

    const newReview = await addReview({
      productId,
      author: String(author).trim(),
      rating: parsedRating,
      title: String(title).trim(),
      comment: String(comment).trim(),
      experienceLevel: experienceLevel || "Plant Parent",
    });

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/reviews:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
