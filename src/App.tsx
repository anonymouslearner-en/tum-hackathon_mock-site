import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import type { Product } from "@/data/products";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart(_product: Product) {
    setCartCount((c) => c + 1);
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header cartCount={cartCount} />
      <main>
        <Hero />
        <ProductGrid onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </div>
  );
}
