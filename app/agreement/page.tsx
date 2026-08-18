"use client";

import Link from "next/link";
import { useState } from "react";

export default function AgreementPage() {
  const [partyA, setPartyA] = useState("Ryley");
  const [partyAProvides, setPartyAProvides] = useState(
    "Small carpentry repairs and installation work"
  );

  const [partyB, setPartyB] = useState("You");
  const [partyBProvides, setPartyBProvides] = useState(
    "Mechanical work / lawn mower service"
  );

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [materials, setMaterials] = useState("");
  const [conditions, setConditions] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [changeRequested, setChangeRequested] = useState(false);

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
          Confirm exactly what each person is providing before the barter begins.
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
            placeholder="Example: Saturday 10am or within 7 days"
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
            placeholder="Example: Ryley supplies tools. You supply replacement parts."
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
            placeholder="Access, cleanup, pickup, cancellations, special conditions..."
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
            onClick={() => {
              setAccepted(true);
              setChangeRequested(false);
            }}
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
                Update the agreement above, then both people can review the new
                version before accepting.
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
            This prototype now treats the current terms as the agreed version.
          </p>

          <p style={{ color: "#666" }}>
            In the production app, this is where we’ll save the agreement version,
            acceptance timestamps and both users’ confirmation.
          </p>

          <Link
            href="/profile"
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
