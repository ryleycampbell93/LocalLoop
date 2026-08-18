"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Photo = {
  id: string;
  dataUrl: string;
};

export default function PostPage() {
  const router = useRouter();

  const [type, setType] = useState("need");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exchange, setExchange] = useState("");
  const [category, setCategory] = useState("Pickups & Errands");

  const [location, setLocation] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const [distance, setDistance] = useState("10");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [saved, setSaved] = useState(false);

  const usesRoute =
    category === "Pickups & Errands" || category === "Transport";

  const exchangeLabel = useMemo(() => {
    return type === "need"
      ? "What can you offer in exchange?"
      : "What would you like in exchange?";
  }, [type]);

  const exchangePlaceholder = useMemo(() => {
    return type === "need"
      ? "e.g. Two dozen fresh eggs, firewood, garden help, mechanical help or another useful favour."
      : "e.g. Fresh produce, garden help, firewood, transport help or open to suggestions.";
  }, [type]);

  function addPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    const remainingSlots = 5 - photos.length;
    const selected = files.slice(0, remainingSlots);

    selected.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result !== "string") return;

        setPhotos((current) => {
          if (current.length >= 5) return current;

          return [
            ...current,
            {
              id: `${Date.now()}-${Math.random()}`,
              dataUrl: reader.result as string,
            },
          ];
        });
      };

      reader.readAsDataURL(file);
    });

    event.target.value = "";
  }

  function removePhoto(id: string) {
    setPhotos((current) =>
      current.filter((photo) => photo.id !== id)
    );
  }

  function submitListing(event: FormEvent) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please add a title and description.");
      return;
    }

    if (usesRoute && (!fromLocation.trim() || !toLocation.trim())) {
      alert("Please add both the pickup/from location and destination.");
      return;
    }

    if (!usesRoute && !location.trim()) {
      alert("Please add a town or location.");
      return;
    }

    const town = usesRoute ? toLocation.trim() : location.trim();

    const routeText = usesRoute
      ? `${fromLocation.trim()} → ${toLocation.trim()}`
      : location.trim();

    const listing = {
      id: `user-${Date.now()}`,
      type,
      title: title.trim(),
      person: "You",
      town,
      route: routeText,
      from: usesRoute ? fromLocation.trim() : "",
      to: usesRoute ? toLocation.trim() : "",
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
      photos: photos.map((photo) => photo.dataUrl),
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("localloop-listings") || "[]"
      );

      const current = Array.isArray(existing) ? existing : [];

      localStorage.setItem(
        "localloop-listings",
        JSON.stringify([listing, ...current])
      );
    } catch {
      alert(
        "Those photos are too large for this prototype. Try fewer or smaller photos."
      );
      return;
    }

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
          Add a few photos so people can see exactly what the job,
          item or pickup involves.
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
                placeholder={
                  type === "need"
                    ? "e.g. Need a tractor picked up from Pambula"
                    : "e.g. Can deliver firewood around Cooma"
                }
              />
            </label>

            <label className="label">
              {type === "need"
                ? "What do you need?"
                : "What are you offering?"}

              <textarea
                className="textarea"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={
                  type === "need"
                    ? "Describe exactly what you need someone to do..."
                    : "Describe exactly what you can provide..."
                }
              />
            </label>

            <label className="label">
              {exchangeLabel}

              <textarea
                className="textarea"
                value={exchange}
                onChange={(event) => setExchange(event.target.value)}
                placeholder={exchangePlaceholder}
              />
            </label>

            <div className="label">
              <strong>Photos</strong>
              <span style={{ color: "#6c746d", fontSize: "0.9rem" }}>
                Add up to 5 photos
              </span>

              <label
                style={{
                  display: "block",
                  border: "2px dashed #cfd7d1",
                  borderRadius: 16,
                  padding: "1.2rem",
                  textAlign: "center",
                  background: "#f8faf7",
                  cursor: "pointer",
                }}
              >
                <strong>
                  {photos.length === 0
                    ? "Add photos"
                    : "Add more photos"}
                </strong>

                <p style={{ margin: "0.35rem 0 0" }}>
                  Take a photo or choose from your library
                </p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={addPhotos}
                  disabled={photos.length >= 5}
                  style={{ display: "none" }}
                />
              </label>

              {photos.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "0.8rem",
                    marginTop: "0.8rem",
                  }}
                >
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      style={{
                        position: "relative",
                        borderRadius: 14,
                        overflow: "hidden",
                        border: "1px solid #ded8cd",
                        background: "#fff",
                      }}
                    >
                      <img
                        src={photo.dataUrl}
                        alt="Listing preview"
                        style={{
                          display: "block",
                          width: "100%",
                          height: 130,
                          objectFit: "cover",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          border: 0,
                          background: "rgba(0,0,0,0.7)",
                          color: "#fff",
                          fontWeight: 900,
                        }}
                        aria-label="Remove photo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

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

            {usesRoute ? (
              <div
                className="grid"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                }}
              >
                <label className="label">
                  From / pickup location

                  <input
                    className="input"
                    value={fromLocation}
                    onChange={(event) =>
                      setFromLocation(event.target.value)
                    }
                    placeholder="e.g. JTP Machinery, Pambula"
                  />
                </label>

                <label className="label">
                  To / destination

                  <input
                    className="input"
                    value={toLocation}
                    onChange={(event) =>
                      setToLocation(event.target.value)
                    }
                    placeholder="e.g. Cooma"
                  />
                </label>
              </div>
            ) : (
              <label className="label">
                Town / location

                <input
                  className="input"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="e.g. Bombala"
                />
              </label>
            )}

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
