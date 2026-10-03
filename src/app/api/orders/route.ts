import { NextRequest, NextResponse } from "next/server";
import { createOrderInDb, getOrderById } from "@/lib/products";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get("id");

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Order id is required" }, { status: 400 });
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error in GET /api/orders:", error);
    return NextResponse.json({ success: false, error: "Failed to retrieve order" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingPostalCode,
      shippingCountry,
      deliverySpeed,
      subtotal,
      discount,
      shippingFee,
      total,
      promoCode,
      orderNotes,
      items,
    } = body;

    if (!customerName || !customerEmail || !shippingAddress || !shippingCity || !shippingPostalCode || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Incomplete order details or empty cart" },
        { status: 400 }
      );
    }

    const newOrder = await createOrderInDb({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingPostalCode,
      shippingCountry: shippingCountry || "United States",
      deliverySpeed: deliverySpeed || "standard",
      subtotal: parseInt(subtotal, 10) || 0,
      discount: parseInt(discount, 10) || 0,
      shippingFee: parseInt(shippingFee, 10) || 0,
      total: parseInt(total, 10) || 0,
      promoCode: promoCode || undefined,
      orderNotes: orderNotes || undefined,
      items,
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to place order" },
      { status: 500 }
    );
  }
}
