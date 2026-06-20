import { Bike, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-hd-black)] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[var(--color-hd-orange)] rounded-full p-2">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black tracking-widest text-white uppercase">
                H-D™ Mock Shop
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              America's #1 pretend motorcycle shop. We sell dreams, nostalgia,
              and an alarming amount of chrome-plated regret.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-hd-orange)] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
              {[
                "About Us (We're made up)",
                "Returns (Good luck)",
                "Warranty (Ha)",
                "Find a Dealer (There isn't one)",
                "Contact Support (Please don't)",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-[var(--color-hd-orange)] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-hd-orange)] mb-4">
              Legal Stuff
            </h4>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              This is a mock/demo shop. No real transactions occur. Harley-Davidson®,
              H-D™, and all related marks are trademarks of Harley-Davidson, Inc.
              We are not affiliated with them in any way. Please don't sue us.
              We're just fans. 🙏
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-muted-foreground)]">
          <span>© 2024 H-D™ Mock Shop. All rights reserved (none of them).</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[var(--color-hd-orange)] fill-current" /> and questionable decision-making
          </span>
        </div>
      </div>
    </footer>
  );
}
