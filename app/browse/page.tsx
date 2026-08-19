"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Listing = {
  id: string;
  type?: "need" | "offer";
  title: string;
  person: string;
  town: string;
  distance: number;
  category: string;
  offers: string;
  wants: string;
  route?: string;
  from?: string;
  to?: string;
  photos?: string[];
  demo?: boolean;
};

const demoListings: Listing[] = [
  {
    id: "kids-clothes-bombala",
    type: "offer",
    title: "Kids clothes bundle",
    person: "Jess",
    town: "Bombala",
    distance: 2,
    category: "Family & Kids",
    offers:
      "A bundle of good kids clothes that have been grown out of and are ready for another family.",
    wants:
      "Other kids clothes, toys, books, school gear, or something useful for the family. Open to other offers.",
    demo: true,
  },
  {
    id: "dog-minding-cooma",
    type: "need",
    title: "Dog minding this weekend",
    person: "Sarah",
    town: "Cooma",
    distance: 5,
    category: "Pets",
    offers:
      "Can return the favour with dog sitting, baking, cleaning help, garden help, or another useful swap.",
    wants:
      "Someone reliable to look after my dog for a few hours this weekend.",
    demo: true,
  },
  {
    id: "birthday-cake-bombala",
    type: "offer",
    title: "Birthday cake baking",
    person: "Megan",
    town: "Bombala",
    distance: 3,
    category: "Food & Produce",
    offers:
      "Can make a simple birthday cake or cupcakes for a local family.",
    wants:
      "Garden help, kids items, family photos, fresh produce, or another useful offer.",
    demo: true,
  },
  {
    id: "hair-event-jindabyne",
    type: "offer",
    title: "Hair styling for an event",
    person: "Sophie",
    town: "Jindabyne",
    distance: 60,
    category: "Beauty & Personal",
    offers:
      "Can help with basic hair styling for a party, wedding, dinner or other event.",
    wants:
      "Babysitting, photography, cleaning help, produce, dog minding, or another swap.",
    demo: true,
  },
  {
    id: "baby-gear-merimbula",
    type: "offer",
    title: "Baby gear bundle",
    person: "Kate",
    town: "Merimbula",
    distance: 108,
    category: "Family & Kids",
    offers:
      "High chair, baby bath and a few baby items that are no longer being used.",
    wants:
      "Toddler toys, kids clothes, books, household items, or another useful offer.",
    demo: true,
  },
  {
    id: "school-pickup-cooma",
    type: "offer",
    title: "Occasional school pickup help",
    person: "Emily",
    town: "Cooma",
    distance: 4,
    category: "Family & Kids",
    offers:
      "Can occasionally help with a school pickup when already doing the same run.",
    wants:
      "Dog sitting, baking, garden help, babysitting help, or another local favour.",
    demo: true,
  },
  {
    id: "click-and-collect-coast",
    type: "offer",
    title: "Click & Collect pickup",
    person: "Dan",
    town: "Cooma",
    distance: 110,
    category: "Pickups & Errands",
    offers:
      "Heading from the coast toward Cooma and can collect a prepaid Click & Collect order.",
    wants:
      "Fresh eggs, mechanical help, trailer use, household items, or another useful favour.",
    from: "Merimbula",
    to: "Cooma",
    photos: ["/0051362F-9E69-4362-AF78-586CC1593CF6.png"],
    demo: true,
  },
  {
    id: "firewood-cooma",
    type: "offer",
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
    distance: 6,
    category: "Home & Garden",
    offers:
      "Can deliver a ute load of firewood around Cooma and nearby areas.",
    wants:
      "Small carpentry work, welding help, mower servicing, produce, or another useful offer.",
    photos: ["/firewood-delivery.png.jpg"],
    demo: true,
  },
  {
    id: "fencing-bombala",
    type: "need",
    title: "Need a hand with fencing",
    person: "Tom",
    town: "Bombala",
    distance: 84,
    category: "Trades & Farm",
    offers:
      "Can trade livestock-yard cleanup, firewood, general farm help, transport help, or another useful favour.",
    wants:
      "Someone experienced to help repair and tension a section of fencing.",
    demo: true,
  },
  {
    id: "trailer-transport-jindabyne",
    type: "offer",
    title: "Trailer transport help",
    person: "Sarah",
    town: "Jindabyne",
    distance: 61,
    category: "Transport",
    offers:
      "Can help move a mower, furniture or other suitable items with a trailer.",
    wants:
      "Garden cleanup, painting help, computer assistance, household items, or another offer.",
    from: "Jindabyne",
    to: "Cooma",
    demo: true,
  },
  {
    id: "household-swap-cooma",
    type: "offer",
    title: "Homewares and decor swap",
    person: "Laura",
    town: "Cooma",
    distance: 7,
    category: "Home & Garden",
    offers:
      "A few homewares, cushions, decor items and kitchen bits that are no longer needed.",
    wants:
      "Plants, storage baskets, kids items, books, pet help, or another useful swap.",
    demo: true,
  },
  {
    id: "garden-help-bombala",
    type: "need",
    title: "Need help tidying the garden",
    person: "Amy",
    town: "Bombala",
    distance: 5,
    category: "Home & Garden",
    offers:
      "Can swap baking, cleaning help, kids clothes, dog minding, or another favour.",
    wants:
      "A hand for an hour or two trimming, weeding and getting the yard back under control.",
    demo: true,
  },
];

export default function BrowsePage() {
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState("");
  const [town, setTown] = useState("All towns");
  const [distance, setDistance] = useState("150");
  const [category, setCategory] = useState("All categories");

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("localloop-listings") || "[]"
      );

      if (Array.isArray(stored)) {
        setSavedListings(stored);
      }
    } catch {
      setSavedListings([]);
    }
  }, []);

  const listings = useMemo(
    () => [...savedListings, ...demoListings],
    [savedListings]
  );

  const towns = useMemo(
    () => [
      "All towns",
      ...Array.from(new Set(listings.map((listing) => listing.town))),
    ],
    [listings]
  );

  const categories = useMemo(
    () => [
      "All categories",
      ...Array.from(
        new Set(listings.map((listing) => listing.category))
      ),
    ],
    [listings]
  );

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const text = `
        ${listing.title}
        ${listing.offers}
        ${listing.wants}
        ${listing.person}
        ${listing.town}
        ${listing.category}
        ${listing.from || ""}
        ${listing.to || ""}
        ${listing.route || ""}
      `.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesTown =
        town === "All towns" || listing.town === town;
      const matchesDistance =
        listing.distance <= Number(distance);
      const
