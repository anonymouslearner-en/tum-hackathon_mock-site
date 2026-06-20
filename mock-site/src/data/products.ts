export type Category = "bikes" | "gear" | "accessories" | "lifestyle";

const BASE = "https://images.unsplash.com";
const Q = "?w=600&q=80&auto=format&fit=crop";

// fallback used for accessories/lifestyle without a dedicated shot
const FALLBACK = `${BASE}/photo-1535050804459-06db46aac01a${Q}`;

export function img(id: string) {
  return `${BASE}/${id}${Q}`;
}

export interface Product {
  id: number;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  badge?: string;
  image: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Fat Boy® 114",
    tagline: "Because size matters (your therapist disagrees)",
    description:
      "114 cubic inches of pure, unfiltered midlife crisis. Comes with enough chrome to blind your ex from 200 yards.",
    price: 21999,
    category: "bikes",
    badge: "Bestseller",
    image: img("photo-1586789217984-66aa1bbf8baf"),
    inStock: true,
  },
  {
    id: 2,
    name: "Street Glide® Special",
    tagline: "The GPS your dad will ignore anyway",
    description:
      "Loaded with tech your dad will turn off immediately before asking the gas station attendant for directions.",
    price: 28499,
    originalPrice: 30999,
    category: "bikes",
    badge: "On Sale",
    image: img("photo-1558980664-4d79c6e77b93"),
    inStock: true,
  },
  {
    id: 3,
    name: "Sportster® S",
    tagline: "For when you're too cool for a car and too broke for a Fat Boy",
    description:
      "The entry-level bike that'll make you feel like a rebel until you park next to an actual Fat Boy.",
    price: 14999,
    category: "bikes",
    image: img("photo-1558981420-bf351ce8e3ca"),
    inStock: true,
  },
  {
    id: 4,
    name: "Road King® Classic",
    tagline: "Manifest Destiny, but for people with bad knees",
    description:
      "Built for the long haul. Perfect for cross-country trips you'll plan every year and take every 7 years.",
    price: 24199,
    category: "bikes",
    image: img("photo-1557008874-dbafc2d2f3c2"),
    inStock: false,
  },
  {
    id: 5,
    name: "LiveWire® ONE",
    tagline: "Electric. Your uncle is already mad about it.",
    description:
      "Zero emissions, zero engine noise, and 100% of Sturgis side-eyeing you in the parking lot.",
    price: 22799,
    category: "bikes",
    badge: "Electric",
    image: img("photo-1558981408-db0ecd8a1ee4"),
    inStock: true,
  },
  {
    id: 6,
    name: "Screamin' Eagle Leather Jacket",
    tagline: "Finally, something to hang in the closet with pride",
    description:
      "Premium leather jacket for the person who rides twice a year but wants to look like they ride daily. Includes built-in swagger.",
    price: 649,
    category: "gear",
    badge: "Hot",
    image: img("photo-1625755814304-1e0865f4c003"),
    inStock: true,
  },
  {
    id: 7,
    name: "Full-Face Helmet",
    tagline: "Protect what's left of your common sense",
    description:
      "DOT & ECE certified. Comes in matte black so you can look brooding at red lights.",
    price: 389,
    originalPrice: 449,
    category: "gear",
    image: img("photo-1718941144539-1d90956a117d"),
    inStock: true,
  },
  {
    id: 8,
    name: "Riding Boots",
    tagline: "Walk into any room like you own it (you do not own it)",
    description:
      "Steel-toed, ankle-supported, and guaranteed to make store clerks assume you're someone important.",
    price: 219,
    category: "gear",
    image: img("photo-1625504397255-5003622cbd67"),
    inStock: true,
  },
  {
    id: 9,
    name: "Bar & Shield® Chrome Gas Cap",
    tagline: "The most expensive gas cap you'll ever not need",
    description:
      "A perfectly functional gas cap that does exactly what the $4 one does, but with significantly more chrome.",
    price: 89,
    category: "accessories",
    image: img("photo-1722059065741-3f887a54bb2a"),
    inStock: true,
  },
  {
    id: 10,
    name: "Saddlebag Speaker System",
    tagline: "Annoy entire highways with your playlist",
    description:
      "400 watts of Bluetooth audio so you can share your Eagles greatest hits with everyone within a 3-mile radius.",
    price: 899,
    category: "accessories",
    badge: "New",
    image: img("photo-1558975355-84703f540cf6"),
    inStock: true,
  },
  {
    id: 11,
    name: "Screamin' Eagle Air Cleaner",
    tagline: "+2 horsepower, +10 bragging rights",
    description:
      "Adds actual performance. The bragging rights add an additional 40 horsepower in the pub.",
    price: 349,
    category: "accessories",
    image: img("photo-1757262865418-7a2571bc2a36"),
    inStock: true,
  },
  {
    id: 12,
    name: "H-D® Coffee Mug",
    tagline: "Start your morning the way you'd start your Harley: loudly",
    description:
      "16oz ceramic mug. Because nothing pairs better with your 6am ride planning than a coffee you'll have instead of actually riding.",
    price: 24,
    category: "lifestyle",
    badge: "Fan Fav",
    image: FALLBACK,
    inStock: true,
  },
  {
    id: 13,
    name: "Bar & Shield Bandana",
    tagline: "For the face, not the bike robbery",
    description:
      "100% cotton. Multipurpose: dust filter, sweat rag, fashion statement, and plausible deniability.",
    price: 19,
    category: "lifestyle",
    image: img("photo-1751828091046-b98664f4a58b"),
    inStock: true,
  },
  {
    id: 14,
    name: "H-D® Baby Onesie",
    tagline: "Start the rebellion early",
    description:
      "Because your baby has no say in this matter. Soft cotton. Machine washable. Midlife crisis not included.",
    price: 29,
    category: "lifestyle",
    image: FALLBACK,
    inStock: true,
  },
  {
    id: 15,
    name: "Motor Oil (6-Pack)",
    tagline: "Not for drinking. We've had to say this before.",
    description:
      "Genuine H-D Formula+ Syn3 oil. Keep your engine happy so it can keep your insurance adjuster employed.",
    price: 64,
    originalPrice: 72,
    category: "accessories",
    image: img("photo-1535050804459-06db46aac01a"),
    inStock: true,
  },
];

export const categories: { value: Category | "all"; label: string; emoji: string }[] = [
  { value: "all", label: "All Products", emoji: "🏪" },
  { value: "bikes", label: "Motorcycles", emoji: "🏍️" },
  { value: "gear", label: "Riding Gear", emoji: "🧥" },
  { value: "accessories", label: "Accessories", emoji: "⚙️" },
  { value: "lifestyle", label: "Lifestyle", emoji: "☕" },
];
