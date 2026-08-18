
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
  category?: string;
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
    wants: "Firewood, fresh produce, or another useful local favour.",
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
      "Heading from the coast toward Cooma and can collect a prepaid Click & Collect order.",
    wants: "Fresh eggs, mechanical help, trailer use, or another useful favour.",
    from: "Merimbula",
    to: "Cooma",
  },
  {
    id: "firewood-cooma",
    type: "offer",
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
    offers:
      "Can deliver a ute load of firewood around Cooma and nearby areas.",
    wants: "Small carpentry work, welding help, or mower servicing.",
  },
];

function ProposeContent() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listing") || "";

  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [whatYouProvide, setWhatYouProvide] = useState("");
  const [whatYouReceive, setWhatYouReceive] = useState("");
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
      // Listing owner needs work and is offering something in exchange.
      setWhatYouProvide(listing.wants || "");
      setWhatYouReceive(listing.offers || "");
    } else {
      // Listing owner is offering something and wants something back.
      setWhatYouProvide("");
      setWhatYouReceive(listing.offers || "");
    }
  }, [listing]);

  function saveProposal() {
    if (!listing || !whatYouProvide.trim()) return;

    const proposal = {
      listingId: listing.id,
      listingTitle: listing.title,
      listingTown: listing.town,

      otherPerson:
        listing.person === "You" ? "Listing owner" : listing.person,

      // Party B / responder provides this:
      yourOffer: whatYouProvide.trim(),

      // Party A / listing owner provides this:
      theirWork: whatYouReceive.trim(),

      when: when.trim(),
      notes: notes.trim(),

      from: listing.from || "",
      to: listing.to || "",
      route: listing.route || "",

      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "localloop-current-proposal",
      JSON.stringify(proposal)
    );

    setSubmitted(true);
  }

  if (!loaded) {
    return (
      <main className="container" style={{ padding: "2rem 0" }}>
        Loading proposal...
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="container" style={{ padding: "3rem 0" }}>
        <div className="card">
          <h1>Listing not found</h1>
          <p>We couldn’t find the listing for this proposal.</p>

          <Link className="btn" href="/browse">
            Back to browse
          </Link>
        </div>
      </main>
    );
  }

  const ownerName =
    listing.person === "You" ? "the listing owner" : listing.person;

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
            fontWeight: 800,
            color: "#315c44",
            marginBottom: "0.4rem",
          }}
        >
          PROPOSE A BARTER
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 8vw, 3.6rem)",
            marginBottom: "0.7rem",
          }}
        >
          Make an offer to {ownerName}
        </h1>

        <p style={{ marginBottom: 0 }}>
          {listing.title} · {listing.town}
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
              <strong>{subject} is offering in exchange:</strong>
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
              <strong>{subject} would like in exchange:</strong>
              <br />
              {listing.wants}
            </p>
          </>
        )}

        {(listing.from || listing.to) && (
          <div
            style={{
              marginTop: "1rem",
              background: "#eef4ef",
              padding: "0.9rem",
              borderRadius: 12,
            }}
          >
            <strong>Route:</strong>
            <br />
            {listing.from || "Pickup"} → {listing.to || listing.town}
          </div>
        )}
      </section>

      <section className="card" style={{ display: "grid", gap: "1rem" }}>
        <label>
          <strong>
            {isNeed
              ? "What are you proposing to provide?"
              : "What can you offer in return?"}
          </strong>

          <textarea
            value={whatYouProvide}
            onChange={(e) => setWhatYouProvide(e.target.value)}
            placeholder={
              isNeed
                ? "Example: I can pick up and transport the tractor."
                : "Example: Two dozen fresh eggs, mechanical help, garden work..."
            }
            style={{
              width: "100%",
              minHeight: 110,
              marginTop: 8,
              padding: "0.9rem",
              borderRadius: 12,
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          <strong>
            {isNeed
              ? "What would you receive in exchange?"
              : "What are you asking them to provide?"}
          </strong>

          <textarea
            value={whatYouReceive}
            onChange={(e) => setWhatYouReceive(e.target.value)}
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

          <input
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            placeholder="Example: Saturday morning"
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
          <strong>Anything else to agree on?</strong>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Pickup point, loading, fuel, timing, equipment, special conditions..."
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

        {!submitted ? (
          <button
            className="btn"
            onClick={saveProposal}
            disabled={!whatYouProvide.trim()}
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
              The exchange now reads correctly from both sides.
            </p>

            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              <p>
                <strong>You provide:</strong>
                <br />
                {whatYouProvide}
              </p>

              <p style={{ marginBottom: 0 }}>
                <strong>{subject} provides:</strong>
                <br />
                {whatYouReceive}
              </p>
            </div>

            <Link className="btn" href="/agreement">
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
