"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Barter = {
  id: string;
  listingId: string;
  title: string;
  with: string;
  town: string;
  status: "Pending" | "Accepted" | "Completed";
  when?: string;
  where?: string;
  youProvide: string;
  theyProvide: string;
  conditions?: string;
  createdAt?: string;
  acceptedAt?: string;
  completedAt?: string;
  receiptId?: string;
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

  function saveBarters(next: Barter[]) {
    setBarters(next);
    localStorage.setItem("localloop-barters", JSON.stringify(next));
  }

  function acceptDeal(id: string) {
    const next = barters.map((barter) => {
      if (barter.id !== id) return barter;

      return {
        ...barter,
        status: "Accepted" as const,
        acceptedAt: new Date().toISOString(),
        receiptId:
          barter.receiptId ||
          `LL-${Date.now().toString().slice(-8)}`,
      };
    });

    saveBarters(next);
  }

  function completeDeal(id: string) {
    const next = barters.map((barter) => {
      if (barter.id !== id) return barter;

      return {
        ...barter,
        status: "Completed" as const,
        completedAt: new Date().toISOString(),
      };
    });

    saveBarters(next);
  }

  const counts = useMemo(() => {
    return {
      pending: barters.filter((item) => item.status === "Pending").length,
      accepted: barters.filter((item) => item.status === "Accepted").length,
      completed: barters.filter((item) => item.status === "Completed").length,
    };
  }, [barters]);

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

        <p style={{ color: "#666", marginBottom: "1rem" }}>
          Keep it simple: send an offer, accept the deal, then mark it complete.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "0.6rem",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "0.8rem",
              textAlign: "center",
            }}
          >
            <strong>{counts.pending}</strong>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>Pending</div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "0.8rem",
              textAlign: "center",
            }}
          >
            <strong>{counts.accepted}</strong>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>Accepted</div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "0.8rem",
              textAlign: "center",
            }}
          >
            <strong>{counts.completed}</strong>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>Completed</div>
          </div>
        </div>
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
            When you send or receive an offer, it will appear here.
          </p>

          <Link className="btn" href="/browse">
            Browse listings
          </Link>
        </section>
      ) : (
        <section style={{ display: "grid", gap: "1rem" }}>
          {barters.map((barter) => {
            const isPending = barter.status === "Pending";
            const isAccepted = barter.status === "Accepted";
            const isCompleted = barter.status === "Completed";

            return (
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
                    alignItems: "flex-start",
                    gap: "1rem",
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
                      background: isPending
                        ? "#fff3d9"
                        : isCompleted
                        ? "#e9eee7"
                        : "#eef4ef",
                      color: "#315c44",
                      borderRadius: 999,
                      padding: "0.4rem 0.7rem",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {barter.status}
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
                    {barter.youProvide}
                  </p>

                  <p style={{ marginBottom: "0.7rem" }}>
                    <strong>You receive:</strong>
                    <br />
                    {barter.theyProvide}
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

                  {barter.conditions && (
                    <p style={{ marginBottom: 0 }}>
                      <strong>Notes:</strong> {barter.conditions}
                    </p>
                  )}
                </div>

                {isPending && (
                  <div style={{ display: "grid", gap: "0.8rem" }}>
                    <button
                      className="btn"
                      onClick={() => acceptDeal(barter.id)}
                    >
                      Accept deal
                    </button>

                    <Link
                      href={`/messages?listing=${barter.listingId}`}
                      style={{
                        textAlign: "center",
                        background: "#f4efe3",
                        color: "#315c44",
                        padding: "0.9rem",
                        borderRadius: 12,
                        fontWeight: 800,
                      }}
                    >
                      Message about offer
                    </Link>
                  </div>
                )}

                {isAccepted && (
                  <div style={{ display: "grid", gap: "0.8rem" }}>
                    <div
                      style={{
                        background: "#eef4ef",
                        borderRadius: 14,
                        padding: "1rem",
                      }}
                    >
                      <h3 style={{ marginTop: 0 }}>Deal confirmed ✓</h3>

                      <p style={{ marginBottom: "0.4rem" }}>
                        <strong>Barter Receipt:</strong>{" "}
                        {barter.receiptId}
                      </p>

                      <p style={{ marginBottom: 0, fontSize: "0.9rem" }}>
                        LocalLoop has recorded what both sides agreed to.
                      </p>
                    </div>

                    <button
                      className="btn"
                      onClick={() => completeDeal(barter.id)}
                    >
                      Mark as completed
                    </button>

                    <Link
                      href={`/messages?listing=${barter.listingId}`}
                      style={{
                        textAlign: "center",
                        background: "#f4efe3",
                        color: "#315c44",
                        padding: "0.9rem",
                        borderRadius: 12,
                        fontWeight: 800,
                      }}
                    >
                      Message about deal
                    </Link>
                  </div>
                )}

                {isCompleted && (
                  <div
                    style={{
                      background: "#eef4ef",
                      borderRadius: 14,
                      padding: "1rem",
                    }}
                  >
                    <h3 style={{ marginTop: 0 }}>Barter completed ✓</h3>

                    <p style={{ marginBottom: "0.8rem" }}>
                      Receipt: {barter.receiptId || "Saved"}
                    </p>

                    <button
                      type="button"
                      style={{
                        width: "100%",
                        border: "1px solid #315c44",
                        background: "#fff",
                        color: "#315c44",
                        padding: "0.9rem",
                        borderRadius: 12,
                        fontWeight: 800,
                      }}
                    >
                      Leave a review
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      )}

      <section
        style={{
          marginTop: "1.2rem",
          background: "#f4efe3",
          borderRadius: 16,
          padding: "1rem",
        }}
      >
        <strong>How LocalLoop deals work</strong>

        <p style={{ marginBottom: 0 }}>
          Accepting a deal creates a simple record of the agreed exchange.
          Standard LocalLoop policies apply to all users and listings.
        </p>
      </section>
    </main>
  );
}
