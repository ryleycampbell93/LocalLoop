"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const listings = {
  "carpentry-cooma": {
    title: "Carpentry & small repairs",
    person: "Riley",
    town: "Cooma",
  },
  "gardening-jindabyne": {
    title: "Gardening & yard help",
    person: "Sarah",
    town: "Jindabyne",
  },
  "tech-berridale": {
    title: "Computer & website help",
    person: "James",
    town: "Berridale",
  },
};

function MessagesContent() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listing") || "carpentry-cooma";

  const listing = useMemo(() => {
    return (
      listings[listingId as keyof typeof listings] ||
      listings["carpentry-cooma"]
    );
  }, [listingId]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: listing.person,
      text: `Hey, happy to chat about the ${listing.title.toLowerCase()} barter.`,
    },
  ]);

  function sendMessage() {
    const text = message.trim();

    if (!text) return;

    setMessages((current) => [
      ...current,
      {
        from: "You",
        text,
      },
    ]);

    setMessage("");
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
          Chat with {listing.person}
        </h1>

        <p style={{ color: "#666", marginBottom: 0 }}>
          {listing.title} · {listing.town}
        </p>
      </section>

      <section
        style={{
          background: "#fff",
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
              key={`${item.from}-${index}`}
              style={{
                display: "flex",
                justifyContent: isYou ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  background: isYou ? "#315c44" : "#f4efe3",
                  color: isYou ? "#fff" : "#222",
                  borderRadius: 16,
                  padding: "0.9rem 1rem",
                }}
              >
                <p
                  style={{
                    fontWeight: 800,
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.from}
                </p>

                <p style={{ margin: 0 }}>{item.text}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section
        style={{
          background: "#fff",
          border: "1px solid #ded8cd",
          borderRadius: 20,
          padding: "1rem",
        }}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${listing.person}...`}
          style={{
            width: "100%",
            minHeight: 110,
            padding: "0.9rem",
            borderRadius: 12,
            border: "1px solid #ccc",
            fontSize: "1rem",
            marginBottom: "0.8rem",
          }}
        />

        <button
          onClick={sendMessage}
          disabled={!message.trim()}
          style={{
            width: "100%",
            border: 0,
            background: message.trim() ? "#315c44" : "#9da9a1",
            color: "#fff",
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
