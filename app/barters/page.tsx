"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Offer = {
  id: string;
  listingId: string;
  listingTitle: string;
  listingOwner?: string;
  offerType: string;
  offerText: string;
  message?: string;
  status: "pending" | "accepted" | "declined" | "countered" | "completed";
  createdAt: string;
  counterText?: string;
};

export default function MyDealsPage() {
  const router = useRouter();

  const [offers, setOffers] = useState<Offer[]>([]);
  const [counterId, setCounterId] = useState<string | null>(null);
  const [counterText, setCounterText] = useState("");

  useEffect(() => {
    loadOffers();
  }, []);

  function loadOffers() {
    try {
      const stored = JSON.parse(
        localStorage.getItem("localLoopOffers") || "[]"
      );

      setOffers(Array.isArray(stored) ? stored : []);
    } catch {
      setOffers([]);
    }
  }

  function saveOffers(updated: Offer[]) {
    setOffers(updated);

    localStorage.setItem(
      "localLoopOffers",
      JSON.stringify(updated)
    );
  }

  function changeStatus(
    id: string,
    status: Offer["status"]
  ) {
    const updated = offers.map((offer) =>
      offer.id === id
        ? { ...offer, status }
        : offer
    );

    saveOffers(updated);
  }

  function sendCounter(id: string) {
    if (!counterText.trim()) return;

    const updated = offers.map((offer) =>
      offer.id === id
        ? {
            ...offer,
            status: "countered" as const,
            counterText: counterText.trim(),
          }
        : offer
    );

    saveOffers(updated);
    setCounterId(null);
    setCounterText("");
  }

  function deleteDeal(id: string) {
    const confirmed = window.confirm(
      "Remove this completed deal from your history?"
    );

    if (!confirmed) return;

    const updated = offers.filter(
      (offer) => offer.id !== id
    );

    saveOffers(updated);
  }

  const incoming = offers.filter(
    (offer) =>
      offer.status === "pending" ||
      offer.status === "countered"
  );

  const active = offers.filter(
    (offer) => offer.status === "accepted"
  );

  const completed = offers.filter(
    (offer) =>
      offer.status === "completed" ||
      offer.status === "declined"
  );

  function typeLabel(type: string) {
    switch (type) {
      case "item":
        return "📦 Item";
      case "service":
        return "🛠️ Service";
      case "labour":
        return "💪 Labour";
      case "transport":
        return "🛻 Transport";
      default:
        return "🔄 Other";
    }
  }

  const sectionTitle = {
    fontSize: 22,
    margin: "0 0 12px",
  };

  const cardStyle = {
    background: "#fff",
    border: "1px solid #dedbd3",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  };

  const mainButton = {
    border: 0,
    borderRadius: 12,
    padding: "12px 14px",
    background: "#214d3d",
    color: "#fff",
    fontWeight: 800,
    fontSize: 14,
  };

  const lightButton = {
    border: 0,
    borderRadius: 12,
    padding: "12px 14px",
    background: "#f1eee6",
    color: "#214d3d",
    fontWeight: 800,
    fontSize: 14,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f6f1",
        padding: "24px 16px 70px",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <p
          style={{
            color: "#315c44",
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "0.08em",
            margin: "0 0 7px",
          }}
        >
          LOCALLOOP
        </p>

        <h1
          style={{
            margin: "0 0 7px",
            fontSize: 38,
            lineHeight: 1,
          }}
        >
          My Deals
        </h1>

        <p
          style={{
            margin: "0 0 30px",
            color: "#70746f",
            lineHeight: 1.5,
          }}
        >
          Review offers, agree on the details and keep track
          of your LocalLoop deals.
        </p>

        <section style={{ marginBottom: 34 }}>
          <h2 style={sectionTitle}>
            Incoming Offers
          </h2>

          {incoming.length === 0 ? (
            <div style={cardStyle}>
              <p
                style={{
                  margin: 0,
                  color: "#7b7f79",
                }}
              >
                No new offers at the moment.
              </p>
            </div>
          ) : (
            incoming.map((offer) => (
              <div key={offer.id} style={cardStyle}>
                <div
                  style={{
                    color: "#315c44",
                    fontSize: 13,
                    fontWeight: 900,
                    marginBottom: 6,
                  }}
                >
                  {typeLabel(offer.offerType)}
                </div>

                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: 20,
                  }}
                >
                  {offer.listingTitle}
                </h3>

                {offer.listingOwner && (
                  <p
                    style={{
                      color: "#81857f",
                      fontSize: 13,
                      margin: "0 0 14px",
                    }}
                  >
                    Listing by {offer.listingOwner}
                  </p>
                )}

                <div
                  style={{
                    background: "#f5f6f3",
                    borderRadius: 13,
                    padding: 13,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 900,
                      color: "#747a74",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}
                  >
                    Offer
                  </div>

                  <div
                    style={{
                      lineHeight: 1.45,
                    }}
                  >
                    {offer.offerText}
                  </div>
                </div>

                {offer.message && (
                  <p
                    style={{
                      color: "#60655f",
                      lineHeight: 1.45,
                      margin: "0 0 14px",
                    }}
                  >
                    “{offer.message}”
                  </p>
                )}

                {offer.status === "countered" &&
                  offer.counterText && (
                    <div
                      style={{
                        background: "#fff7e6",
                        borderRadius: 13,
                        padding: 13,
                        marginBottom: 14,
                      }}
                    >
                      <strong>Counter offer:</strong>
                      <div style={{ marginTop: 4 }}>
                        {offer.counterText}
                      </div>
                    </div>
                  )}

                {counterId === offer.id ? (
                  <div>
                    <textarea
                      value={counterText}
                      onChange={(e) =>
                        setCounterText(e.target.value)
                      }
                      placeholder="What would work better for you?"
                      rows={3}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: 12,
                        padding: 12,
                        fontSize: 15,
                        marginBottom: 9,
                      }}
                    />

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                      }}
                    >
                      <button
                        onClick={() =>
                          sendCounter(offer.id)
                        }
                        style={mainButton}
                      >
                        Send counter
                      </button>

                      <button
                        onClick={() => {
                          setCounterId(null);
                          setCounterText("");
                        }}
                        style={lightButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(3, 1fr)",
                      gap: 8,
                    }}
                  >
                    <button
                      onClick={() =>
                        changeStatus(
                          offer.id,
                          "accepted"
                        )
                      }
                      style={mainButton}
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        setCounterId(offer.id)
                      }
                      style={lightButton}
                    >
                      Counter
                    </button>

                    <button
                      onClick={() =>
                        changeStatus(
                          offer.id,
                          "declined"
                        )
                      }
                      style={{
                        ...lightButton,
                        color: "#8b2e2e",
                      }}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </section>

        <section style={{ marginBottom: 34 }}>
          <h2 style={sectionTitle}>
            Active Deals
          </h2>

          {active.length === 0 ? (
            <div style={cardStyle}>
              <p
                style={{
                  margin: 0,
                  color: "#7b7f79",
                }}
              >
                No active deals yet.
              </p>
            </div>
          ) : (
            active.map((offer) => (
              <div key={offer.id} style={cardStyle}>
                <div
                  style={{
                    display: "inline-block",
                    background: "#e7f1ea",
                    color: "#214d3d",
                    borderRadius: 999,
                    padding: "6px 9px",
                    fontSize: 11,
                    fontWeight: 900,
                    marginBottom: 10,
                  }}
                >
                  DEAL AGREED
                </div>

                <h3
                  style={{
                    margin: "0 0 7px",
                    fontSize: 20,
                  }}
                >
                  {offer.listingTitle}
                </h3>

                <p
                  style={{
                    margin: "0 0 16px",
                    color: "#575c57",
                    lineHeight: 1.45,
                  }}
                >
                  <strong>Your deal:</strong>{" "}
                  {offer.offerText}
                </p>

                {offer.counterText && (
                  <p
                    style={{
                      margin: "0 0 16px",
                      color: "#575c57",
                    }}
                  >
                    <strong>Agreed counter:</strong>{" "}
                    {offer.counterText}
                  </p>
                )}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  <button
                    onClick={() =>
                      router.push(
                        `/messages?listing=${encodeURIComponent(
                          offer.listingId
                        )}&title=${encodeURIComponent(
                          offer.listingTitle
                        )}`
                      )
                    }
                    style={lightButton}
                  >
                    Open chat
                  </button>

                  <button
                    onClick={() =>
                      changeStatus(
                        offer.id,
                        "completed"
                      )
                    }
                    style={mainButton}
                  >
                    Mark complete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        <section>
          <h2 style={sectionTitle}>
            Completed
          </h2>

          {completed.length === 0 ? (
            <div style={cardStyle}>
              <p
                style={{
                  margin: 0,
                  color: "#7b7f79",
                }}
              >
                Completed deals will appear here.
              </p>
            </div>
          ) : (
            completed.map((offer) => (
              <div key={offer.id} style={cardStyle}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    marginBottom: 8,
                    color:
                      offer.status === "declined"
                        ? "#8b2e2e"
                        : "#315c44",
                  }}
                >
                  {offer.status === "declined"
                    ? "DECLINED"
                    : "COMPLETED"}
                </div>

                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: 19,
                  }}
                >
                  {offer.listingTitle}
                </h3>

                <p
                  style={{
                    margin: "0 0 14px",
                    color: "#626761",
                    lineHeight: 1.4,
                  }}
                >
                  {offer.offerText}
                </p>

                <button
                  onClick={() =>
                    deleteDeal(offer.id)
                  }
                  style={{
                    border: 0,
                    background: "transparent",
                    color: "#9a3434",
                    fontWeight: 800,
                    padding: 0,
                  }}
                >
                  Delete deal
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
