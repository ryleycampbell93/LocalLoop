"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Listing = {
  id: string;
  title: string;
  person: string;
  town: string;
  offers: string;
  wants: string;
};

const demoListings: Listing[] = [
  {
    id: "mitre10-pambula-pickup",
    title: "Mitre 10 Pambula pickup",
    person: "Chris",
    town: "Pambula",
    offers:
      "Can collect a prepaid hardware order from Mitre 10 Pambula and bring it toward Cooma.",
    wants: "Firewood, fresh produce, or another useful local favour.",
  },
  {
    id: "merimbula-pharmacy-pickup",
    title: "Merimbula pharmacy pickup",
    person: "Emma",
    town: "Merimbula",
    offers:
      "Can collect eligible prepaid pharmacy items when already travelling inland.",
    wants: "Garden help, dog minding, or help moving a few items.",
  },
  {
    id: "click-and-collect-coast",
    title: "Click & Collect pickup",
    person: "Dan",
    town: "Merimbula",
    offers:
      "Heading from the coast toward Cooma and can collect a prepaid Click & Collect order.",
    wants: "Fresh eggs, mechanical help, trailer use, or another useful favour.",
  },
  {
    id: "firewood-cooma",
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
    offers:
      "Can deliver a ute load of firewood around Cooma and nearby areas.",
    wants: "Small carpentry work, welding help, or mower servicing.",
  },
  {
    id: "trailer-transport-jindabyne",
    title: "Trailer transport help",
    person: "Sarah",
    town: "Jindabyne",
    offers:
      "Can help move a mower, furniture or other suitable items with a trailer.",
    wants: "Garden cleanup, painting help, or computer assistance.",
  },
  {
    id: "fencing-bombala",
    title: "Need a hand with fencing",
    person: "Tom",
    town: "Bombala",
    offers:
      "Can trade livestock-yard cleanup, firewood or general farm help.",
    wants:
      "Someone experienced to help repair and tension a section of fencing.",
  },
  {
    id: "mechanical-cooma",
    title: "Small engine & mechanical help",
    person: "Riley",
    town: "Cooma",
    offers:
      "Can help with basic mower, small engine and mechanical jobs.",
    wants:
      "Carpentry, transport help, fresh produce, or another useful local trade.",
  },
];

function ProposeContent() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listing") || "";

  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [yourOffer, setYourOffer] = useState("");
  const [theirWork, setTheirWork] = useState("");
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

  useEffect(() => {
    if (listing) {
      setTheirWork(listing.offers);
    }
  }, [listing]);

  function saveProposal() {
    if (!listing || !yourOffer.trim()) return;

    const proposal = {
      listingId: listing.id,
      listingTitle: listing.title,
      listingTown: listing.town,
      otherPerson: listing.person === "You" ? "Listing owner" : listing.person,
      yourOffer: yourOffer.trim(),
      theirWork: theirWork.trim(),
      when: when.trim(),
      notes: notes.trim(),
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

  const displayPerson =
    listing.person === "You" ? "the listing owner" : listing.person;

  const subjectLabel =
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
        <p style={{ fontWeight: 800, color: "#315c44" }}>
          PROPOSE A BARTER
        </p>

        <h1 style={{ fontSize: "clamp(2rem, 8vw, 3.6rem)" }}>
          Make an offer to {displayPerson}
        </h1>

        <p style={{ color: "#666" }}>
          {listing.title} · {listing.town}
        </p>
      </section>

      <section className="card" style={{ marginBottom: "1rem" }}>
        <p>
          <strong>{subjectLabel} offers:</strong> {listing.offers}
        </p>

        <p>
          <strong>{subjectLabel} is looking for:</strong> {listing.wants}
        </p>
      </section>

      <section className="card" style={{ display: "grid", gap: "1rem" }}>
        <label>
          <strong>What can you offer in return?</strong>

          <textarea
            value={yourOffer}
            onChange={(e) => setYourOffer(e.target.value)}
            placeholder="Example: Two dozen fresh eggs, transport help, garden work..."
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
          <strong>What are you asking them to provide?</strong>

          <textarea
            value={theirWork}
            onChange={(e) => setTheirWork(e.target.value)}
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
            placeholder="Pickup point, materials, timing, special conditions..."
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
              Your actual proposal terms have been saved for the agreement.
            </p>

            <Link
              className="btn"
              href={`/agreement?listing=${listing.id}`}
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
