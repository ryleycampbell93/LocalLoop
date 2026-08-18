"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Proposal = {
  listingId: string;
  listingTitle: string;
  listingTown: string;
  otherPerson: string;
  yourOffer: string;
  theirWork: string;
  when: string;
  notes: string;
  createdAt: string;
};

export default function AgreementPage() {
  const [loaded, setLoaded] = useState(false);
  const [proposal, setProposal] = useState<Proposal | null>(null);

  const [partyA, setPartyA] = useState("");
  const [partyAProvides, setPartyAProvides] = useState("");
  const [partyB, setPartyB] = useState("You");
  const [partyBProvides, setPartyBProvides] = useState("");

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [materials, setMaterials] = useState("");
  const [conditions, setConditions] = useState("");

  const [accepted, setAccepted] = useState(false);
  const [changeRequested, setChangeRequested] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("localloop-current-proposal");

      if (stored) {
        const parsed: Proposal = JSON.parse(stored);

        setProposal(parsed);
        setPartyA(parsed.otherPerson || "Listing owner");
        setPartyAProvides(parsed.theirWork || "");
        setPartyB("You");
        setPartyBProvides(parsed.yourOffer || "");
        setDate(parsed.when || "");
        setLocation(parsed.listingTown || "");
        setConditions(parsed.notes || "");
      }
    } catch {
      setProposal(null);
    }

    setLoaded(true);
  }, []);

  function acceptAgreement() {
    const barter = {
      id: `barter-${Date.now()}`,
      listingId: proposal?.listingId || "",
      title: proposal?.listingTitle || "LocalLoop barter",
      with: partyA,
      town: proposal?.listingTown || location,
      status: "Agreed",
      when: date,
      where: location,
      youProvide: partyBProvides,
      theyProvide: partyAProvides,
      materials,
      conditions,
      acceptedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("localloop-barters") || "[]"
      );

      const current = Array.isArray(existing) ? existing : [];

      localStorage.setItem(
        "localloop-barters",
        JSON.stringify([barter, ...current])
      );
    } catch {
      localStorage.setItem(
        "localloop-barters",
        JSON.stringify([barter])
      );
    }

    setAccepted(true);
    setChangeRequested(false);
  }

  if (!loaded) {
    return (
      <main className="container" style={{ padding: "2rem 0" }}>
        Loading agreement...
      </main>
    );
  }

  if (!proposal) {
    return (
      <main className="container" style={{ padding: "3rem 0" }}>
        <div className="card">
          <h1>No proposal found</h1>

          <p>
            Start from a listing and create a barter proposal before making an
            agreement.
          </p>

          <Link className="btn" href="/browse">
            Browse listings
          </Link>
        </div>
      </main>
    );
  }

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
          BARTER AGREEMENT
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 8vw, 3.6rem)",
            marginBottom: "0.7rem",
          }}
        >
          Put the deal in writing
        </h1>

        <p style={{ color: "#666", marginBottom: 0 }}>
          {proposal.listingTitle} · {proposal.listingTown}
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #ded8cd",
            borderRadius: 18,
            padding: "1.2rem",
          }}
        >
          <label>
            <strong>Party A</strong>

            <input
              value={partyA}
              onChange={(e) => setPartyA(e.target.value)}
              style={{
                width: "100%",
                marginTop: "0.5rem",
                padding: "0.9rem",
                borderRadius: 12,
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ display: "block", marginTop: "1rem" }}>
            <strong>What Party A provides</strong>

            <textarea
              value={partyAProvides}
              onChange={(e) => setPartyAProvides(e.target.value)}
              style={{
                width: "100%",
                minHeight: 100,
                marginTop: "0.5rem",
                padding: "0.9rem",
                borderRadius: 12,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #ded8cd",
            borderRadius: 18,
            padding: "1.2rem",
          }}
        >
          <label>
            <strong>Party B</strong>

            <input
              value={partyB}
              onChange={(e) => setPartyB(e.target.value)}
              style={{
                width: "100%",
                marginTop: "0.5rem",
                padding: "0.9rem",
                borderRadius: 12,
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ display: "block", marginTop: "1rem" }}>
            <strong>What Party B provides</strong>

            <textarea
              value={partyBProvides}
              onChange={(e) => setPartyBProvides(e.target.value)}
              style={{
                width: "100%",
                minHeight: 100,
                marginTop: "0.5rem",
                padding: "0.9rem",
                borderRadius: 12,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          background: "#fff",
          border: "1px solid #ded8cd",
          borderRadius: 18,
          padding: "1.2rem",
          marginBottom: "1rem",
        }}
      >
        <label>
          <strong>Date / timeframe</strong>

          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Example: Saturday 10am"
            style={{
              width: "100%",
              marginTop: "0.5rem",
              padding: "0.9rem",
              borderRadius: 12,
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          <strong>Location</strong>

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Town, suburb, pickup point or remote"
            style={{
              width: "100%",
              marginTop: "0.5rem",
              padding: "0.9rem",
              borderRadius: 12,
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          <strong>Who supplies materials / equipment?</strong>

          <textarea
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            placeholder="Tools, fuel, materials, replacement parts..."
            style={{
              width: "100%",
              minHeight: 90,
              marginTop: "0.5rem",
              padding: "0.9rem",
              borderRadius: 12,
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          <strong>Other conditions</strong>

          <textarea
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            placeholder="Pickup details, access, cleanup, special conditions..."
            style={{
              width: "100%",
              minHeight: 100,
              marginTop: "0.5rem",
              padding: "0.9rem",
              borderRadius: 12,
              border: "1px solid #ccc",
            }}
          />
        </label>
      </section>

      <section
        style={{
          background: "#f8f6f1",
          borderRadius: 18,
          padding: "1.2rem",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Agreement summary</h2>

        <p>
          <strong>{partyA}</strong> agrees to provide:
          <br />
          {partyAProvides}
        </p>

        <p>
          <strong>{partyB}</strong> agrees to provide:
          <br />
          {partyBProvides}
        </p>

        {date && (
          <p>
            <strong>When:</strong> {date}
          </p>
        )}

        {location && (
          <p>
            <strong>Where:</strong> {location}
          </p>
        )}

        {materials && (
          <p>
            <strong>Materials / equipment:</strong> {materials}
          </p>
        )}

        {conditions && (
          <p>
            <strong>Conditions:</strong> {conditions}
          </p>
        )}
      </section>

      {!accepted ? (
        <section style={{ display: "grid", gap: "0.8rem" }}>
          <button
            onClick={acceptAgreement}
            style={{
              border: 0,
              background: "#315c44",
              color: "#fff",
              padding: "1rem",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: "1rem",
            }}
          >
            Accept agreement
          </button>

          <button
            onClick={() => setChangeRequested(true)}
            style={{
              border: "1px solid #315c44",
              background: "#fff",
              color: "#315c44",
              padding: "1rem",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: "1rem",
            }}
          >
            Request changes
          </button>

          {changeRequested && (
            <div
              style={{
                background: "#fff3d9",
                borderRadius: 14,
                padding: "1rem",
              }}
            >
              <strong>Change requested.</strong>

              <p style={{ marginBottom: 0 }}>
                Update the agreement above, then review the revised version
                before accepting.
              </p>
            </div>
          )}
        </section>
      ) : (
        <section
          style={{
            background: "#eef4ef",
            borderRadius: 18,
            padding: "1.2rem",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Agreement accepted ✓</h2>

          <p>
            This barter has now been saved to My Barters on this device.
          </p>

          <p style={{ color: "#666" }}>
            LocalLoop records the terms agreed between users. The prototype does
            not guarantee or perform the exchange itself.
          </p>

          <Link
            href="/barters"
            style={{
              display: "block",
              textAlign: "center",
              background: "#315c44",
              color: "#fff",
              padding: "1rem",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
              marginTop: "1rem",
            }}
          >
            View my barters
          </Link>
        </section>
      )}
    </main>
  );
}
