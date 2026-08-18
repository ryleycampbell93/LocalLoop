"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Barter = {
  id: string;
  listingId: string;
  title: string;
  with: string;
  town: string;
  status: string;
  when: string;
  where: string;
  youProvide: string;
  theyProvide: string;
  materials?: string;
  conditions?: string;
  acceptedAt?: string;
};

export default function BartersPage() {
  const [barters, setBarters] = useState<Barter[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("localloop-barters") || "[]"
      );

      if (Array.isArray(stored)) {
        setBarters(stored);
      }
    } catch {
      setBarters([]);
    }

    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <main className="container" style={{ padding: "2rem 0" }}>
        Loading your barters...
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
          MY BARTERS
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 8vw, 3.6rem)",
            marginBottom: "0.7rem",
          }}
        >
          Your LocalLoop deals
        </h1>

        <p style={{ color: "#666", marginBottom: 0 }}>
          Track proposals, accepted agreements and completed exchanges.
        </p>
      </section>

      {barters.length === 0 ? (
        <section
          style={{
            background: "#fff",
            border: "1px solid #ded8cd",
            borderRadius: 18,
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <h2>No barters yet</h2>

          <p>
            Once you accept a barter agreement, it will appear here.
          </p>

          <Link
            href="/browse"
            style={{
              display: "inline-block",
              background: "#315c44",
              color: "#fff",
              padding: "0.9rem 1rem",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
              marginTop: "0.8rem",
            }}
          >
            Browse offers
          </Link>
        </section>
      ) : (
        <section style={{ display: "grid", gap: "1rem" }}>
          {barters.map((barter) => (
            <article
              key={barter.id}
              style={{
                background: "#fff",
                border: "1px solid #ded8cd",
                borderRadius: 20,
                padding: "1.2rem",
                boxShadow: "0 8px 24px rgba(36, 48, 40, 0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#315c44",
                      fontWeight: 800,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {barter.with} · {barter.town}
                  </p>

                  <h2 style={{ margin: 0 }}>{barter.title}</h2>
                </div>

                <span
                  style={{
                    background: "#eef4ef",
                    color: "#315c44",
                    borderRadius: 999,
                    padding: "0.4rem 0.7rem",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  {barter.status} ✓
                </span>
              </div>

              <div
                style={{
                  background: "#f8f6f1",
                  borderRadius: 14,
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ marginBottom: "0.7rem" }}>
                  <strong>You provide:</strong>
                  <br />
                  {barter.youProvide || "Not specified"}
                </p>

                <p style={{ marginBottom: "0.7rem" }}>
                  <strong>{barter.with} provides:</strong>
                  <br />
                  {barter.theyProvide || "Not specified"}
                </p>

                {barter.when && (
                  <p style={{ marginBottom: "0.7rem" }}>
                    <strong>When:</strong> {barter.when}
                  </p>
                )}

                {barter.where && (
                  <p style={{ marginBottom: "0.7rem" }}>
                    <strong>Where:</strong> {barter.where}
                  </p>
                )}

                {barter.materials && (
                  <p style={{ marginBottom: "0.7rem" }}>
                    <strong>Materials / equipment:</strong> {barter.materials}
                  </p>
                )}

                {barter.conditions && (
                  <p style={{ margin: 0 }}>
                    <strong>Conditions:</strong> {barter.conditions}
                  </p>
                )}
              </div>

              <div style={{ display: "grid", gap: "0.8rem" }}>
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
                  }}
                >
                  View agreement
                </Link>

                <Link
                  href={`/messages?listing=${barter.listingId}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#f4efe3",
                    color: "#315c44",
                    padding: "0.9rem",
                    borderRadius: 12,
                    textDecoration: "none",
                    fontWeight: 800,
                  }}
                >
                  Message {barter.with}
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
