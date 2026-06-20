import { ShoppingCart, Bike, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-hd-black)]/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-[var(--color-hd-orange)] rounded-full p-2">
            <Bike className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-widest text-white uppercase">
              H-D<span className="text-[var(--color-hd-orange)]">™</span>
            </span>
            <p className="text-[10px] text-[var(--color-muted-foreground)] tracking-widest uppercase -mt-1">
              Mock Shop • Est. 2024
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--color-muted-foreground)]">
          <a href="#bikes" className="hover:text-[var(--color-hd-orange)] transition-colors font-medium">
            Motorcycles
          </a>
          <a href="#gear" className="hover:text-[var(--color-hd-orange)] transition-colors font-medium">
            Gear
          </a>
          <a href="#accessories" className="hover:text-[var(--color-hd-orange)] transition-colors font-medium">
            Accessories
          </a>
          <a href="#lifestyle" className="hover:text-[var(--color-hd-orange)] transition-colors font-medium">
            Lifestyle
          </a>
        </nav>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={onCartOpen}
            className="relative border-(--color-border) text-white hover:bg-(--color-hd-orange) hover:border-(--color-hd-orange) hover:text-white"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-[var(--color-hd-orange)] text-white border-0">
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-[var(--color-muted)]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] px-4 py-3 flex flex-col gap-3 text-sm">
          {["Motorcycles", "Gear", "Accessories", "Lifestyle"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-hd-orange)] font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
