import { useState } from "react";
import { products, categories, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-1">
          Our Inventory
        </h2>
        <p className="text-[var(--color-muted-foreground)]">
          Carefully curated from our imaginary warehouse in Milwaukee.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={activeCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-none uppercase tracking-wider text-xs font-bold transition-all ${
              activeCategory === cat.value
                ? "bg-[var(--color-hd-orange)] hover:bg-[var(--color-hd-orange)]/90 text-white border-[var(--color-hd-orange)]"
                : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-hd-orange)] hover:text-[var(--color-hd-orange)]"
            }`}
          >
            {cat.emoji} {cat.label}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div
        id={activeCategory === "all" ? undefined : activeCategory}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-[var(--color-muted-foreground)]">
          <span className="text-5xl block mb-4">🏍️</span>
          No products found. Try a different category, or try owning a Harley.
        </div>
      )}
    </section>
  );
}
