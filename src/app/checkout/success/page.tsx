import React from "react";
import { getOrderById } from "@/lib/products";
import SuccessClient from "./SuccessClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrderRecord } from "@/types";

export const metadata = {
  title: "Order Confirmed | GreenLeafs & Co.",
  description: "Your botanical order has been confirmed and registered with our nursery.",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  let order: OrderRecord | null = null;
  if (orderId) {
    order = await getOrderById(orderId);
  }

  // Fallback if accessed without orderId or direct link demo
  if (!order) {
    const demoOrder: OrderRecord = {
      id: orderId || "GL-842918",
      customerName: "Elena Rostova",
      customerEmail: "elena@example.com",
      customerPhone: "(555) 392-1084",
      shippingAddress: "742 Evergreen Terrace, Suite 4B",
      shippingCity: "Portland, OR",
      shippingPostalCode: "97201",
      shippingCountry: "United States",
      deliverySpeed: "standard",
      subtotal: 6400,
      discount: 640,
      shippingFee: 0,
      total: 5760,
      promoCode: "GREEN10",
      status: "processing",
      items: [
        {
          productId: "monstera-deliciosa",
          name: "Monstera Deliciosa",
          image: "https://images.pexels.com/photos/4894424/pexels-photo-4894424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          size: "Medium (6\" Nursery Pot)",
          pot: "Matte Sandstone Glaze",
          quantity: 1,
          price: 6400,
        },
      ],
      createdAt: new Date().toISOString(),
    };
    return <SuccessClient order={demoOrder} />;
  }

  return <SuccessClient order={order} />;
}
