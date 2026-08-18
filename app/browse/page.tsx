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
      const matchesSearch =
        offer.title.toLowerCase().includes(search.toLowerCase()) ||
        offer.offers.toLowerCase().includes(search.toLowerCase()) ||
        offer.wants.toLowerCase().includes(search.toLowerCase());

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
    <main className="container" style={{ padding: "3rem 0" }}>
      <section style={{ marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#315c44" }}>LOCAL OFFERS</p>
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", marginBottom: "1rem" }}>
          Find someone nearby who can help
        </h1>
        <p style={{ maxWidth: 700, color: "#666", fontSize: "1.1rem" }}>
          Search by skill, town, distance or category and see what people
          are looking for in return.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="What do you need?"
          style={{ padding: "0.9rem", borderRadius: 12, border: "1px solid #ccc" }}
        />

        <select
          value={town}
          onChange={(e) => setTown(e.target.value)}
          style={{ padding: "0.9rem", borderRadius: 12, border: "1px solid #ccc" }}
        >
          <option>All towns</option>
          <option>Cooma</option>
          <option>Jindabyne</option>
          <option>Berridale</option>
        </select>

        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          style={{ padding: "0.9rem", borderRadius: 12, border: "1px solid #ccc" }}
        >
          <option value="10">Within 10 km</option>
          <option value="25">Within 25 km</option>
          <option value="50">Within 50 km</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "0.9rem", borderRadius: 12, border: "1px solid #ccc" }}
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
              border: "1px solid #ddd",
              borderRadius: 18,
              padding: "1.25rem",
            }}
          >
            <p style={{ color: "#8a5a2b", fontWeight: 700 }}>
              {offer.town} · {offer.distance} km away
            </p>

            <h2 style={{ margin: "0.4rem 0" }}>{offer.title}</h2>
            <p style={{ marginBottom: "0.8rem" }}>
              <strong>{offer.person} offers:</strong> {offer.offers}
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Looking for:</strong> {offer.wants}
            </p>

            <Link
              href={`/listing/${offer.id}`}
              style={{
                display: "inline-block",
                background: "#315c44",
                color: "#fff",
                padding: "0.8rem 1rem",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              View offer
            </Link>
          </article>
        ))}

        {filteredOffers.length === 0 && (
          <p>No offers match those filters yet.</p>
        )}
      </section>
    </main>
  );
}
