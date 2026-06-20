import { useState } from "react";
import { CheckCircle, Bike, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/hooks/useCart";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderPlaced: () => void;
}

type Step = "form" | "processing" | "success";

const FAKE_ORDER_ID = () =>
  "HD-" + Math.random().toString(36).substring(2, 8).toUpperCase();

export function CheckoutModal({
  open,
  onClose,
  items,
  total,
  onOrderPlaced,
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [orderId] = useState(FAKE_ORDER_ID);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  function handleField(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      onOrderPlaced();
    }, 2200);
  }

  function handleClose() {
    if (step === "processing") return;
    setStep("form");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="bg-(--color-hd-dark) border border-(--color-border) text-white max-w-lg rounded-none p-0 gap-0">
        {step === "form" && (
          <>
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-(--color-border)">
              <DialogTitle className="font-black uppercase tracking-widest text-white">
                Checkout{" "}
                <span className="text-(--color-hd-orange) text-sm font-normal normal-case tracking-normal">
                  (this is all fake, but fill it in anyway)
                </span>
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
              {/* Order summary */}
              <div className="bg-secondary rounded-none p-3 space-y-1.5 text-sm">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="text-muted-foreground truncate pr-2">
                      {item.product.name}{" "}
                      {item.quantity > 1 && (
                        <span className="text-xs">×{item.quantity}</span>
                      )}
                    </span>
                    <span className="text-white font-medium shrink-0">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <Separator className="bg-(--color-border) my-2" />
                <div className="flex justify-between font-black text-white">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Shipping */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-(--color-hd-orange)">
                  Shipping Info
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">Full Name</Label>
                    <Input
                      required
                      placeholder="Harley McRideface"
                      value={form.name}
                      onChange={(e) => handleField("name", e.target.value)}
                      className="rounded-none bg-secondary border-(--color-border) text-white placeholder:text-muted-foreground focus-visible:ring-(--color-hd-orange)"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <Input
                      required
                      type="email"
                      placeholder="midlifecrisis@example.com"
                      value={form.email}
                      onChange={(e) => handleField("email", e.target.value)}
                      className="rounded-none bg-secondary border-(--color-border) text-white placeholder:text-muted-foreground focus-visible:ring-(--color-hd-orange)"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">Address</Label>
                    <Input
                      required
                      placeholder="1 Biker Lane"
                      value={form.address}
                      onChange={(e) => handleField("address", e.target.value)}
                      className="rounded-none bg-secondary border-(--color-border) text-white placeholder:text-muted-foreground focus-visible:ring-(--color-hd-orange)"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">City</Label>
                    <Input
                      required
                      placeholder="Milwaukee, WI"
                      value={form.city}
                      onChange={(e) => handleField("city", e.target.value)}
                      className="rounded-none bg-secondary border-(--color-border) text-white placeholder:text-muted-foreground focus-visible:ring-(--color-hd-orange)"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-(--color-hd-orange)">
                  Payment (not real, promise)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">Card Number</Label>
                    <Input
                      required
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      value={form.card}
                      onChange={(e) =>
                        handleField(
                          "card",
                          e.target.value
                            .replace(/\D/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim()
                            .slice(0, 19)
                        )
                      }
                      className="rounded-none bg-secondary border-(--color-border) text-white placeholder:text-muted-foreground focus-visible:ring-(--color-hd-orange) font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Expiry</Label>
                    <Input
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={form.expiry}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "");
                        handleField("expiry", v.length > 2 ? v.slice(0, 2) + "/" + v.slice(2, 4) : v);
                      }}
                      className="rounded-none bg-secondary border-(--color-border) text-white placeholder:text-muted-foreground focus-visible:ring-(--color-hd-orange) font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">CVV</Label>
                    <Input
                      required
                      placeholder="•••"
                      maxLength={4}
                      type="password"
                      value={form.cvv}
                      onChange={(e) =>
                        handleField("cvv", e.target.value.replace(/\D/g, ""))
                      }
                      className="rounded-none bg-secondary border-(--color-border) text-white placeholder:text-muted-foreground focus-visible:ring-(--color-hd-orange) font-mono"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-none bg-(--color-hd-orange) hover:bg-(--color-hd-orange)/90 text-white font-black uppercase tracking-widest"
              >
                Place Order (fake)
              </Button>
            </form>
          </>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center gap-6 py-20 px-6 text-center">
            <Loader2 className="w-12 h-12 text-(--color-hd-orange) animate-spin" />
            <div>
              <p className="font-black text-white text-lg uppercase tracking-widest">
                Processing...
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Charging your (imaginary) card. Please hold.
              </p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center gap-6 py-16 px-8 text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-(--color-hd-orange)/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-(--color-hd-orange)" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-black text-white text-2xl uppercase tracking-tight">
                Order Confirmed!
              </p>
              <p className="text-muted-foreground font-mono text-sm">
                Order #{orderId}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mt-2">
                Your completely fictional order is on its way. Expect delivery
                somewhere between never and also never. But{" "}
                <em>emotionally</em>, it's already in your garage.
              </p>
            </div>
            <div className="bg-secondary border border-(--color-border) p-4 rounded-none w-full text-sm space-y-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-muted-foreground">
                  <span>{item.product.name} ×{item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <Separator className="bg-(--color-border) my-2" />
              <div className="flex justify-between font-black text-white">
                <span>Total charged (not really)</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-(--color-hd-orange) text-sm font-medium">
              <Bike className="w-4 h-4" />
              Ride free. Even if only in spirit.
            </div>
            <Button
              onClick={handleClose}
              variant="outline"
              className="rounded-none border-(--color-border) text-white hover:bg-(--color-muted) uppercase tracking-widest text-xs"
            >
              Back to Shop
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
