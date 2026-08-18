import Link from "next/link";

const listings = {
  "carpentry-cooma": {
    title: "Carpentry & small repairs",
    person: "Riley",
    town: "Cooma",
    category: "Trades",
    offers: "Shelves, doors, timber repairs and small carpentry jobs",
    wants: "Mechanical work, landscaping or photography",
    description:
      "Available for small carpentry jobs around Cooma. Happy to discuss the scope before agreeing to a barter.",
  },
  "gardening-jindabyne": {
    title: "Gardening & yard help",
    person: "Sarah",
    town: "Jindabyne",
    category: "Home & Garden",
    offers: "Garden cleanups, mowing and basic yard maintenance",
    wants: "Website help, bookkeeping or moving assistance",
    description:
      "Can help with general garden maintenance, cleanups and mowing in and around Jindabyne.",
  },
  "tech-berridale": {
    title: "Computer & website help",
    person: "James",
    town: "Berridale",
    category: "Tech",
    offers: "Basic websites, computer setup and troubleshooting",
    wants: "Painting, gardening or handyman help",
    description:
      "Available for simple website work, computer setup and general troubleshooting.",
  },
};

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = listings[id as keyof typeof listings];

  if (!listing) {
    return (
      <main className="container" style={{ padding: "3rem 0" }}>
        <div className="card">
          <h1>Listing not found</h1>
          <p>That listing may have been removed or completed.</p>

          <Link className="btn" href="/browse">
            Back to marketplace
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "2rem 0 4rem" }}>
      <section
        style={{
          background: "#fff",
          border: "1px solid #ded8cd",
          borderRadius: 22,
          padding: "1.5rem",
        }}
      >
        <p
          style={{
            color: "#315c44",
            fontWeight: 800,
            marginBottom: "0.4rem",
          }}
        >
          {listing.category} · {listing.town}
        </p>

        <h1
          style={{
            fontSize: "clamp(2.2rem, 8vw, 4rem)",
            marginBottom: "0.5rem",
          }}
        >
          {listing.title}
        </h1>

        <p
          style={{
            color: "#6b6f69",
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          Offered by {listing.person}
        </p>

        <div
          style={{
            background: "#f8f6f1",
            borderRadius: 16,
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p style={{ marginBottom: "0.6rem" }}>
            <strong>What they offer:</strong> {listing.offers}
          </p>

          <p style={{ margin: 0 }}>
            <strong>What they want:</strong> {listing.wants}
          </p>
        </div>

        <p style={{ lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {listing.description}
        </p>

        <div style={{ display: "grid", gap: "0.8rem" }}>
          <Link
            href={`/propose?listing=${id}`}
            style={{
              display: "block",
              textAlign: "center",
              background: "#315c44",
              color: "#fff",
              padding: "1rem",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Propose a barter
          </Link>

          <Link
            href="/browse"
            style={{
              display: "block",
              textAlign: "center",
              background: "#f4efe3",
              color: "#315c44",
              padding: "1rem",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Back to browse
          </Link>
        </div>
      </section>
    </main>
  );
}
