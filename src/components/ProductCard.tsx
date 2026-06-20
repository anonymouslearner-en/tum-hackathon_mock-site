import { useState } from "react";
import { ShoppingCart, Package, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : null;

  return (
    <Card className="bg-(--color-card) border-(--color-border) hover:border-(--color-hd-orange)/50 transition-all duration-300 hover:shadow-lg hover:shadow-(--color-hd-orange)/5 group flex flex-col rounded-none">
      <CardHeader className="p-0">
        <div className="relative bg-secondary h-48 overflow-hidden">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ImageOff className="w-10 h-10" />
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-(--color-hd-orange) text-white border-0 text-xs font-bold uppercase tracking-wider rounded-none">
              {product.badge}
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Package className="w-4 h-4" />
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col gap-2">
        <div>
          <h3 className="font-black text-white text-lg leading-tight">
            {product.name}
          </h3>
          <p className="text-(--color-hd-orange) text-sm italic mt-1 leading-snug">
            "{product.tagline}"
          </p>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mt-auto">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {savings && (
            <span className="text-xs text-green-400 font-medium">
              Save ${savings.toLocaleString()}
            </span>
          )}
        </div>
        <Button
          size="sm"
          disabled={!product.inStock}
          onClick={() => onAddToCart(product)}
          className="rounded-none bg-(--color-hd-orange) hover:bg-(--color-hd-orange)/90 text-white font-bold uppercase tracking-wider text-xs shrink-0 disabled:opacity-40"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
