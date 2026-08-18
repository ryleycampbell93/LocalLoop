"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const router = useRouter();

  const [type, setType] = useState("need");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exchange, setExchange] = useState("");
  const [category, setCategory] = useState("Pickups & Errands");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("10");
  const [saved, setSaved] = useState(false);

  function submitListing(event: FormEvent) {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !location.trim()) {
      alert("Please add a title, description and location.");
      return;
    }

    const listing = {
      id: `user-${Date.now()}`,
      type,
      title: title.trim(),
      person: "You",
      town: location.trim(),
      distance: Number(distance),
      category,
      offers:
        type === "offer"
          ? description.trim()
          : exchange.trim() || "Open to suggestions",
      wants:
        type === "need"
          ? description.trim()
          : exchange.trim() || "Open to suggestions",
      description: description.trim(),
      exchange: exchange.trim(),
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("localloop-listings") || "[]"
    );

    localStorage.setItem(
      "localloop-listings",
      JSON.stringify([listing, ...existing])
    );

    setSaved(true);

    setTimeout(() => {
      router.push("/browse");
    }, 700);
  }

  return (
    <main className="container page">
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <span className="eyebrow">NEW LISTING</span>

        <h1 style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}>
          What do you want to trade?
        </h1>

        <p>
          Post what you need or what you can offer, then tell locals what
          you&apos;d be happy to exchange.
        </p>

        <div className="card">
          <form className="form" onSubmit={submitListing}>
            <label className="label">
              Listing type

              <select
                className="select"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="need">I need something</option>
                <option value="offer">I&apos;m offering something</option>
              </select>
            </label>

            <label className="label">
              Title

              <input
                className="input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Need a Mitre 10 Pambula pickup"
              />
            </label>

            <label className="label">
              Description

              <textarea
                className="textarea"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe exactly what you need or can offer..."
              />
            </label>

            <label className="label">
              What can you offer or what would you like in return?

              <textarea
                className="textarea"
                value={exchange}
                onChange={(event) => setExchange(event.target.value)}
                placeholder="e.g. Two dozen fresh eggs, firewood, garden help, transport or another useful favour."
              />
            </label>

            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              }}
            >
              <label className="label">
                Category

                <select
                  className="select"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option>Pickups & Errands</option>
                  <option>Transport</option>
                  <option>Home & Garden</option>
                  <option>Trades & Farm</option>
                  <option>Mechanical</option>
                  <option>Farm & Produce</option>
                  <option>Pet Help</option>
                  <option>Digital</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="label">
                Town / location

                <input
                  className="input"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="e.g. Cooma"
                />
              </label>

              <label className="label">
                Approx. distance

                <select
                  className="select"
                  value={distance}
                  onChange={(event) => setDistance(event.target.value)}
                >
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                  <option value="100">100 km</option>
                  <option value="150">150 km</option>
                </select>
              </label>
            </div>

            <button type="submit" className="btn">
              Publish listing
            </button>

            {saved && (
              <div
                style={{
                  background: "#eef4ef",
                  color: "#315c44",
                  padding: "1rem",
                  borderRadius: 14,
                  fontWeight: 800,
                }}
              >
                Listing published ✓ Taking you to Browse...
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
