"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const listings = {
  "carpentry-cooma": {
    title: "Carpentry & small repairs",
    person: "Riley",
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

function ProposeContent() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listing") || "carpentry-cooma";

  const listing = useMemo(() => {
    return (
      listings[listingId as keyof typeof listings] ||
      listings["carpentry-cooma"]
    );
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
        <p style={{ fontWeight: 800, color: "#315c44" }}>
          PROPOSE A BARTER
        </p>

        <h1 style={{ fontSize: "clamp(2rem, 8vw, 3.6rem)" }}>
          Make an offer to {listing.person}
        </h1>

        <p style={{ color: "#666" }}>
          {listing.title} · {listing.town}
        </p>
      </section>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <p>
          <strong>{listing.person} offers:</strong> {listing.offers}
        </p>
        <p>
          <strong>{listing.person} is looking for:</strong> {listing.wants}
        </p>
      </section>

      <section className="card" style={{ display: "grid", gap: "1rem" }}>
        <label>
          <strong>What can you offer in return?</strong>
          <textarea
            value={yourOffer}
            onChange={(e) => setYourOffer(e.target.value)}
            placeholder="Example: I can service your lawn mower and replace the blades."
            style={{ width: "100%", minHeight: 110, marginTop: 8 }}
          />
        </label>

        <label>
          <strong>What are you asking them to provide?</strong>
          <textarea
            value={theirWork}
            onChange={(e) => setTheirWork(e.target.value)}
            style={{ width: "100%", minHeight: 100, marginTop: 8 }}
          />
        </label>

        <label>
          <strong>When?</strong>
          <input
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            placeholder="Example: Saturday morning"
            style={{ width: "100%", marginTop: 8 }}
          />
        </label>

        <label>
          <strong>Anything else to agree on?</strong>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tools, materials, pickup, timing, special conditions..."
            style={{ width: "100%", minHeight: 100, marginTop: 8 }}
          />
        </label>

        {!submitted ? (
          <button
            className="btn"
            onClick={() => setSubmitted(true)}
            disabled={!yourOffer.trim()}
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
            <h3>Proposal ready ✓</h3>

            <p>
              Next, turn the proposed exchange into a written barter agreement.
            </p>

            <Link
              className="btn"
              href={`/agreement?listing=${listingId}`}
            >
              Create barter agreement
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default function ProposePage() {
  return (
    <Suspense
      fallback={
        <main className="container" style={{ padding: "2rem 0" }}>
          Loading proposal...
        </main>
      }
    >
      <ProposeContent />
    </Suspense>
  );
}
