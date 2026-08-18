"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const listings = {
  "carpentry-cooma": {
    title: "Carpentry & small repairs",
    person: "Ryley",
    town: "Cooma",
    offers: "Shelves, doors, timber repairs and small carpentry jobs",
    wants: "Mechanical work, landscaping or photography",
  },
  "gardening-jindabyne": {
    title: "Gardening & yard help",
    person: "Sarah",
    town: "Jindabyne",
    offers: "Garden cleanups, mowing and basic yard maintenance",
    wants: "Website help, bookkeeping or moving assistance",
  },
  "tech-berridale": {
    title: "Computer & website help",
    person: "James",
    town: "Berridale",
    offers: "Basic websites, computer setup and troubleshooting",
    wants: "Painting, gardening or handyman help",
  },
};

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listing") || "carpentry-cooma";

  const listing = useMemo(() => {
    return listings[listingId as keyof typeof listings] || listings["carpentry-cooma"];
  }, [listingId]);

  const [yourOffer, setYourOffer] = useState("");
  const [theirWork, setTheirWork] = useState(listing.offers);
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="container" style={{ padding: "2rem 0 4rem" }}>
      <section
        style={{
          background: "#f4efe3",
          borderRadius: 22,
          padding: "1.4rem",
          marginBottom: "1.2rem",
        }}
      >
        <p style={{ fontWeight: 800, color: "#315c44", marginBottom: "0.4rem" }}>
          PROPOSE A BARTER
        </p>

        <h1 style={{ fontSize: "clamp(2rem, 8vw, 3.6rem)", marginBottom: "0.7rem" }}>
          Make an offer to {listing.person}
        </h1>

        <p style={{ color: "#666", marginBottom: 0 }}>
          {listing.title} · {listing.town}
        </p>
      </section>

      <section
        style={{
          background: "#fff",
          border: "1px solid #ded8cd",
          borderRadius: 20,
          padding: "1.2rem",
          marginBottom: "1rem",
        }}
      >
        <p style={{ marginBottom: "0.8rem" }}>
          <strong>{listing.person} offers:</strong> {listing.offers}
        </p>

        <p style={{ marginBottom: 0 }}>
          <strong>{listing.person} is looking for:</strong> {listing.wants}
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          background: "#fff",
          border: "1px solid #ded8cd",
          borderRadius: 20,
          padding: "1.2rem",
        }}
      >
        <label>
          <strong>What can you offer in return?</strong>
          <textarea
            value={yourOffer}
            onChange={(e) => setYourOffer(e.target.value)}
            placeholder="Example: I can service your lawn mower and replace the blades."
            style={{
              width: "100%",
              minHeight: 110,
              marginTop: "0.5rem",
              padding: "0.9rem",
              borderRadius: 12,
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </label>

        <label>
          <strong>What are you asking them to provide?</strong>
          <textarea
            value={theirWork}
            onChange={(e) => setTheirWork(e.target.value)}
            style={{
              width: "100%",
              minHeight: 100,
              marginTop: "0.5rem",
              padding: "0.9rem",
              borderRadius: 12,
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </label>

        <label>
          <strong>When?</strong>
          <input
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            placeholder="Example: Saturday morning or sometime next week"
            style={{
              width: "100%",
              marginTop: "0.5rem",
              padding: "0.9rem",
              borderRadius: 12,
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </label>

        <label>
          <strong>Anything else to agree on?</strong>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tools, materials, pickup, timing, special conditions..."
            style={{
              width: "100%",
              minHeight: 100,
              marginTop: "0.5rem",
              padding: "0.9rem",
              borderRadius: 12,
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </label>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!yourOffer.trim()}
            style={{
              border: 0,
              background: yourOffer.trim() ? "#315c44" : "#9da9a1",
              color: "#fff",
              padding: "1rem",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: "1rem",
            }}
          >
            Send barter proposal
          </button>
        ) : (
          <div
            style={{
              background: "#eef4ef",
              borderRadius: 14,
              padding: "1rem",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Proposal sent</h3>
            <p>
              This prototype has recorded your proposed exchange. The next step is
              to turn the agreed terms into a written barter agreement.
            </p>

            <Link
              href="/agreement"
              style={{
                display: "block",
                textAlign: "center",
                background: "#315c44",
                color: "#fff",
                padding: "0.9rem",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 800,
                marginTop: "0.8rem",
              }}
            >
              Create barter agreement
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
