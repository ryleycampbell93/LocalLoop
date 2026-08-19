"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProposePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const listingId = searchParams.get("listing") || "";
  const listingTitle = searchParams.get("title") || "this listing";

  const [offerType, setOfferType] = useState("");
  const [offerText, setOfferText] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const offerTypes = [
    { id: "item", label: "Item", icon: "📦" },
    { id: "service", label: "Service", icon: "🛠️" },
    { id: "labour", label: "Labour", icon: "💪" },
    { id: "transport", label: "Transport", icon: "🛻" },
    { id: "other", label: "Other", icon: "🔄" },
  ];

  function sendOffer(e: React.FormEvent) {
    e.preventDefault();

    if (!offerType || !offerText.trim()) return;

    const existingOffers = JSON.parse(
      localStorage.getItem("localLoopOffers") || "[]"
    );

    const newOffer = {
      id: Date.now().toString(),
      listingId,
      listingTitle,
      offerType,
      offerText,
      message,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "localLoopOffers",
      JSON.stringify([newOffer, ...existingOffers])
    );

    setSent(true);
  }

  if (sent) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f4f4f4",
          padding: "24px 18px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 520,
            margin: "60px auto",
            background: "#fff",
            borderRadius: 20,
            padding: 28,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              marginBottom: 18,
            }}
          >
            ✓
          </div>

          <h1 style={{ margin: "0 0 10px", fontSize: 28 }}>
            Offer sent
          </h1>

          <p
            style={{
              margin: "0 0 24px",
              color: "#666",
              lineHeight: 1.5,
            }}
          >
            Your offer for <strong>{listingTitle}</strong> has been sent.
            The other person can accept, counter or decline.
          </p>

          <button
            onClick={() => router.push("/messages")}
            style={{
              width: "100%",
              border: 0,
              borderRadius: 12,
              padding: "15px 18px",
              background: "#d62f2f",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Go to messages
          </button>

          <button
            onClick={() => router.back()}
            style={{
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: "14px 18px",
              background: "#fff",
              color: "#333",
              fontWeight: 600,
              fontSize: 15,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            Back to listing
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "24px 18px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 540,
          margin: "24px auto",
          background: "#fff",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            border: 0,
            background: "transparent",
            fontSize: 15,
            padding: 0,
            marginBottom: 18,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            margin: "0 0 6px",
            fontSize: 28,
          }}
        >
          Make an offer
        </h1>

        <p
          style={{
            margin: "0 0 24px",
            color: "#666",
            lineHeight: 1.45,
          }}
        >
          What would you offer for <strong>{listingTitle}</strong>?
        </p>

        <form onSubmit={sendOffer}>
          <label
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            What are you offering?
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 10,
              marginBottom: 22,
            }}
          >
            {offerTypes.map((type) => {
              const selected = offerType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setOfferType(type.id)}
                  style={{
                    padding: "16px 10px",
                    borderRadius: 14,
                    border: selected
                      ? "2px solid #d62f2f"
                      : "1px solid #ddd",
                    background: selected ? "#fff3f3" : "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>
                    {type.icon}
                  </div>

                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    {type.label}
                  </div>
                </button>
              );
            })}
          </div>

          <label
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Describe your offer
          </label>

          <textarea
            value={offerText}
            onChange={(e) => setOfferText(e.target.value)}
            placeholder="Example: My chainsaw and a load of firewood..."
            rows={4}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: 12,
              padding: 14,
              fontSize: 16,
              resize: "vertical",
              marginBottom: 20,
            }}
          />

          <label
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Message
            <span
              style={{
                fontWeight: 400,
                color: "#888",
                marginLeft: 5,
              }}
            >
              optional
            </span>
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Anything else you want them to know?"
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: 12,
              padding: 14,
              fontSize: 16,
              resize: "vertical",
              marginBottom: 22,
            }}
          />

          <button
            type="submit"
            disabled={!offerType || !offerText.trim()}
            style={{
              width: "100%",
              border: 0,
              borderRadius: 13,
              padding: "16px 18px",
              background:
                offerType && offerText.trim() ? "#d62f2f" : "#bbb",
              color: "#fff",
              fontSize: 17,
              fontWeight: 800,
              cursor:
                offerType && offerText.trim() ? "pointer" : "default",
            }}
          >
            Send Offer
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#888",
              lineHeight: 1.45,
              margin: "14px 4px 0",
            }}
          >
            Once sent, you can continue discussing the deal privately in chat.
          </p>
        </form>
      </div>
    </main>
  );
}
