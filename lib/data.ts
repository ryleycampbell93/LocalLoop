export type Listing = {
  id: string;
  type: "need" | "offer";
  title: string;
  description: string;
  location: string;
  category: string;
  user: string;
  rating: number;
  exchange: string;
  tags: string[];
};

export const listings: Listing[] = [
  {
    id: "garden-help",
    type: "need",
    title: "Garden clean-up this weekend",
    description: "Need help trimming hedges, pulling weeds and clearing green waste. About 3 hours.",
    location: "Newcastle, NSW",
    category: "Home & Garden",
    user: "Maya Chen",
    rating: 4.9,
    exchange: "Can offer bookkeeping, resume help or two cooked family meals.",
    tags: ["gardening", "weekend", "outdoors"],
  },
  {
    id: "website-refresh",
    type: "offer",
    title: "I can refresh a small business website",
    description: "Landing page polish, copy tidy-up and mobile responsiveness for a simple existing site.",
    location: "Sydney, NSW",
    category: "Digital",
    user: "Riley Morgan",
    rating: 5.0,
    exchange: "Looking for carpentry, car detailing or photography in exchange.",
    tags: ["web", "design", "small business"],
  },
  {
    id: "move-couch",
    type: "need",
    title: "Need a hand moving a couch",
    description: "One couch from a ground-floor unit to a trailer. Should take less than an hour.",
    location: "Lake Macquarie, NSW",
    category: "Moving",
    user: "Tom Bennett",
    rating: 4.7,
    exchange: "Can offer guitar lessons or basic bike servicing.",
    tags: ["moving", "quick job", "lifting"],
  },
  {
    id: "portrait-photos",
    type: "offer",
    title: "Portrait photography session",
    description: "Outdoor portrait session with 12 edited photos delivered digitally.",
    location: "Central Coast, NSW",
    category: "Creative",
    user: "Aisha Patel",
    rating: 4.8,
    exchange: "Seeking garden work, pet sitting or help painting a room.",
    tags: ["photography", "portraits", "creative"],
  },
];
