import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/hooks/useCart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  onClose,
  items,
  subtotal,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const shipping = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.0875);
  const total = subtotal + shipping + tax;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-lg bg-(--color-hd-dark) border-l border-(--color-border) text-white p-0"
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-(--color-border)">
          <SheetTitle className="text-white font-black uppercase tracking-widest flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-(--color-hd-orange)" />
            Your Cart{" "}
            {items.length > 0 && (
              <span className="text-(--color-muted-foreground) font-normal text-sm">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <ShoppingCart className="w-16 h-16 text-(--color-border)" />
              <div>
                <p className="font-bold text-white">Your cart is empty.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Much like your garage. For now.
                </p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-none overflow-hidden shrink-0 bg-secondary">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white leading-tight truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-(--color-hd-orange) italic mt-0.5 line-clamp-1">
                    "{item.product.tagline}"
                  </p>
                  <p className="text-sm font-black text-white mt-1">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-end justify-between shrink-0">
                  <button
                    onClick={() => onRemove(item.product.id)}
                    className="text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-7 h-7 flex items-center justify-center border border-(--color-border) hover:border-(--color-hd-orange) text-white transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center border border-(--color-border) hover:border-(--color-hd-orange) text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-(--color-border) space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>
                  Shipping{" "}
                  {shipping === 0 && (
                    <span className="text-green-400 text-xs">(free!)</span>
                  )}
                </span>
                <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (8.75%)</span>
                <span>${tax.toLocaleString()}</span>
              </div>
              <Separator className="bg-(--color-border) my-2" />
              <div className="flex justify-between font-black text-white text-lg">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  Add ${(500 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}
            </div>

            <Button
              className="w-full rounded-none bg-(--color-hd-orange) hover:bg-(--color-hd-orange)/90 text-white font-black uppercase tracking-widest"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
            <p className="text-[10px] text-muted-foreground text-center">
              No real payments will be processed. Your credit card is safe. Your dignity is not.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
