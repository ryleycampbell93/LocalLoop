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

      const matchesCategory =
        category === "All categories" ||
        listing.category === category;

      return (
        matchesSearch &&
        matchesTown &&
        matchesDistance &&
        matchesCategory
      );
    });
  }, [listings, search, town, distance, category]);

  return (
    <main
      style={{
        background: "#f7f6f1",
        minHeight: "100vh",
        paddingBottom: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "22px 16px",
        }}
      >
        <section
          style={{
            marginBottom: 22,
          }}
        >
          <p
            style={{
              color: "#315c44",
              fontWeight: 900,
              letterSpacing: "0.08em",
              fontSize: 13,
              margin: "0 0 8px",
            }}
          >
            LOCALLOOP MARKETPLACE
          </p>

          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "clamp(2.2rem, 8vw, 4rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            Find something useful nearby
          </h1>

          <p
            style={{
              color: "#6b6f69",
              fontSize: 16,
              lineHeight: 1.5,
              margin: "0 0 20px",
              maxWidth: 680,
            }}
          >
            Items, skills, services, transport and local help.
            No public prices — make an offer and work out the details privately.
          </p>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search firewood, trailer, fencing, pickup..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#fff",
              border: "1px solid #d9d8d2",
              borderRadius: 14,
              padding: "15px 16px",
              fontSize: 16,
              outline: "none",
            }}
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <select
            value={town}
            onChange={(event) => setTown(event.target.value)}
            style={{
              width: "100%",
              padding: 13,
              borderRadius: 12,
              border: "1px solid #d9d8d2",
              background: "#fff",
              fontSize: 14,
            }}
          >
            {towns.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            style={{
              width: "100%",
              padding: 13,
              borderRadius: 12,
              border: "1px solid #d9d8d2",
              background: "#fff",
              fontSize: 14,
            }}
          >
            <option value="25">Within 25 km</option>
            <option value="50">Within 50 km</option>
            <option value="100">Within 100 km</option>
            <option value="150">Within 150 km</option>
          </select>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            style={{
              width: "100%",
              padding: 13,
              borderRadius: 12,
              border: "1px solid #d9d8d2",
              background: "#fff",
              fontSize: 14,
            }}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </section>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 22,
            }}
          >
            Nearby listings
          </h2>

          <span
            style={{
              color: "#7b7e79",
              fontSize: 14,
            }}
          >
            {filteredListings.length} found
          </span>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {filteredListings.map((listing) => {
            const heroPhoto =
              Array.isArray(listing.photos) &&
              listing.photos.length > 0
                ? listing.photos[0]
                : null;

            const description =
              listing.type === "need"
                ? listing.wants
                : listing.offers;

            const openTo =
              listing.type === "need"
                ? listing.offers
                : listing.wants;

            return (
              <Link
                key={listing.id}
                href={`/listing/${listing.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: "#fff",
                  borderRadius: 18,
                  overflow: "hidden",
                  border: "1px solid #dedbd3",
                  boxShadow:
                    "0 6px 18px rgba(36,48,40,0.05)",
                  display: "block",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    background: "#ebeae5",
                    overflow: "hidden",
                  }}
                >
                  {heroPhoto ? (
                    <img
                      src={heroPhoto}
                      alt={listing.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 54,
                      }}
                    >
                      🔄
                    </div>
                  )}

                  {listing.demo && (
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "rgba(255,255,255,0.94)",
                        color: "#7a5518",
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontSize: 11,
                        fontWeight: 900,
                      }}
                    >
                      DEMO
                    </span>
                  )}

                  <span
                    style={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      background: "rgba(255,255,255,0.94)",
                      color: "#315c44",
                      borderRadius: 999,
                      padding: "7px 10px",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {listing.distance} km
                  </span>
                </div>

                <div style={{ padding: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        background: "#edf3ef",
                        color: "#315c44",
                        borderRadius: 999,
                        padding: "6px 9px",
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {listing.category}
                    </span>

                    <span
                      style={{
                        color: "#7b7e79",
                        fontSize: 13,
                      }}
                    >
                      📍 {listing.town}
                    </span>
                  </div>

                  <h2
                    style={{
                      margin: "0 0 8px",
                      fontSize: 23,
                      lineHeight: 1.12,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {listing.title}
                  </h2>

                  <p
                    style={{
                      margin: "0 0 12px",
                      color: "#4f534f",
                      lineHeight: 1.45,
                      fontSize: 15,
                    }}
                  >
                    {description}
                  </p>

                  {(listing.from ||
                    listing.to ||
                    listing.route) && (
                    <div
                      style={{
                        background: "#f4f6f4",
                        borderRadius: 12,
                        padding: 10,
                        marginBottom: 12,
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#315c44",
                      }}
                    >
                      🛻{" "}
                      {listing.from && listing.to
                        ? `${listing.from} → ${listing.to}`
                        : listing.route}
                    </div>
                  )}

                  <div
                    style={{
                      borderTop: "1px solid #eceae4",
                      paddingTop: 12,
                      marginTop: 12,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "#8a8d87",
                        marginBottom: 4,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Open to
                    </div>

                    <p
                      style={{
                        margin: 0,
                        color: "#315c44",
                        fontWeight: 700,
                        lineHeight: 1.4,
                        fontSize: 14,
                      }}
                    >
                      {openTo}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 16,
                      color: "#777b76",
                      fontSize: 13,
                    }}
                  >
                    <span>Listed by {listing.person}</span>

                    <strong
                      style={{
                        color: "#315c44",
                      }}
                    >
                      View →
                    </strong>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        {filteredListings.length === 0 && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #dedbd3",
              borderRadius: 18,
              padding: 26,
              textAlign: "center",
              marginTop: 16,
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              Nothing nearby yet
            </h3>

            <p
              style={{
                color: "#747872",
                marginBottom: 0,
              }}
            >
              Try a different town, category, distance or search.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
