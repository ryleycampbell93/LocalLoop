"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Listing = {
  id: string;
  type?: "need" | "offer";
  title: string;
  person: string;
  town: string;
  category: string;
  offers: string;
  wants: string;
  photos?: string[];
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
    id: "mitre10-pambula-pickup",
    type: "offer",
    title: "Mitre 10 Pambula pickup",
    person: "Chris",
    town: "Cooma",
    category: "Pickups & Errands",
    offers:
      "Can collect a prepaid hardware order from Pambula and bring it toward Cooma.",
    wants:
      "Firewood, fresh produce, or another useful local favour.",
  },
  {
    id: "merimbula-pharmacy-pickup",
    type: "offer",
    title: "Merimbula pharmacy pickup",
    person: "Emma",
    town: "Cooma",
    category: "Pickups & Errands",
    offers:
      "Can collect eligible prepaid pharmacy items when already travelling inland.",
    wants:
      "Garden help, dog minding, or help moving a few items.",
  },
  {
    id: "click-and-collect-coast",
    type: "offer",
    title: "Click & Collect pickup",
    person: "Dan",
    town: "Cooma",
    category: "Pickups & Errands",
    offers:
      "Heading from the coast toward Cooma and can collect a prepaid Click & Collect order.",
    wants:
      "Fresh eggs, mechanical help, trailer use, or another useful favour.",
  },
  {
    id: "firewood-cooma",
    type: "offer",
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
    category: "Home & Garden",
    offers:
      "Can deliver a ute load of firewood around Cooma and nearby areas.",
    wants:
      "Small carpentry work, welding help, or mower servicing.",
  },
  {
    id: "trailer-transport-jindabyne",
    type: "offer",
    title: "Trailer transport help",
    person: "Sarah",
    town: "Jindabyne",
    category: "Transport",
    offers:
      "Can help move a mower, furniture or other suitable items with a trailer.",
    wants:
      "Garden cleanup, painting help, or computer assistance.",
  },
  {
    id: "fencing-bombala",
    type: "need",
    title: "Need a hand with fencing",
    person: "Tom",
    town: "Bombala",
    category: "Trades & Farm",
    offers:
      "Can trade livestock-yard cleanup, firewood or general farm help.",
    wants:
      "Someone experienced to help repair and tension a section of fencing.",
  },
  {
    id: "mechanical-cooma",
    type: "offer",
    title: "Small engine & mechanical help",
    person: "Riley",
    town: "Cooma",
    category: "Mechanical",
    offers:
      "Can help with basic mower, small engine and mechanical jobs.",
    wants:
      "Carpentry, transport help, fresh produce, or another useful local trade.",
  },
];

export default function ProposePage() {
  const router = useRouter();

  const [listing, setListing] = useState<Listing | null>(null);
  const [listingId, setListingId] = useState("");
  const [listingTitle, setListingTitle] = useState("this listing");

  const [offerType, setOfferType] = useState("");
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

      const savedListings = Array.isArray(stored) ? stored : [];

      const found = [...savedListings, ...demoListings].find(
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

  const offerTypes = [
    {
      id: "item",
      label: "Item",
      icon: "📦",
      example: "Something you own",
    },
    {
      id: "service",
      label: "Service",
      icon: "🛠️",
      example: "A skill or service",
    },
    {
      id: "labour",
      label: "Labour",
      icon: "💪",
      example: "Your time or help",
    },
    {
      id: "transport",
      label: "Transport",
      icon: "🛻",
      example: "Pickup or delivery",
    },
    {
      id: "other",
      label: "Other",
      icon: "🔄",
      example: "Something different",
    },
  ];

  const lookingFor = listing
    ? listing.type === "need"
      ? listing.offers || "Open to any reasonable offer."
      : listing.wants || "Open to any reasonable offer."
    : "Open to any reasonable offer.";

  function sendOffer(e: React.FormEvent) {
    e.preventDefault();

    if (!offerType || !offerText.trim()) return;

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
            maxWidth: 540,
            margin: "45px auto",
            background: "#fff",
            border: "1px solid #dedbd3",
            borderRadius: 22,
            padding: 28,
          }}
        >
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: "50%",
              background: "#edf3ef",
              color: "#214d3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 900,
              marginBottom: 20,
            }}
          >
            ✓
          </div>

          <h1
            style={{
              margin: "0 0 10px",
              fontSize: 31,
            }}
          >
            Offer sent
          </h1>

          <p
            style={{
              margin: "0 0 8px",
              color: "#575c57",
              lineHeight: 1.5,
              fontSize: 16,
            }}
          >
            Your offer for <strong>{listingTitle}</strong> has been sent.
          </p>

          <p
            style={{
              margin: "0 0 25px",
              color: "#858982",
              lineHeight: 1.45,
              fontSize: 14,
            }}
          >
            You can continue discussing the details privately in messages.
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
              fontSize: 17,
              fontWeight: 900,
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
              fontSize: 16,
              fontWeight: 800,
              marginTop: 10,
            }}
          >
            Back to browse
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
        padding: "22px 16px 60px",
      }}
    >
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            border: 0,
            background: "transparent",
            padding: "0 0 18px",
            color: "#214d3d",
            fontSize: 16,
            fontWeight: 800,
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
              margin: "0 0 8px",
            }}
          >
            MAKE AN OFFER
          </p>

          <h1
            style={{
              margin: "0 0 8px",
              fontSize: 31,
              lineHeight: 1.08,
            }}
          >
            {listingTitle}
          </h1>

          {listing && (
            <p
              style={{
                margin: "0 0 22px",
                color: "#747872",
                fontSize: 14,
              }}
            >
              {listing.person} · {listing.town}
            </p>
          )}

          <div
            style={{
              background: "#edf3ef",
              borderRadius: 16,
              padding: 17,
              marginBottom: 26,
            }}
          >
            <div
              style={{
                color: "#214d3d",
                fontSize: 13,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 7,
              }}
            >
              They’re looking for
            </div>

            <div
              style={{
                color: "#34483d",
                fontSize: 16,
                lineHeight: 1.5,
                fontWeight: 600,
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
                marginBottom: 5,
              }}
            >
              What would you like to offer?
            </label>

            <p
              style={{
                margin: "0 0 12px",
                color: "#7a7e79",
                fontSize: 14,
              }}
            >
              Choose the closest option.
            </p>

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
                      padding: 15,
                      borderRadius: 14,
                      border: selected
                        ? "2px solid #214d3d"
                        : "1px solid #ddd",
                      background: selected ? "#edf3ef" : "#fff",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        marginBottom: 7,
                      }}
                    >
                      {type.icon}
                    </div>

                    <div
                      style={{
                        fontWeight: 900,
                        marginBottom: 3,
                      }}
                    >
                      {type.label}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: "#81857f",
                      }}
                    >
                      {type.example}
                    </div>
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
              Your offer
            </label>

            <textarea
              value={offerText}
              onChange={(e) => setOfferText(e.target.value)}
              placeholder="Example: I can give you a load of firewood for the pickup."
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
                marginBottom: 20,
              }}
            />

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
                  color: "#8a8d88",
                  fontWeight: 400,
                }}
              >
                optional
              </span>
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Example: I’m in Bombala and can work around whatever day suits you."
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
                marginBottom: 22,
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
                  offerType && offerText.trim()
                    ? "#214d3d"
                    : "#aaa",
                color: "#fff",
                fontSize: 17,
                fontWeight: 900,
              }}
            >
              Send offer
            </button>

            <p
              style={{
                margin: "13px 4px 0",
                textAlign: "center",
                color: "#858982",
                fontSize: 13,
                lineHeight: 1.45,
              }}
            >
              No public prices. Any other details can be worked out privately.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
