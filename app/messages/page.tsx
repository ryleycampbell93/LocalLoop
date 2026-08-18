"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Listing = {
  id: string;
  title: string;
  person: string;
  town: string;
};

type ChatMessage = {
  from: "You" | "Them";
  text: string;
};

const demoListings: Listing[] = [
  {
    id: "mitre10-pambula-pickup",
    title: "Mitre 10 Pambula pickup",
    person: "Chris",
    town: "Cooma",
  },
  {
    id: "merimbula-pharmacy-pickup",
    title: "Merimbula pharmacy pickup",
    person: "Emma",
    town: "Cooma",
  },
  {
    id: "click-and-collect-coast",
    title: "Click & Collect pickup",
    person: "Dan",
    town: "Cooma",
  },
  {
    id: "firewood-cooma",
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
  },
  {
    id: "trailer-transport-jindabyne",
    title: "Trailer transport help",
    person: "Sarah",
    town: "Jindabyne",
  },
  {
    id: "fencing-bombala",
    title: "Need a hand with fencing",
    person: "Tom",
    town: "Bombala",
  },
  {
    id: "mechanical-cooma",
    title: "Small engine & mechanical help",
    person: "Riley",
    town: "Cooma",
  },
];

function MessagesContent() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listing") || "";

  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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

  const otherPerson =
    listing?.person === "You"
      ? "Other person"
      : listing?.person || "LocalLoop member";

  useEffect(() => {
    if (!listingId) return;

    try {
      const stored = JSON.parse(
        localStorage.getItem(`localloop-messages-${listingId}`) || "[]"
      );

      if (Array.isArray(stored) && stored.length > 0) {
        setMessages(stored);
      } else {
        setMessages([
          {
            from: "Them",
            text: `Hi, happy to chat about "${listing?.title || "this barter"}".`,
          },
        ]);
      }
    } catch {
      setMessages([]);
    }
  }, [listingId, listing?.title]);

  function sendMessage() {
    const text = message.trim();

    if (!text || !listingId) return;

    const updated: ChatMessage[] = [
      ...messages,
      {
        from: "You",
        text,
      },
    ];

    setMessages(updated);

    localStorage.setItem(
      `localloop-messages-${listingId}`,
      JSON.stringify(updated)
    );

    setMessage("");
  }

  if (!loaded) {
    return (
      <main className="container" style={{ padding: "2rem 0" }}>
        Loading messages...
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="container" style={{ padding: "3rem 0" }}>
        <div className="card">
          <h1>Conversation not found</h1>

          <p>
            Open a listing or barter first, then start the conversation from
            there.
          </p>

          <Link className="btn" href="/browse">
            Back to browse
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
          MESSAGES
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 8vw, 3.6rem)",
            marginBottom: "0.6rem",
          }}
        >
          Chat with {otherPerson}
        </h1>

        <p style={{ color: "#666", marginBottom: 0 }}>
          {listing.title} · {listing.town}
        </p>
      </section>

      <section
        style={{
          background: "#ffffff",
          border: "1px solid #ded8cd",
          borderRadius: 20,
          padding: "1rem",
          marginBottom: "1rem",
          display: "grid",
          gap: "0.8rem",
        }}
      >
        {messages.map((item, index) => {
          const isYou = item.from === "You";

          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: isYou ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  background: isYou ? "#315c44" : "#f4efe3",
                  color: isYou ? "#ffffff" : "#626b64",
                  borderRadius: 16,
                  padding: "0.9rem 1rem",
                }}
              >
                <p
                  style={{
                    fontWeight: 800,
                    marginTop: 0,
                    marginBottom: "0.3rem",
                    color: isYou ? "#ffffff" : "#626b64",
                  }}
                >
                  {isYou ? "You" : otherPerson}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: isYou ? "#ffffff" : "#626b64",
                  }}
                >
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <section
        style={{
          background: "#ffffff",
          border: "1px solid #ded8cd",
          borderRadius: 20,
          padding: "1rem",
        }}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${otherPerson}...`}
          style={{
            width: "100%",
            minHeight: 110,
            padding: "0.9rem",
            borderRadius: 12,
            border: "1px solid #ccc",
            fontSize: "1rem",
            marginBottom: "0.8rem",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={sendMessage}
          disabled={!message.trim()}
          style={{
            width: "100%",
            border: 0,
            background: message.trim() ? "#315c44" : "#a9b2ac",
            color: "#ffffff",
            padding: "1rem",
            borderRadius: 12,
            fontWeight: 800,
            fontSize: "1rem",
            marginBottom: "0.8rem",
          }}
        >
          Send message
        </button>

        <Link
          href="/barters"
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
          Back to my barters
        </Link>
      </section>
    </main>
  );
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <main className="container" style={{ padding: "2rem 0" }}>
          Loading messages...
        </main>
      }
    >
      <MessagesContent />
    </Suspense>
  );
}
