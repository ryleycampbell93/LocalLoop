"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Listing = {
  id: string;
  type?: "need" | "offer";
  title: string;
  person: string;
  town: string;
  offers: string;
  wants: string;
};

type Offer = {
  id: string;
  listingId: string;
  listingTitle: string;
  listingOwner: string;
  offerType: string;
  offerText: string;
  message: string;
  status: "pending";
  createdAt: string;
};

const demoListings: Listing[] = [
  {
    id: "kids-clothes-bombala",
    type: "offer",
    title: "Kids clothes bundle",
    person: "Jess",
    town: "Bombala",
    offers: "A bundle of good kids clothes ready for another family.",
    wants:
      "Other kids clothes, toys, books, school gear, or something useful for the family.",
  },
  {
    id: "dog-minding-cooma",
    type: "need",
    title: "Dog minding this weekend",
    person: "Sarah",
    town: "Cooma",
    offers:
      "Dog sitting, baking, cleaning help, garden help, or another useful swap.",
    wants: "Someone reliable to look after my dog for a few hours.",
  },
  {
    id: "birthday-cake-bombala",
    type: "offer",
    title: "Birthday cake baking",
    person: "Megan",
    town: "Bombala",
    offers: "Can make a simple birthday cake or cupcakes.",
    wants:
      "Garden help, kids items, family photos, fresh produce, or another offer.",
  },
  {
    id: "firewood-cooma",
    type: "offer",
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
    offers: "Can deliver a ute load of firewood around Cooma.",
    wants:
      "Small carpentry work, welding help, mower servicing, produce, or another offer.",
  },
  {
    id: "fencing-bombala",
    type: "need",
    title: "Need a hand with fencing",
    person: "Tom",
    town: "Bombala",
    offers:
      "Livestock-yard cleanup, firewood, general farm help, transport help, or another favour.",
    wants:
      "Someone experienced to help repair and tension a section of fencing.",
  },
];

export default function ProposePage() {
  const router = useRouter();

  const [listing, setListing] = useState<Listing | null>(null);
  const [listingId, setListingId] = useState("");
  const [listingTitle, setListingTitle] = useState("this listing");

  const [offerType, setOfferType] = useState("other");
  const [offerText, setOfferText] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const id = params.get("listing") || "";
    const title = params.get("title") || "this listing";

    setListingId(id);
    setListingTitle(title);

    try {
      const stored = JSON.parse(
        localStorage.getItem("localloop-listings") || "[]"
      );

      const saved = Array.isArray(stored) ? stored : [];

      const found = [...saved, ...demoListings].find(
        (item: Listing) => String(item.id) === String(id)
      );

      if (found) {
        setListing(found);
        setListingTitle(found.title);
      }
    } catch {
      const found = demoListings.find(
        (item) => String(item.id) === String(id)
      );

      if (found) {
        setListing(found);
        setListingTitle(found.title);
      }
    }
  }, []);

  const lookingFor = listing
    ? listing.type === "need"
      ? listing.offers || "Open to offers."
      : listing.wants || "Open to offers."
    : "Open to offers.";

  function sendOffer(e: React.FormEvent) {
    e.preventDefault();

    if (!offerText.trim()) return;

    let existingOffers: Offer[] = [];

    try {
      const stored = JSON.parse(
        localStorage.getItem("localLoopOffers") || "[]"
      );

      existingOffers = Array.isArray(stored) ? stored : [];
    } catch {
      existingOffers = [];
    }

    const newOffer: Offer = {
      id: Date.now().toString(),
      listingId,
      listingTitle,
      listingOwner: listing?.person || "",
      offerType,
      offerText: offerText.trim(),
      message: message.trim(),
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
          padding: "24px 16px 60px",
        }}
      >
        <div
          style={{
            maxWidth: 520,
            margin: "45px auto",
            background: "#fff",
            border: "1px solid #dedbd3",
            borderRadius: 22,
            padding: 28,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#edf3ef",
              color: "#214d3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              marginBottom: 18,
            }}
          >
            ✓
          </div>

          <h1 style={{ margin: "0 0 8px", fontSize: 30 }}>
            Offer sent
          </h1>

          <p
            style={{
              color: "#666",
              lineHeight: 1.5,
              margin: "0 0 22px",
            }}
          >
            Your offer for <strong>{listingTitle}</strong> has been sent.
          </p>

          <button
            onClick={() =>
              router.push(
                `/messages?listing=${encodeURIComponent(
                  listingId
                )}&title=${encodeURIComponent(listingTitle)}`
              )
            }
            style={{
              width: "100%",
              border: 0,
              borderRadius: 14,
              padding: 16,
              background: "#214d3d",
              color: "#fff",
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            Continue to messages
          </button>

          <button
            onClick={() => router.push("/browse")}
            style={{
              width: "100%",
              border: 0,
              borderRadius: 14,
              padding: 16,
              background: "#f1eee6",
              color: "#214d3d",
              fontWeight: 800,
              fontSize: 16,
              marginTop: 10,
            }}
          >
            Back to browse
          </button>
        </div>
      </main>
    );
  }

  const chips = [
    { id: "item", label: "Item" },
    { id: "service", label: "Service" },
    { id: "labour", label: "Help" },
    { id: "transport", label: "Transport" },
    { id: "other", label: "Other" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f6f1",
        padding: "20px 16px 60px",
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <button
          onClick={() => router.back()}
          style={{
            border: 0,
            background: "transparent",
            color: "#214d3d",
            fontWeight: 800,
            fontSize: 16,
            padding: "0 0 18px",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            background: "#fff",
            border: "1px solid #dedbd3",
            borderRadius: 22,
            padding: 24,
          }}
        >
          <p
            style={{
              color: "#315c44",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "0.08em",
              margin: "0 0 6px",
            }}
          >
            MAKE AN OFFER
          </p>

          <h1
            style={{
              margin: "0 0 6px",
              fontSize: 30,
              lineHeight: 1.08,
            }}
          >
            {listingTitle}
          </h1>

          {listing && (
            <p
              style={{
                margin: "0 0 18px",
                color: "#777",
                fontSize: 14,
              }}
            >
              {listing.person} · {listing.town}
            </p>
          )}

          <div
            style={{
              background: "#edf3ef",
              borderRadius: 14,
              padding: 14,
              marginBottom: 22,
            }}
          >
            <div
              style={{
                color: "#315c44",
                fontSize: 11,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 5,
              }}
            >
              They’re looking for
            </div>

            <div
              style={{
                color: "#35483e",
                lineHeight: 1.45,
                fontWeight: 700,
              }}
            >
              {lookingFor}
            </div>
          </div>

          <form onSubmit={sendOffer}>
            <label
              style={{
                display: "block",
                fontWeight: 900,
                marginBottom: 8,
              }}
            >
              What are you offering?
            </label>

            <textarea
              value={offerText}
              onChange={(e) => setOfferText(e.target.value)}
              placeholder="Describe what you'd swap, do or help with..."
              rows={4}
              style={{
                width: "100%",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: 14,
                padding: 14,
                fontSize: 16,
                lineHeight: 1.45,
                resize: "vertical",
                marginBottom: 12,
              }}
            />

            <div
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                paddingBottom: 6,
                marginBottom: 20,
              }}
            >
              {chips.map((chip) => {
                const selected = offerType === chip.id;

                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setOfferType(chip.id)}
                    style={{
                      flex: "0 0 auto",
                      border: selected
                        ? "2px solid #214d3d"
                        : "1px solid #d8d8d2",
                      borderRadius: 999,
                      padding: "9px 13px",
                      background: selected ? "#edf3ef" : "#fff",
                      color: selected ? "#214d3d" : "#646864",
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            <label
              style={{
                display: "block",
                fontWeight: 900,
                marginBottom: 8,
              }}
            >
              Add a message{" "}
              <span
                style={{
                  color: "#999",
                  fontWeight: 400,
                }}
              >
                optional
              </span>
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Anything else they should know?"
              rows={3}
              style={{
                width: "100%",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: 14,
                padding: 14,
                fontSize: 16,
                lineHeight: 1.45,
                resize: "vertical",
                marginBottom: 20,
              }}
            />

            <button
              type="submit"
              disabled={!offerText.trim()}
              style={{
                width: "100%",
                border: 0,
                borderRadius: 14,
                padding: 17,
                background: offerText.trim() ? "#214d3d" : "#aaa",
                color: "#fff",
                fontSize: 17,
                fontWeight: 900,
              }}
            >
              Send offer
            </button>

            <p
              style={{
                textAlign: "center",
                color: "#8a8d88",
                fontSize: 12,
                lineHeight: 1.4,
                margin: "12px 4px 0",
              }}
            >
              You can work out any other details privately in chat.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
