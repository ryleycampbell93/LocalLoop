"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProposePage() {
  const router = useRouter();

  const [listingId, setListingId] = useState("");
  const [listingTitle, setListingTitle] = useState("this listing");

  const [offerType, setOfferType] = useState("");
  const [offerText, setOfferText] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setListingId(params.get("listing") || "");
    setListingTitle(params.get("title") || "this listing");
  }, []);

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
          background: "#f7f6f1",
          padding: "24px 18px",
        }}
      >
        <div
          style={{
            maxWidth: 520,
            margin: "50px auto",
            background: "#fff",
            borderRadius: 22,
            padding: 28,
            border: "1px solid #dedbd3",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#e8f3ec",
              color: "#214d3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              marginBottom: 18,
            }}
          >
            ✓
          </div>

          <h1 style={{ margin: "0 0 10px", fontSize: 30 }}>
            Offer sent
          </h1>

          <p
            style={{
              color: "#666",
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            Your offer for <strong>{listingTitle}</strong> has been sent.
          </p>

          <button
            onClick={() => router.push("/messages")}
            style={{
              width: "100%",
              border: 0,
              borderRadius: 14,
              padding: 16,
              background: "#214d3d",
              color: "#fff",
              fontSize: 17,
              fontWeight: 800,
            }}
          >
            Go to messages
          </button>

          <button
            onClick={() => router.back()}
            style={{
              width: "100%",
              border: 0,
              borderRadius: 14,
              padding: 16,
              background: "#f1eee6",
              color: "#214d3d",
              fontSize: 17,
              fontWeight: 800,
              marginTop: 10,
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
        background: "#f7f6f1",
        padding: "24px 18px 60px",
      }}
    >
      <div
        style={{
          maxWidth: 540,
          margin: "20px auto",
          background: "#fff",
          borderRadius: 22,
          padding: 24,
          border: "1px solid #dedbd3",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            border: 0,
            background: "transparent",
            padding: 0,
            marginBottom: 20,
            fontSize: 16,
            fontWeight: 700,
            color: "#214d3d",
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 32,
          }}
        >
          Make an offer
        </h1>

        <p
          style={{
            margin: "0 0 26px",
            color: "#666",
            lineHeight: 1.5,
          }}
        >
          What would you offer for <strong>{listingTitle}</strong>?
        </p>

        <form onSubmit={sendOffer}>
          <label
            style={{
              display: "block",
              fontWeight: 800,
              marginBottom: 10,
            }}
          >
            What are you offering?
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 24,
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
                    textAlign: "left",
                    padding: 16,
                    borderRadius: 14,
                    border: selected
                      ? "2px solid #214d3d"
                      : "1px solid #ddd",
                    background: selected ? "#edf3ef" : "#fff",
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>
                    {type.icon}
                  </div>

                  <div style={{ fontWeight: 800 }}>
                    {type.label}
                  </div>
                </button>
              );
            })}
          </div>

          <label
            style={{
              display: "block",
              fontWeight: 800,
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
              borderRadius: 14,
              padding: 14,
              fontSize: 16,
              marginBottom: 20,
            }}
          />

          <label
            style={{
              display: "block",
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Message{" "}
            <span style={{ color: "#888", fontWeight: 400 }}>
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
              borderRadius: 14,
              padding: 14,
              fontSize: 16,
              marginBottom: 24,
            }}
          />

          <button
            type="submit"
            disabled={!offerType || !offerText.trim()}
            style={{
              width: "100%",
              border: 0,
              borderRadius: 14,
              padding: 17,
              background:
                offerType && offerText.trim() ? "#214d3d" : "#aaa",
              color: "#fff",
              fontSize: 17,
              fontWeight: 800,
            }}
          >
            Send offer
          </button>

          <p
            style={{
              textAlign: "center",
              color: "#888",
              fontSize: 13,
              lineHeight: 1.45,
              marginTop: 14,
            }}
          >
            Any other deal details can be worked out privately in chat.
          </p>
        </form>
      </div>
    </main>
  );
}
