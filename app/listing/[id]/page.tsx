"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function ListingPage() {
  const params = useParams();
  const id = String(params.id || "");

  const [listing, setListing] = useState<Listing | null | undefined>(
    undefined
  );

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("localloop-listings") || "[]"
      );

      const allListings = [
        ...(Array.isArray(saved) ? saved : []),
        ...demoOffers,
      ];

      const found = allListings.find(
        (item: Listing) => String(item.id) === id
      );

      setListing(found || null);
    } catch {
      const found = demoOffers.find((item) => item.id === id);
      setListing(found || null);
    }
  }, [id]);

  if (listing === undefined) {
    return (
      <main className="container" style={{ padding: "4rem 0" }}>
        <p>Loading listing...</p>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="container" style={{ padding: "4rem 0" }}>
        <section
          style={{
            background: "#fff",
            border: "1px solid #ded8cd",
            borderRadius: 24,
            padding: "2rem",
          }}
        >
          <h1>Listing not found</h1>

          <Link
            href="/browse"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              background: "#315c44",
              color: "#fff",
              padding: "0.9rem 1.2rem",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Back to browse
          </Link>
        </section>
      </main>
    );
  }

  const hasRoute = Boolean(
    (listing.from && listing.to) || listing.route
  );

  return (
    <main
      className="container"
      style={{ padding: "2rem 0 4rem" }}
    >
      <article
        style={{
          background: "#fff",
          border: "1px solid #ded8cd",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(36,48,40,0.05)",
        }}
      >
        {listing.photos && listing.photos.length > 0 && (
          <img
            src={listing.photos[0]}
            alt={listing.title}
            style={{
              display: "block",
              width: "100%",
              maxHeight: 430,
              objectFit: "cover",
            }}
          />
        )}

        <div style={{ padding: "1.5rem" }}>
          {listing.demo && (
            <span
              style={{
                display: "inline-block",
                background: "#fff3d9",
                color: "#79500a",
                borderRadius: 999,
                padding: "0.4rem 0.7rem",
                fontSize: "0.78rem",
                fontWeight: 900,
                marginBottom: "0.8rem",
              }}
            >
              DEMO
            </span>
          )}

          <p
            style={{
              color: "#315c44",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            {listing.category} · {listing.town}
          </p>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 8vw, 4rem)",
              lineHeight: 1,
              marginBottom: "0.8rem",
            }}
          >
            {listing.title}
          </h1>

          <p
            style={{
              color: "#6b6f69",
              fontSize: "1.1rem",
              marginBottom: "1.4rem",
            }}
          >
            Posted by {listing.person}
          </p>

          {hasRoute && (
            <div
              style={{
                background: "#eef4ef",
                borderRadius: 16,
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <strong style={{ color: "#315c44" }}>
                ROUTE
              </strong>

              <div style={{ marginTop: "0.3rem" }}>
                {listing.from && listing.to
                  ? `${listing.from} → ${listing.to}`
                  : listing.route}
              </div>
            </div>
          )}

          <div
            style={{
              background: "#f8f6f1",
              borderRadius: 18,
              padding: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: 1.55,
            }}
          >
            {listing.type === "need" ? (
              <>
                <p>
                  <strong>Needs:</strong>
                  <br />
                  {listing.wants}
                </p>

                <p style={{ marginBottom: 0 }}>
                  <strong>Offers in exchange:</strong>
                  <br />
                  {listing.offers}
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Offers:</strong>
                  <br />
                  {listing.offers}
                </p>

                <p style={{ marginBottom: 0 }}>
                  <strong>Would like in exchange:</strong>
                  <br />
                  {listing.wants}
                </p>
              </>
            )}
          </div>

          <Link
            href={`/propose?listing=${encodeURIComponent(
              listing.id
            )}&title=${encodeURIComponent(listing.title)}`}
            style={{
              display: "block",
              textAlign: "center",
              background: "#315c44",
              color: "#fff",
              padding: "1rem",
              borderRadius: 14,
              textDecoration: "none",
              fontWeight: 900,
              fontSize: "1.05rem",
              marginBottom: "0.8rem",
            }}
          >
            Make an offer
          </Link>

          <Link
            href="/browse"
            style={{
              display: "block",
              textAlign: "center",
              background: "#f4efe3",
              color: "#315c44",
              padding: "1rem",
              borderRadius: 14,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Back to browse
          </Link>
        </div>
      </article>
    </main>
  );
}
