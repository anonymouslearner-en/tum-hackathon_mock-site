import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-hd-black)] border-b border-[var(--color-border)]">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #ff6600 0, #ff6600 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-hd-orange)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 text-center">
        <div className="inline-flex items-center gap-2 bg-[var(--color-hd-orange)]/10 border border-[var(--color-hd-orange)]/30 rounded-full px-4 py-1.5 text-sm text-[var(--color-hd-orange)] mb-8 font-medium">
          <Flame className="w-4 h-4" />
          Summer Sale: Save up to $2,000 on selected bikes (terms apply, patience required)
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6">
          Live to{" "}
          <span className="text-[var(--color-hd-orange)]">Ride</span>
          <br />
          <span className="text-3xl md:text-5xl text-[var(--color-hd-silver)] font-light tracking-widest">
            (or at least look like you do)
          </span>
        </h1>

        <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
          Welcome to the finest mock Harley-Davidson experience on the internet.
          No actual bikes were harmed in the making of this shop. Your credit
          card, however, is another story.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-[var(--color-hd-orange)] hover:bg-[var(--color-hd-orange)]/90 text-white font-bold px-8 rounded-none uppercase tracking-widest text-sm"
          >
            Shop Bikes
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[var(--color-border)] text-white hover:bg-[var(--color-muted)] rounded-none uppercase tracking-widest text-sm"
          >
            Browse Gear
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "0", label: "Real Bikes in Stock" },
            { value: "∞", label: "Dreams Sold" },
            { value: "100%", label: "Vibes" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-[var(--color-hd-orange)]">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--color-muted-foreground)] mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
