import React from "react";
import OrderLookupClient from "./OrderLookupClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | GreenLeafs & Co.",
  description: "Track greenhouse preparation, packaging, and delivery updates for your living plants.",
};

export default function OrderLookupPage() {
  return <OrderLookupClient />;
}
