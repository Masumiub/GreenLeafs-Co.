import React from "react";
import CheckoutClient from "./CheckoutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | GreenLeafs & Co.",
  description: "Secure, climate-neutral checkout for botanical plant lovers.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
