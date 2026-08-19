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

const demoOffers: Listing[] = [
  {
    id: "mitre10-pambula-pickup",
    type: "offer",
    title: "Mitre 10 Pambula pickup",
    person: "Chris",
    town: "Cooma",
    distance: 104,
    category: "Pickups & Errands",
    offers:
      "Can collect a prepaid hardware order from Pambula and bring it toward Cooma.",
    wants:
      "Firewood, fresh produce, or another useful local favour.",
    from: "Pambula",
    to: "Cooma",
    demo: true,
  },

  {
    id: "merimbula-pharmacy-pickup",
    type: "offer",
    title: "Merimbula pharmacy pickup",
    person: "Emma",
    town: "Cooma",
    distance: 108,
    category: "Pickups & Errands",
    offers:
      "Can collect eligible prepaid pharmacy items when already travelling inland.",
    wants:
      "Garden help, dog minding, or help moving a few items.",
    from: "Merimbula",
    to: "Cooma",
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
      "Fresh eggs, mechanical help, trailer use, or another useful favour.",
    from: "Merimbula",
    to: "Cooma",
    photos: [
      "/0051362F-9E69-4362-AF78-586CC1593CF6.png",
    ],
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
      "Small carpentry work, welding help, or mower servicing.",
    photos: ["/firewood-delivery.png.jpg"],
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
      "Garden cleanup, painting help, or computer assistance.",
    from: "Jindabyne",
    to: "Cooma",
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
      "Can trade livestock-yard cleanup, firewood or general farm help.",
    wants:
      "Someone experienced to help repair and tension a section of fencing.",
    demo: true,
  },

  {
    id: "mechanical-cooma",
    type: "offer",
    title: "Small engine & mechanical help",
    person: "Riley",
    town: "Cooma",
    distance: 4,
    category: "Mechanical",
    offers:
      "Can help with basic mower, small engine and mechanical jobs.",
    wants:
      "Carpentry, transport help, fresh produce, or another useful local trade.",
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

  const offers = useMemo(
    () => [...savedListings, ...demoOffers],
    [savedListings]
  );

  const towns = useMemo(
    () => [
      "All towns",
      ...Array.from(new Set(offers.map((offer) => offer.town))),
    ],
    [offers]
  );

  const categories = useMemo(
    () => [
      "All categories",
      ...Array.from(new Set(offers.map((offer) => offer.category))),
    ],
    [offers]
  );

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const text = `
        ${offer.title}
        ${offer.offers}
        ${offer.wants}
        ${offer.person}
        ${offer.town}
        ${offer.from || ""}
        ${offer.to || ""}
        ${offer.route || ""}
      `.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesTown =
        town === "All towns" || offer.town === town;
      const matchesDistance =
        offer.distance <= Number(distance);
      const matchesCategory =
        category === "All categories" ||
        offer.category === category;

      return (
        matchesSearch &&
        matchesTown &&
        matchesDistance &&
        matchesCategory
      );
    });
  }, [offers, search, town, distance, category]);

  return (
    <main
      className="container"
      style={{ padding: "2rem 0 4rem" }}
    >
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
            marginBottom: "1rem",
            maxWidth: 720,
          }}
        >
          Find local people offering practical help, transport,
          skills, produce and useful trades around the region.
        </p>

        <input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Try: Pambula pickup, tractor, firewood, trailer..."
          className="input"
        />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "0.8rem",
          marginBottom: "1.5rem",
        }}
      >
        <select
          className="select"
          value={town}
          onChange={(event) =>
            setTown(event.target.value)
          }
        >
          {towns.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          className="select"
          value={distance}
          onChange={(event) =>
            setDistance(event.target.value)
          }
        >
          <option value="25">Within 25 km</option>
          <option value="50">Within 50 km</option>
          <option value="100">Within 100 km</option>
          <option value="150">Within 150 km</option>
        </select>

        <select
          className="select"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </section>

      <section
        style={{
          display: "grid",
          gap: "1rem",
        }}
      >
        {filteredOffers.map((offer) => {
          const hasRoute = Boolean(
            (offer.from && offer.to) || offer.route
          );

          const heroPhoto =
            Array.isArray(offer.photos) &&
            offer.photos.length > 0
              ? offer.photos[0]
              : null;

          return (
            <article
              key={offer.id}
              style={{
                background: "#fff",
                border: "1px solid #ded8cd",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow:
                  "0 8px 24px rgba(36, 48, 40, 0.05)",
              }}
            >
              {heroPhoto && (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src={heroPhoto}
                    alt={offer.title}
                    style={{
                      display: "block",
                      width: "100%",
                      height: 230,
                      objectFit: "cover",
                    }}
                  />

                  {offer.demo && (
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "#fff3d9",
                        color: "#79500a",
                        borderRadius: 999,
                        padding: "0.45rem 0.75rem",
                        fontSize: "0.78rem",
                        fontWeight: 900,
                      }}
                    >
                      DEMO
                    </span>
                  )}
                </div>
              )}

              <div style={{ padding: "1.2rem" }}>
                {!heroPhoto && offer.demo && (
                  <span
                    style={{
                      display: "inline-block",
                      background: "#fff3d9",
                      color: "#79500a",
                      borderRadius: 999,
                      padding: "0.4rem 0.7rem",
                      fontSize: "0.78rem",
                      fontWeight: 900,
                      marginBottom: "0.7rem",
                    }}
                  >
                    DEMO
                  </span>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#315c44",
                        fontWeight: 800,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {offer.category}
                    </p>

                    <h2 style={{ margin: 0 }}>
                      {offer.title}
                    </h2>
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

                <p style={{ color: "#6b6f69" }}>
                  {offer.person} · {offer.town}
                </p>

                {hasRoute && (
                  <div
                    style={{
                      background: "#eef4ef",
                      borderRadius: 14,
                      padding: "0.9rem",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        color: "#315c44",
                        marginBottom: "0.3rem",
                      }}
                    >
                      ROUTE
                    </div>

                    <strong>
                      {offer.from && offer.to
                        ? `${offer.from} → ${offer.to}`
                        : offer.route}
                    </strong>
                  </div>
                )}

                <div
                  style={{
                    background: "#f8f6f1",
                    borderRadius: 14,
                    padding: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {offer.type === "need" ? (
                    <>
                      <p
                        style={{
                          marginBottom: "0.7rem",
                        }}
                      >
                        <strong>Needs:</strong>
                        <br />
                        {offer.wants}
                      </p>

                      <p style={{ margin: 0 }}>
                        <strong>
                          Offers in exchange:
                        </strong>
                        <br />
                        {offer.offers}
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          marginBottom: "0.7rem",
                        }}
                      >
                        <strong>Offers:</strong>
                        <br />
                        {offer.offers}
                      </p>

                      <p style={{ margin: 0 }}>
                        <strong>
                          Would like in exchange:
                        </strong>
                        <br />
                        {offer.wants}
                      </p>
                    </>
                  )}
                </div>

                <Link
                  href={`/listing/${offer.id}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#315c44",
                    color: "#fff",
                    padding: "0.95rem 1rem",
                    borderRadius: 12,
                    textDecoration: "none",
                    fontWeight: 800,
                  }}
                >
                  View listing
                </Link>
              </div>
            </article>
          );
        })}

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
            <p>
              Try another town, distance or search term.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
