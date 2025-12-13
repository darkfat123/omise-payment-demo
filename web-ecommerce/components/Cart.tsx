"use client";

import { useState } from "react";
import FloatingCart from "@/components/FloatingCart";
import MiniCartDrawer from "@/components/MiniCartDrawer";

export default function CartUI() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingCart onOpen={() => setOpen(true)} />
      <MiniCartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}