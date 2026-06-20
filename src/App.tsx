import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { useCart } from "@/hooks/useCart";

export default function App() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const shipping = cart.subtotal > 500 ? 0 : 49;
  const tax = Math.round(cart.subtotal * 0.0875);
  const total = cart.subtotal + shipping + tax;

  function handleCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  function handleOrderPlaced() {
    cart.clearCart();
  }

  return (
    <div className="min-h-screen bg-(--color-background) text-(--color-foreground)">
      <Header
        cartCount={cart.totalItems}
        onCartOpen={() => setCartOpen(true)}
      />
      <main>
        <Hero />
        <ProductGrid onAddToCart={cart.addItem} />
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart.items}
        total={total}
        onOrderPlaced={handleOrderPlaced}
      />
    </div>
  );
}
