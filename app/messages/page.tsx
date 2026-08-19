"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  createdAt: string;
};

type Conversation = {
  id: string;
  listingId: string;
  listingTitle: string;
  otherPerson: string;
  messages: Message[];
  updatedAt: string;
};

type Listing = {
  id: string;
  title: string;
  person?: string;
};

const demoPeople: Record<string, string> = {
  "mitre10-pambula-pickup": "Chris",
  "merimbula-pharmacy-pickup": "Emma",
  "click-and-collect-coast": "Dan",
  "firewood-cooma": "Steve",
  "trailer-transport-jindabyne": "Sarah",
  "fencing-bombala": "Tom",
  "mechanical-cooma": "Riley",
};

export default function MessagesPage() {
  const router = useRouter();

  const [listingId, setListingId] = useState("");
  const [listingTitle, setListingTitle] = useState("");
  const [otherPerson, setOtherPerson] = useState("LocalLoop member");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const id = params.get("listing") || "";
    const title = params.get("title") || "";

    setListingId(id);
    setListingTitle(title);

    let savedConversations: Conversation[] = [];

    try {
      const stored = JSON.parse(
        localStorage.getItem("localLoopConversations") || "[]"
      );

      savedConversations = Array.isArray(stored) ? stored : [];
    } catch {
      savedConversations = [];
    }

    if (!id) {
      setConversations(savedConversations);
      setLoaded(true);
      return;
    }

    let person = demoPeople[id] || "LocalLoop member";

    try {
      const storedListings = JSON.parse(
        localStorage.getItem("localloop-listings") || "[]"
      );

      if (Array.isArray(storedListings)) {
        const found = storedListings.find(
          (listing: Listing) => String(listing.id) === String(id)
        );

        if (found?.person) {
          person = found.person;
        }
      }
    } catch {
      // Keep fallback person
    }

    setOtherPerson(person);

    const existing = savedConversations.find(
      (conversation) =>
        String(conversation.listingId) === String(id)
    );

    if (existing) {
      setConversations(savedConversations);
      setActiveConversationId(existing.id);
      setOtherPerson(existing.otherPerson || person);
    } else {
      const newConversation: Conversation = {
        id: `conversation-${id}`,
        listingId: id,
        listingTitle: title || "LocalLoop listing",
        otherPerson: person,
        messages: [],
        updatedAt: new Date().toISOString(),
      };

      const updated = [newConversation, ...savedConversations];

      localStorage.setItem(
        "localLoopConversations",
        JSON.stringify(updated)
      );

      setConversations(updated);
      setActiveConversationId(newConversation.id);
    }

    setLoaded(true);
  }, []);

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.id === activeConversationId
      ) || null,
    [conversations, activeConversationId]
  );

  function saveConversations(updated: Conversation[]) {
    setConversations(updated);

    localStorage.setItem(
      "localLoopConversations",
      JSON.stringify(updated)
    );
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (!newMessage.trim() || !activeConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: "me",
      createdAt: new Date().toISOString(),
    };

    const updated = conversations.map((conversation) =>
      conversation.id === activeConversation.id
        ? {
            ...conversation,
            messages: [...conversation.messages, message],
            updatedAt: new Date().toISOString(),
          }
        : conversation
    );

    saveConversations(updated);
    setNewMessage("");
  }

  function openConversation(id: string) {
    const conversation = conversations.find(
      (item) => item.id === id
    );

    if (!conversation) return;

    setActiveConversationId(id);
    setListingId(conversation.listingId);
    setListingTitle(conversation.listingTitle);
    setOtherPerson(conversation.otherPerson);

    window.history.replaceState(
      {},
      "",
      `/messages?listing=${encodeURIComponent(
        conversation.listingId
      )}&title=${encodeURIComponent(conversation.listingTitle)}`
    );
  }

  if (!loaded) {
    return (
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f7f6f1",
        }}
      >
        <p style={{ color: "#777" }}>Loading messages...</p>
      </main>
    );
  }

  if (!listingId && !activeConversation) {
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
              margin: "0 0 8px",
              fontSize: 38,
            }}
          >
            Messages
          </h1>

          <p
            style={{
              margin: "0 0 28px",
              color: "#727670",
              lineHeight: 1.5,
            }}
          >
            Keep your conversations and deal details in one place.
          </p>

          {conversations.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #dedbd3",
                borderRadius: 18,
                padding: 24,
              }}
            >
              <h2 style={{ marginTop: 0 }}>No conversations yet</h2>

              <p
                style={{
                  color: "#777",
                  lineHeight: 1.5,
                }}
              >
                Open a listing and tap Message to start talking with someone.
              </p>

              <button
                onClick={() => router.push("/browse")}
                style={{
                  border: 0,
                  borderRadius: 13,
                  background: "#214d3d",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 16,
                  padding: "14px 18px",
                }}
              >
                Browse listings
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {conversations
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                )
                .map((conversation) => {
                  const lastMessage =
                    conversation.messages[
                      conversation.messages.length - 1
                    ];

                  return (
                    <button
                      key={conversation.id}
                      onClick={() =>
                        openConversation(conversation.id)
                      }
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: "#fff",
                        border: "1px solid #dedbd3",
                        borderRadius: 17,
                        padding: 17,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          color: "#315c44",
                          fontWeight: 900,
                          marginBottom: 5,
                        }}
                      >
                        {conversation.otherPerson}
                      </div>

                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 900,
                          marginBottom: 6,
                        }}
                      >
                        {conversation.listingTitle}
                      </div>

                      <div
                        style={{
                          color: "#777",
                          fontSize: 14,
                          lineHeight: 1.4,
                        }}
                      >
                        {lastMessage
                          ? lastMessage.text
                          : "No messages yet — start the conversation."}
                      </div>
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      </main>
    );
  }

  if (!activeConversation) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f7f6f1",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            maxWidth: 650,
            margin: "40px auto",
            background: "#fff",
            borderRadius: 20,
            border: "1px solid #dedbd3",
            padding: 24,
          }}
        >
          <h1>Conversation not found</h1>

          <button
            onClick={() => router.push("/browse")}
            style={{
              border: 0,
              borderRadius: 13,
              padding: "14px 18px",
              background: "#214d3d",
              color: "#fff",
              fontWeight: 900,
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
        padding: "18px 14px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          background: "#fff",
          border: "1px solid #dedbd3",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid #ece9e1",
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              border: 0,
              background: "transparent",
              padding: 0,
              color: "#214d3d",
              fontWeight: 800,
              marginBottom: 13,
            }}
          >
            ← Back
          </button>

          <div
            style={{
              color: "#315c44",
              fontSize: 13,
              fontWeight: 900,
              marginBottom: 3,
            }}
          >
            {otherPerson}
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 24,
              lineHeight: 1.15,
            }}
          >
            {activeConversation.listingTitle}
          </h1>

          <button
            onClick={() =>
              router.push(
                `/listing/${activeConversation.listingId}`
              )
            }
            style={{
              border: 0,
              background: "transparent",
              color: "#315c44",
              padding: "8px 0 0",
              fontWeight: 700,
            }}
          >
            View listing
          </button>
        </div>

        <div
          style={{
            minHeight: 380,
            maxHeight: "55vh",
            overflowY: "auto",
            padding: 16,
            background: "#faf9f6",
          }}
        >
          {activeConversation.messages.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 10,
                }}
              >
                👋
              </div>

              <h2
                style={{
                  margin: "0 0 7px",
                  fontSize: 20,
                }}
              >
                Start the conversation
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#777",
                  lineHeight: 1.45,
                }}
              >
                Ask a question, discuss the offer or work out the details privately.
              </p>
            </div>
          ) : (
            activeConversation.messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "me"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    maxWidth: "78%",
                    background:
                      message.sender === "me"
                        ? "#214d3d"
                        : "#ece9e1",
                    color:
                      message.sender === "me"
                        ? "#fff"
                        : "#1c1e1c",
                    borderRadius: 15,
                    padding: "11px 13px",
                    lineHeight: 1.45,
                    fontSize: 15,
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={sendMessage}
          style={{
            padding: 14,
            borderTop: "1px solid #ece9e1",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 9,
              alignItems: "flex-end",
            }}
          >
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${otherPerson}...`}
              rows={2}
              style={{
                flex: 1,
                resize: "none",
                border: "1px solid #ccc",
                borderRadius: 13,
                padding: 12,
                fontSize: 16,
                lineHeight: 1.4,
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={!newMessage.trim()}
              style={{
                border: 0,
                borderRadius: 13,
                background: newMessage.trim()
                  ? "#214d3d"
                  : "#aaa",
                color: "#fff",
                fontWeight: 900,
                padding: "14px 17px",
                fontSize: 15,
              }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
