"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Listing = {
  id: string;
  type?: "need" | "offer";
  title: string;
  person: string;
  town: string;
  distance?: number;
  category: string;
  offers: string;
  wants: string;
  description?: string;
  from?: string;
  to?: string;
  route?: string;
  photos?: string[];
};

const demoListings: Listing[] = [
  {
    id: "mitre10-pambula-pickup",
    type: "offer",
    title: "Mitre 10 Pambula pickup",
    person: "Chris",
    town: "Cooma",
    category: "Pickups & Errands",
    offers:
      "Can collect a prepaid hardware order from Mitre 10 Pambula and bring it toward Cooma.",
    wants: "Firewood, fresh produce, or another useful local favour.",
    description:
      "Ideal for someone already travelling inland who can save another local a long round trip.",
    from: "Mitre 10, Pambula",
    to: "Cooma",
  },
  {
    id: "merimbula-pharmacy-pickup",
    type: "offer",
    title: "Merimbula pharmacy pickup",
    person: "Emma",
    town: "Cooma",
    category: "Pickups & Errands",
    offers:
      "Can collect eligible prepaid pharmacy items when already travelling inland.",
    wants: "Garden help, dog minding, or help moving a few items.",
    description:
      "For eligible prepaid items where the pharmacy allows third-party collection.",
    from: "Merimbula",
    to: "Cooma",
  },
  {
    id: "click-and-collect-coast",
    type: "offer",
    title: "Click & Collect pickup",
    person: "Dan",
    town: "Cooma",
    category: "Pickups & Errands",
    offers:
      "Heading from the coast toward Cooma and can collect a prepaid Click & Collect order.",
    wants: "Fresh eggs, mechanical help, trailer use, or another useful favour.",
    description:
      "A practical regional pickup for someone already making the trip.",
    from: "Merimbula",
    to: "Cooma",
  },
  {
    id: "firewood-cooma",
    type: "offer",
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
    category: "Home & Garden",
    offers:
      "Can deliver a ute load of firewood around Cooma and nearby areas.",
    wants: "Small carpentry work, welding help, or mower servicing.",
  },
  {
    id: "trailer-transport-jindabyne",
    type: "offer",
    title: "Trailer transport help",
    person: "Sarah",
    town: "Jindabyne",
    category: "Transport",
    offers:
      "Can help move a mower, furniture or other suitable items with a trailer.",
    wants: "Garden cleanup, painting help, or computer assistance.",
    from: "Jindabyne",
    to: "Cooma",
  },
  {
    id: "fencing-bombala",
    type: "need",
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
    type: "offer",
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
  const [activePhoto, setActivePhoto] = useState(0);

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

  const photos =
    listing && Array.isArray(listing.photos)
      ? listing.photos
      : [];

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

  const hasRoute = Boolean(
    (listing.from && listing.to) || listing.route
  );

  return (
    <main className="container" style={{ padding: "2rem 0 4rem" }}>
      <section
        style={{
          background: "#ffffff",
          border: "1px solid #ded8cd",
          borderRadius: 22,
          overflow: "hidden",
        }}
      >
        {photos.length > 0 && (
          <div>
            <img
              src={photos[activePhoto]}
              alt={listing.title}
              style={{
                display: "block",
                width: "100%",
                height: 340,
                objectFit: "cover",
              }}
            />

            {photos.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  overflowX: "auto",
                  padding: "0.8rem",
                  background: "#f8f6f1",
                }}
              >
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    style={{
                      border:
                        activePhoto === index
                          ? "3px solid #315c44"
                          : "1px solid #ded8cd",
                      borderRadius: 12,
                      padding: 0,
                      overflow: "hidden",
                      background: "#fff",
                      flex: "0 0 auto",
                    }}
                  >
                    <img
                      src={photo}
                      alt={`${listing.title} ${index + 1}`}
                      style={{
                        display: "block",
                        width: 90,
                        height: 75,
                        objectFit: "cover",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ padding: "1.5rem" }}>
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
              marginBottom: "1.2rem",
            }}
          >
            Posted by {listing.person}
          </p>

          {hasRoute && (
            <div
              style={{
                background: "#eef4ef",
                borderRadius: 14,
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <strong>Route</strong>
              <br />
              {listing.from && listing.to
                ? `${listing.from} → ${listing.to}`
                : listing.route}
            </div>
          )}

          <div
            style={{
              background: "#f8f6f1",
              borderRadius: 16,
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            {listing.type === "need" ? (
              <>
                <p style={{ marginBottom: "0.7rem" }}>
                  <strong>Needs:</strong>
                  <br />
                  {listing.wants}
                </p>

                <p style={{ margin: 0 }}>
                  <strong>Offers in exchange:</strong>
                  <br />
                  {listing.offers}
                </p>
              </>
            ) : (
              <>
                <p style={{ marginBottom: "0.7rem" }}>
                  <strong>Offers:</strong>
                  <br />
                  {listing.offers}
                </p>

                <p style={{ margin: 0 }}>
                  <strong>Would like in exchange:</strong>
                  <br />
                  {listing.wants}
                </p>
              </>
            )}
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
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Back to browse
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
