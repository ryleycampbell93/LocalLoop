"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const offers = [
  {
    id: "carpentry-cooma",
    title: "Carpentry & small repairs",
    person: "Ryley",
    town: "Cooma",
    distance: 4,
    category: "Trades",
    offers: "Shelves, doors, timber repairs and small carpentry jobs",
    wants: "Mechanical work, landscaping or photography",
  },
  {
    id: "gardening-jindabyne",
    title: "Gardening & yard help",
    person: "Sarah",
    town: "Jindabyne",
    distance: 18,
    category: "Home & Garden",
    offers: "Garden cleanups, mowing and basic yard maintenance",
    wants: "Website help, bookkeeping or moving assistance",
  },
  {
    id: "tech-berridale",
    title: "Computer & website help",
    person: "James",
    town: "Berridale",
    distance: 29,
    category: "Tech",
    offers: "Basic websites, computer setup and troubleshooting",
    wants: "Painting, gardening or handyman help",
  },
];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [town, setTown] = useState("All towns");
  const [distance, setDistance] = useState("50");
  const [category, setCategory] = useState("All categories");

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const text = `${offer.title} ${offer.offers} ${offer.wants} ${offer.person}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesTown = town === "All towns" || offer.town === town;
      const matchesDistance = offer.distance <= Number(distance);
      const matchesCategory =
        category === "All categories" || offer.category === category;

      return (
        matchesSearch &&
        matchesTown &&
        matchesDistance &&
        matchesCategory
      );
    });
  }, [search, town, distance, category]);

  return (
    <main className="container" style={{ padding: "2rem 0 4rem" }}>
      <section
        style={{
          background: "#f4efe3",
          borderRadius: 24,
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <p
          style={{
            fontWeight: 800,
            color: "#315c44",
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
          }}
        >
          LOCAL OFFERS
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 8vw, 3.8rem)",
            lineHeight: 1.05,
            marginBottom: "0.8rem",
          }}
        >
          What do you need?
        </h1>

        <p
          style={{
            color: "#5f625d",
            fontSize: "1rem",
            marginBottom: "1rem",
            maxWidth: 680,
          }}
        >
          Search LocalLoop for people nearby who can help, then see what
          they want in return.
        </p>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Try: lawn mowing, mechanic, website help..."
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: 14,
            border: "1px solid #cfc7b8",
            fontSize: "1rem",
            background: "#fff",
          }}
        />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "0.8rem",
          marginBottom: "1.5rem",
        }}
      >
        <select
          value={town}
          onChange={(e) => setTown(e.target.value)}
          style={{
            padding: "0.9rem",
            borderRadius: 12,
            border: "1px solid #d6d0c5",
            background: "#fff",
          }}
        >
          <option>All towns</option>
          <option>Cooma</option>
          <option>Jindabyne</option>
          <option>Berridale</option>
        </select>

        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          style={{
            padding: "0.9rem",
            borderRadius: 12,
            border: "1px solid #d6d0c5",
            background: "#fff",
          }}
        >
          <option value="10">Within 10 km</option>
          <option value="25">Within 25 km</option>
          <option value="50">Within 50 km</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "0.9rem",
            borderRadius: 12,
            border: "1px solid #d6d0c5",
            background: "#fff",
          }}
        >
          <option>All categories</option>
          <option>Trades</option>
          <option>Home & Garden</option>
          <option>Tech</option>
        </select>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        {filteredOffers.map((offer) => (
          <article
            key={offer.id}
            style={{
              background: "#fff",
              border: "1px solid #ded8cd",
              borderRadius: 18,
              padding: "1.2rem",
              boxShadow: "0 8px 24px rgba(36, 48, 40, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                alignItems: "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#315c44",
                    fontWeight: 800,
                    marginBottom: "0.2rem",
                  }}
                >
                  {offer.category}
                </p>

                <h2 style={{ margin: 0 }}>{offer.title}</h2>
              </div>

              <span
                style={{
                  background: "#eef4ef",
                  color: "#315c44",
                  borderRadius: 999,
                  padding: "0.4rem 0.7rem",
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
              >
                {offer.distance} km
              </span>
            </div>

            <p style={{ color: "#6b6f69", marginBottom: "0.8rem" }}>
              {offer.person} · {offer.town}
            </p>

            <div
              style={{
                background: "#f8f6f1",
                borderRadius: 14,
                padding: "0.9rem",
                marginBottom: "0.8rem",
              }}
            >
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Offers:</strong> {offer.offers}
              </p>

              <p style={{ margin: 0 }}>
                <strong>Wants:</strong> {offer.wants}
              </p>
            </div>

            <Link
              href={`/listing/${offer.id}`}
              style={{
                display: "block",
                textAlign: "center",
                background: "#315c44",
                color: "#fff",
                padding: "0.9rem 1rem",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              View offer
            </Link>
          </article>
        ))}

        {filteredOffers.length === 0 && (
          <div
            style={{
              background: "#f4efe3",
              borderRadius: 18,
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <h3>No matches yet</h3>
            <p>Try another town, distance or search term.</p>
          </div>
        )}
      </section>
    </main>
  );
}
