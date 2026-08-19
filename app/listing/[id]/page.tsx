"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Listing = {
  id: string;
  title: string;
  description?: string;
  price?: number | string;
  image?: string;
  images?: string[];
  location?: string;
  seller?: string;
  sellerName?: string;
  category?: string;
  condition?: string;
};

export default function ListingPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params?.id || "");

  const [listing, setListing] = useState<Listing | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const savedListings = JSON.parse(
      localStorage.getItem("localLoopListings") || "[]"
    );

    const found = savedListings.find(
      (item: Listing) => String(item.id) === id
    );

    if (found) {
      setListing(found);
    }
  }, [id]);

  if (!listing) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f4f4f4",
          padding: 20,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 650,
            margin: "50px auto",
            background: "#fff",
            borderRadius: 18,
            padding: 28,
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              background: "transparent",
              border: 0,
              fontSize: 16,
              padding: 0,
              marginBottom: 20,
              cursor: "pointer",
            }}
          >
            ← Back
          </button>

          <h2>Listing not found</h2>

          <p style={{ color: "#666" }}>
            This listing may have been removed or is no longer available.
          </p>

          <button
            onClick={() => router.push("/")}
            style={{
              marginTop: 12,
              border: 0,
              borderRadius: 12,
              padding: "14px 18px",
              background: "#d62f2f",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Browse listings
          </button>
        </div>
      </main>
    );
  }

  const images =
    listing.images && listing.images.length > 0
      ? listing.images
      : listing.image
      ? [listing.image]
      : [];

  const price =
    typeof listing.price === "number"
      ? `$${listing.price}`
      : listing.price
      ? String(listing.price).startsWith("$")
        ? listing.price
        : `$${listing.price}`
      : "Make an offer";

  function makeOffer() {
    const query = new URLSearchParams({
      listing: listing.id,
      title: listing.title,
    });

    router.push(`/propose?${query.toString()}`);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "18px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            border: 0,
            background: "transparent",
            padding: "10px 0 16px",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          }}
        >
          {images.length > 0 ? (
            <>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  background: "#eee",
                }}
              >
                <img
                  src={images[activeImage]}
                  alt={listing.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {images.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    overflowX: "auto",
                    padding: 12,
                  }}
                >
                  {images.map((image, index) => (
                    <button
                      key={image + index}
                      onClick={() => setActiveImage(index)}
                      style={{
                        width: 72,
                        height: 58,
                        flex: "0 0 auto",
                        padding: 0,
                        border:
                          activeImage === index
                            ? "2px solid #d62f2f"
                            : "1px solid #ddd",
                        borderRadius: 9,
                        overflow: "hidden",
                        background: "#eee",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={image}
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
            </>
          ) : (
            <div
              style={{
                aspectRatio: "4 / 3",
                background: "#e8e8e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 52,
              }}
            >
              📦
            </div>
          )}

          <div style={{ padding: 22 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 28,
                    lineHeight: 1.15,
                  }}
                >
                  {listing.title}
                </h1>

                {listing.location && (
                  <p
                    style={{
                      color: "#777",
                      margin: "8px 0 0",
                      fontSize: 15,
                    }}
                  >
                    📍 {listing.location}
                  </p>
                )}
              </div>

              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {price}
              </div>
            </div>

            {(listing.category || listing.condition) && (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginTop: 18,
                }}
              >
                {listing.category && (
                  <span
                    style={{
                      background: "#f1f1f1",
                      padding: "7px 10px",
                      borderRadius: 999,
                      fontSize: 13,
                    }}
                  >
                    {listing.category}
                  </span>
                )}

                {listing.condition && (
                  <span
                    style={{
                      background: "#f1f1f1",
                      padding: "7px 10px",
                      borderRadius: 999,
                      fontSize: 13,
                    }}
                  >
                    {listing.condition}
                  </span>
                )}
              </div>
            )}

            {listing.description && (
              <div style={{ marginTop: 24 }}>
                <h3 style={{ margin: "0 0 8px" }}>Description</h3>

                <p
                  style={{
                    color: "#555",
                    lineHeight: 1.6,
                    margin: 0,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {listing.description}
                </p>
              </div>
            )}

            <div
              style={{
                marginTop: 24,
                padding: 16,
                borderRadius: 14,
                background: "#f7f7f7",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: "#777",
                  marginBottom: 4,
                }}
              >
                Listed by
              </div>

              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {listing.sellerName || listing.seller || "LocalLoop member"}
              </div>
            </div>

            <button
              onClick={makeOffer}
              style={{
                width: "100%",
                marginTop: 24,
                border: 0,
                borderRadius: 14,
                padding: "17px 18px",
                background: "#d62f2f",
                color: "#fff",
                fontSize: 17,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Make Offer
            </button>

            <p
              style={{
                textAlign: "center",
                color: "#888",
                fontSize: 13,
                margin: "12px 0 0",
              }}
            >
              Send an offer directly to the seller.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
