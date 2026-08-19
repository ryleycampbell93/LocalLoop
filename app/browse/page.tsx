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
        <section style={{ marginBottom: 22 }}>
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
            Clothes, kids gear, pets, baking, transport, tools,
            services, household items and local help. Make an offer
            and work out the details privately.
          </p>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search kids gear, baking, firewood, pet help..."
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
          <h2 style={{ margin: 0, fontSize: 22 }}>
            Nearby listings
          </h2>

          <span style={{ color: "#7b7e79", fontSize: 14 }}>
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

                    <strong style={{ color: "#315c44" }}>
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
