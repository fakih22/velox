"use client";

import { ShopProvider } from "../src/context/ShopContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ShopProvider>{children}</ShopProvider>;
}
