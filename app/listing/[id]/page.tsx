"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Listing = {
  id: string;
  type?: string;
  title: string;
  person: string;
  town: string;
  distance?: number;
  category: string;
  offers: string;
  wants: string;
  description?: string;
};

const demoListings: Listing[] = [
  {
    id: "mitre10-pambula-pickup",
    title: "Mitre 10 Pambula pickup",
    person: "Chris",
    town: "Pambula",
    category: "Pickups & Errands",
    offers:
      "Can collect a prepaid hardware order from Mitre 10 Pambula and bring it toward Cooma.",
    wants:
      "Firewood, fresh produce, or another useful local favour.",
    description:
      "Ideal for someone already travelling inland who can save another local a long round trip.",
  },
  {
    id: "merimbula-pharmacy-pickup",
    title: "Merimbula pharmacy pickup",
    person: "Emma",
    town: "Merimbula",
    category: "Pickups & Errands",
    offers:
      "Can collect eligible prepaid pharmacy items when already travelling inland.",
    wants:
      "Garden help, dog minding, or help moving a few items.",
    description:
      "For eligible prepaid items where the pharmacy allows third-party collection.",
  },
  {
    id: "click-and-collect-coast",
    title: "Click & Collect pickup",
    person: "Dan",
    town: "Merimbula",
    category: "Pickups & Errands",
    offers:
      "Heading from the coast toward Cooma and can collect a prepaid Click & Collect order.",
    wants:
      "Fresh eggs, mechanical help, trailer use, or another useful favour.",
    description:
      "A practical regional pickup for someone already making the trip.",
  },
  {
    id: "firewood-cooma",
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
    category: "Home & Garden",
    offers:
      "Can deliver a ute load of firewood around Cooma and nearby areas.",
    wants:
      "Small carpentry work, welding help, or mower servicing.",
  },
  {
    id: "trailer-transport-jindabyne",
    title: "Trailer transport help",
    person: "Sarah",
    town: "Jindabyne",
    category: "Transport",
    offers:
      "Can help move a mower, furniture or other suitable items with a trailer.",
    wants:
      "Garden cleanup, painting help, or computer assistance.",
  },
  {
    id: "fencing-bombala",
    title: "Need a hand with fencing",
    person: "Tom",
    town: "Bombala",
    category: "Trades & Farm",
    offers:
      "Can trade livestock-yard cleanup, firewood or general farm help.",
    wants:
      "Someone experienced to help repair and tension a section of fencing.",
  },
  {
    id: "mechanical-cooma",
    title: "Small engine & mechanical help",
    person: "Riley",
    town: "Cooma",
    category: "Mechanical",
    offers:
      "Can help with basic mower, small engine and mechanical jobs.",
    wants:
      "Carpentry, transport help, fresh produce, or another useful local trade.",
  },
];

export default function ListingPage() {
  const params = useParams();
  const id = String(params.id);

  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("localloop-listings") || "[]"
      );

      if (Array.isArray(saved)) {
        setSavedListings(saved);
      }
    } catch {
      setSavedListings([]);
    }

    setLoaded(true);
  }, []);

  const listing = useMemo(() => {
    return [...savedListings, ...demoListings].find(
      (item) => item.id === id
    );
  }, [savedListings, id]);

  if (!loaded) {
    return (
      <main className="container" style={{ padding: "3rem 0" }}>
        Loading listing...
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="container" style={{ padding: "3rem 0" }}>
        <div className="card">
          <h1>Listing not found</h1>
          <p>That listing may have been removed or completed.</p>

          <Link className="btn" href="/browse">
            Back to marketplace
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "2rem 0 4rem" }}>
      <section
        style={{
          background: "#ffffff",
          border: "1px solid #ded8cd",
          borderRadius: 22,
          padding: "1.5rem",
        }}
      >
        <p
          style={{
            color: "#315c44",
            fontWeight: 800,
            marginBottom: "0.4rem",
          }}
        >
          {listing.category} · {listing.town}
        </p>

        <h1
          style={{
            fontSize: "clamp(2.2rem, 8vw, 4rem)",
            marginBottom: "0.5rem",
          }}
        >
          {listing.title}
        </h1>

        <p
          style={{
            color: "#6b6f69",
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          Posted by {listing.person}
        </p>

        <div
          style={{
            background: "#f8f6f1",
            borderRadius: 16,
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p style={{ marginBottom: "0.7rem" }}>
            <strong>Offers:</strong>
            <br />
            {listing.offers}
          </p>

          <p style={{ margin: 0 }}>
            <strong>Wants:</strong>
            <br />
            {listing.wants}
          </p>
        </div>

        {listing.description && (
          <p style={{ lineHeight: 1.6, marginBottom: "1.5rem" }}>
            {listing.description}
          </p>
        )}

        <div style={{ display: "grid", gap: "0.8rem" }}>
          <Link
            href={`/propose?listing=${listing.id}`}
            style={{
              display: "block",
              textAlign: "center",
              background: "#315c44",
              color: "#ffffff",
              padding: "1rem",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Propose a barter
          </Link>

          <Link
            href="/browse"
            style={{
              display: "block",
              textAlign: "center",
              background: "#f4efe3",
              color: "#315c44",
              padding: "1rem",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Back to browse
          </Link>
        </div>
      </section>
    </main>
  );
}
