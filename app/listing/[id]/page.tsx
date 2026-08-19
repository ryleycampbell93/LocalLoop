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

export default function ListingPage() {
  const params = useParams();
  const id = String(params?.id || "");

  const [listing, setListing] = useState<Listing | null | undefined>(
    undefined
  );
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("localloop-listings") || "[]"
      );

      const saved = Array.isArray(stored) ? stored : [];

      const found = [...saved, ...demoListings].find(
        (item: Listing) => String(item.id) === id
      );

      setListing(found || null);
    } catch {
      const found = demoListings.find(
        (item) => String(item.id) === id
      );

      setListing(found || null);
    }
  }, [id]);

  if (listing === undefined) {
    return (
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#6d726d" }}>Loading...</p>
      </main>
    );
  }

  if (!listing) {
    return (
      <main
        className="container"
        style={{ padding: "3rem 0 5rem" }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #dedbd3",
            borderRadius: 24,
            padding: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 8vw, 3.6rem)",
              marginBottom: "1.2rem",
            }}
          >
            Listing not found
          </h1>

          <Link
            href="/browse"
            style={{
              display: "inline-block",
              background: "#214d3d",
              color: "#fff",
              padding: "1rem 1.4rem",
              borderRadius: 14,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Back to browse
          </Link>
        </div>
      </main>
    );
  }

  const photos =
    listing.photos && listing.photos.length
      ? listing.photos
      : [];

  const description =
    listing.type === "need"
      ? listing.wants || listing.offers
      : listing.offers || listing.wants;

  const lookingFor =
    listing.type === "need"
      ? listing.offers
      : listing.wants;

  const offerHref = `/propose?listing=${encodeURIComponent(
    listing.id
  )}&title=${encodeURIComponent(listing.title)}`;

  const messageHref = `/messages?listing=${encodeURIComponent(
    listing.id
  )}&title=${encodeURIComponent(listing.title)}`;

  return (
    <main
      style={{
        background: "#f7f6f1",
        minHeight: "100vh",
        paddingBottom: "5rem",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          background: "#fff",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid #eceae4",
          }}
        >
          <Link
            href="/browse"
            style={{
              color: "#1e312a",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            ← Back
          </Link>
        </div>

        {photos.length > 0 ? (
          <div>
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                background: "#eee",
              }}
            >
              <img
                src={photos[photoIndex]}
                alt={listing.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {photos.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  overflowX: "auto",
                  padding: "10px 14px",
                  borderBottom: "1px solid #eee",
                }}
              >
                {photos.map((photo, index) => (
                  <button
                    key={`${photo}-${index}`}
                    onClick={() => setPhotoIndex(index)}
                    style={{
                      width: 64,
                      height: 64,
                      flex: "0 0 auto",
                      padding: 0,
                      overflow: "hidden",
                      borderRadius: 10,
                      border:
                        index === photoIndex
                          ? "2px solid #214d3d"
                          : "1px solid #ddd",
                      background: "#eee",
                    }}
                  >
                    <img
                      src={photo}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              aspectRatio: "4 / 3",
              background: "#ecebe6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
            }}
          >
            🔄
          </div>
        )}

        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                background: "#edf3ef",
                color: "#315c44",
                borderRadius: 999,
                padding: "7px 11px",
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              {listing.category}
            </span>

            <span
              style={{
                color: "#747872",
                fontSize: 14,
              }}
            >
              📍 {listing.town}
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 8vw, 3.3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {listing.title}
          </h1>

          <p
            style={{
              color: "#6e726d",
              margin: "10px 0 24px",
              fontSize: 16,
            }}
          >
            Listed by <strong>{listing.person}</strong>
          </p>

          {(listing.from || listing.to || listing.route) && (
            <div
              style={{
                background: "#f5f7f5",
                borderRadius: 14,
                padding: 14,
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#657068",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Route
              </div>

              <div style={{ fontWeight: 700 }}>
                {listing.from && listing.to
                  ? `${listing.from} → ${listing.to}`
                  : listing.route}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 28 }}>
            <h2
              style={{
                fontSize: 20,
                margin: "0 0 8px",
              }}
            >
              About this listing
            </h2>

            <p
              style={{
                margin: 0,
                color: "#454944",
                fontSize: 17,
                lineHeight: 1.55,
              }}
            >
              {description}
            </p>
          </div>

          {lookingFor && (
            <div
              style={{
                borderTop: "1px solid #eceae4",
                paddingTop: 22,
                marginBottom: 28,
              }}
            >
              <h2
                style={{
                  fontSize: 20,
                  margin: "0 0 8px",
                }}
              >
                Open to
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#454944",
                  lineHeight: 1.55,
                  fontSize: 17,
                }}
              >
                {lookingFor}
              </p>
            </div>
          )}

          <div
            style={{
              borderTop: "1px solid #eceae4",
              paddingTop: 22,
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#777",
                marginBottom: 4,
              }}
            >
              Member
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 22,
              }}
            >
              {listing.person}
            </div>

            <Link
              href={offerHref}
              style={{
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                textAlign: "center",
                background: "#214d3d",
                color: "#fff",
                textDecoration: "none",
                borderRadius: 14,
                padding: "16px",
                fontSize: 17,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              Make an offer
            </Link>

            <Link
              href={messageHref}
              style={{
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                textAlign: "center",
                background: "#f1eee6",
                color: "#214d3d",
                textDecoration: "none",
                borderRadius: 14,
                padding: "16px",
                fontSize: 17,
                fontWeight: 800,
              }}
            >
              Message
            </Link>

            <p
              style={{
                textAlign: "center",
                color: "#858982",
                fontSize: 13,
                lineHeight: 1.4,
                margin: "14px 10px 0",
              }}
            >
              Discuss the details privately and agree on what works for both of you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
