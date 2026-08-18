
"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Listing = {
  id: string;
  type?: "need" | "offer";
  title: string;
  person: string;
  town: string;
  offers: string;
  wants: string;
  from?: string;
  to?: string;
  route?: string;
};

const demoListings: Listing[] = [
  {
    id: "mitre10-pambula-pickup",
    type: "offer",
    title: "Mitre 10 Pambula pickup",
    person: "Chris",
    town: "Cooma",
    offers:
      "Can collect a prepaid hardware order from Mitre 10 Pambula and bring it toward Cooma.",
    wants: "Fresh produce, firewood or another useful local favour.",
    from: "Mitre 10, Pambula",
    to: "Cooma",
  },
  {
    id: "click-and-collect-coast",
    type: "offer",
    title: "Click & Collect pickup",
    person: "Dan",
    town: "Cooma",
    offers:
      "Can collect a prepaid Click & Collect order while travelling inland.",
    wants: "Fresh eggs, mechanical help or another useful favour.",
    from: "Merimbula",
    to: "Cooma",
  },
  {
    id: "mechanical-cooma",
    type: "offer",
    title: "Small engine & mechanical help",
    person: "Riley",
    town: "Cooma",
    offers:
      "Can help with mower, small engine and basic mechanical jobs.",
    wants: "Carpentry, transport help or another useful local trade.",
  },
];

function ProposeContent() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listing") || "";

  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [youProvide, setYouProvide] = useState("");
  const [youReceive, setYouReceive] = useState("");
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

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

    setLoaded(true);
  }, []);

  const listing = useMemo(() => {
    return [...savedListings, ...demoListings].find(
      (item) => item.id === listingId
    );
  }, [savedListings, listingId]);

  const isNeed = listing?.type === "need";

  useEffect(() => {
    if (!listing) return;

    if (listing.type === "need") {
      setYouProvide(listing.wants || "");
      setYouReceive(listing.offers || "");
    } else {
      setYouReceive(listing.offers || "");
    }
  }, [listing]);

  function sendOffer() {
    if (!listing || !youProvide.trim()) return;

    const otherPerson =
      listing.person === "You" ? "Listing owner" : listing.person;

    const offer = {
      id: `barter-${Date.now()}`,
      listingId: listing.id,
      title: listing.title,
      with: otherPerson,
      town: listing.town,
      status: "Pending",
      when: when.trim(),
      where:
        listing.from && listing.to
          ? `${listing.from} → ${listing.to}`
          : listing.town,
      youProvide: youProvide.trim(),
      theyProvide: youReceive.trim(),
      conditions: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("localloop-barters") || "[]"
      );

      const current = Array.isArray(existing) ? existing : [];

      localStorage.setItem(
        "localloop-barters",
        JSON.stringify([offer, ...current])
      );
    } catch {
      localStorage.setItem(
        "localloop-barters",
        JSON.stringify([offer])
      );
    }

    localStorage.setItem(
      "localloop-current-offer",
      JSON.stringify(offer)
    );

    setSent(true);
  }

  if (!loaded) {
    return (
      <main className="container" style={{ padding: "2rem 0" }}>
        Loading offer...
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="container" style={{ padding: "3rem 0" }}>
        <div className="card">
          <h1>Listing not found</h1>

          <Link className="btn" href="/browse">
            Back to browse
          </Link>
        </div>
      </main>
    );
  }

  const subject =
    listing.person === "You" ? "They" : listing.person;

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
        <p
          style={{
            color: "#315c44",
            fontWeight: 800,
            marginBottom: "0.4rem",
          }}
        >
          MAKE AN OFFER
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 8vw, 3.6rem)",
            marginBottom: "0.7rem",
          }}
        >
          {listing.title}
        </h1>

        <p style={{ marginBottom: 0 }}>
          {listing.town}
        </p>
      </section>

      <section className="card" style={{ marginBottom: "1rem" }}>
        {isNeed ? (
          <>
            <p>
              <strong>{subject} needs:</strong>
              <br />
              {listing.wants}
            </p>

            <p>
              <strong>{subject} offers in exchange:</strong>
              <br />
              {listing.offers}
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>{subject} offers:</strong>
              <br />
              {listing.offers}
            </p>

            <p>
              <strong>{subject} would like:</strong>
              <br />
              {listing.wants}
            </p>
          </>
        )}

        {listing.from && listing.to && (
          <div
            style={{
              background: "#eef4ef",
              padding: "0.9rem",
              borderRadius: 12,
              marginTop: "1rem",
            }}
          >
            <strong>Route</strong>
            <br />
            {listing.from} → {listing.to}
          </div>
        )}
      </section>

      {!sent ? (
        <section className="card" style={{ display: "grid", gap: "1rem" }}>
          <label>
            <strong>You will provide</strong>

            <textarea
              value={youProvide}
              onChange={(e) => setYouProvide(e.target.value)}
              placeholder="What will you do or provide?"
              style={{
                width: "100%",
                minHeight: 100,
                marginTop: 8,
                padding: "0.9rem",
                borderRadius: 12,
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label>
            <strong>You will receive</strong>

            <textarea
              value={youReceive}
              onChange={(e) => setYouReceive(e.target.value)}
              placeholder="What will you receive in exchange?"
              style={{
                width: "100%",
                minHeight: 100,
                marginTop: 8,
                padding: "0.9rem",
                borderRadius: 12,
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label>
            <strong>When?</strong>
            <span style={{ color: "#777" }}> Optional</span>

            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="Saturday morning, next week..."
              style={{
                width: "100%",
                marginTop: 8,
                padding: "0.9rem",
                borderRadius: 12,
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label>
            <strong>Anything else?</strong>
            <span style={{ color: "#777" }}> Optional</span>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Loading, pickup details, condition, equipment..."
              style={{
                width: "100%",
                minHeight: 90,
                marginTop: 8,
                padding: "0.9rem",
                borderRadius: 12,
                border: "1px solid #ccc",
              }}
            />
          </label>

          <button
            className="btn"
            onClick={sendOffer}
            disabled={!youProvide.trim()}
          >
            Send offer
          </button>

          <p
            style={{
              fontSize: "0.85rem",
              textAlign: "center",
              margin: 0,
            }}
          >
            If the other person accepts, LocalLoop will create a deal summary
            automatically.
          </p>
        </section>
      ) : (
        <section
          style={{
            background: "#eef4ef",
            borderRadius: 18,
            padding: "1.3rem",
          }}
        >
          <h2>Offer sent ✓</h2>

          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p>
              <strong>You provide:</strong>
              <br />
              {youProvide}
            </p>

            <p style={{ marginBottom: 0 }}>
              <strong>You receive:</strong>
              <br />
              {youReceive}
            </p>
          </div>

          <div style={{ display: "grid", gap: "0.8rem" }}>
            <Link className="btn" href="/barters">
              View My Barters
            </Link>

            <Link
              href={`/messages?listing=${listing.id}`}
              style={{
                textAlign: "center",
                background: "#f4efe3",
                color: "#315c44",
                padding: "0.9rem",
                borderRadius: 12,
                fontWeight: 800,
              }}
            >
              Message about this offer
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

export default function ProposePage() {
  return (
    <Suspense
      fallback={
        <main className="container" style={{ padding: "2rem 0" }}>
          Loading offer...
        </main>
      }
    >
      <ProposeContent />
    </Suspense>
  );
}
