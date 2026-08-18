"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const offers = [
  {
    id: "mitre10-pambula-pickup",
    title: "Mitre 10 Pambula pickup",
    person: "Chris",
    town: "Pambula",
    distance: 104,
    category: "Pickups & Errands",
    offers: "Can collect a prepaid hardware order from Mitre 10 Pambula and bring it toward Cooma.",
    wants: "Firewood, a hand with fencing, or another useful local favour.",
  },
  {
    id: "merimbula-pharmacy-pickup",
    title: "Merimbula pharmacy pickup",
    person: "Emma",
    town: "Merimbula",
    distance: 108,
    category: "Pickups & Errands",
    offers: "Can collect eligible prepaid pharmacy items from Merimbula when already travelling inland.",
    wants: "Garden help, dog minding, or help moving a few items.",
  },
  {
    id: "click-and-collect-coast",
    title: "Click & Collect pickup",
    person: "Dan",
    town: "Merimbula",
    distance: 110,
    category: "Pickups & Errands",
    offers: "Heading from the coast toward Cooma and can collect a prepaid Click & Collect order on the way.",
    wants: "Trailer use, mechanical help, or help splitting firewood.",
  },
  {
    id: "lamb-barter-bombala",
    title: "Farm produce available to barter",
    person: "Mick",
    town: "Bombala",
    distance: 82,
    category: "Farm & Produce",
    offers: "Locally raised farm produce available for a private barter, subject to local food-safety rules.",
    wants: "Fencing help, machinery repair, or transport assistance.",
  },
  {
    id: "firewood-cooma",
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
    distance: 6,
    category: "Home & Farm",
    offers: "Can deliver a ute load of firewood around Cooma and nearby areas.",
    wants: "Small carpentry job, welding help, or mower servicing.",
  },
  {
    id: "trailer-transport-jindabyne",
    title: "Trailer transport help",
    person: "Sarah",
    town: "Jindabyne",
    distance: 61,
    category: "Transport",
    offers: "Can help move a mower, furniture or other suitable items with a trailer.",
    wants: "Garden cleanup, painting help, or computer assistance.",
  },
  {
    id: "fencing-bombala",
    title: "Need a hand with fencing",
    person: "Tom",
    town: "Bombala",
    distance: 84,
    category: "Trades & Farm",
    offers: "Can trade livestock-yard cleanup, firewood or general farm help.",
    wants: "Someone experienced to help repair and tension a section of fencing.",
  },
  {
    id: "mechanical-cooma",
    title: "Small engine & mechanical help",
    person: "Riley",
    town: "Cooma",
    distance: 4,
    category: "Mechanical",
    offers: "Can help with basic mower, small engine and mechanical jobs.",
    wants: "Carpentry, transport help, or a useful local trade.",
  },
];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [town, setTown] = useState("All towns");
  const [distance, setDistance] = useState("150");
  const [category, setCategory] = useState("All categories");

  const towns = ["All towns", ...Array.from(new Set(offers.map((offer) => offer.town)))];

  const categories = [
    "All categories",
    ...Array.from(new Set(offers.map((offer) => offer.category))),
  ];

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const text =
        `${offer.title} ${offer.offers} ${offer.wants} ${offer.person} ${offer.town}`.toLowerCase();

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
          LOCALLOOP NEAR YOU
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
            maxWidth: 720,
          }}
        >
          Find people already travelling your way, offering practical skills,
          or looking to swap useful goods and favours around the region.
        </p>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Try: Pambula pickup, fencing, firewood, trailer..."
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
          {towns.map((item) => (
            <option key={item}>{item}</option>
          ))}
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
          <option value="25">Within 25 km</option>
          <option value="50">Within 50 km</option>
          <option value="100">Within 100 km</option>
          <option value="150">Within 150 km</option>
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
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
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
