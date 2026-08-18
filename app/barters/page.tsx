import Link from "next/link";

const barters = [
  {
    id: "barter-001",
    title: "Carpentry ↔ Mechanical work",
    with: "Riley",
    town: "Cooma",
    status: "Agreed",
    when: "Saturday 10am",
    where: "Bombala",
    youProvide: "Mechanical work / lawn mower service",
    theyProvide: "Small carpentry repairs and installation work",
  },
];

export default function BartersPage() {
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
          MY BARTERS
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 8vw, 3.6rem)",
            marginBottom: "0.7rem",
          }}
        >
          Your LocalLoop deals
        </h1>

        <p style={{ color: "#666", marginBottom: 0 }}>
          Track active exchanges, agreements and completed barters.
        </p>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        {barters.map((barter) => (
          <article
            key={barter.id}
            style={{
              background: "#fff",
              border: "1px solid #ded8cd",
              borderRadius: 20,
              padding: "1.2rem",
              boxShadow: "0 8px 24px rgba(36, 48, 40, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#315c44",
                    fontWeight: 800,
                    marginBottom: "0.3rem",
                  }}
                >
                  {barter.with} · {barter.town}
                </p>

                <h2 style={{ margin: 0 }}>{barter.title}</h2>
              </div>

              <span
                style={{
                  background: "#eef4ef",
                  color: "#315c44",
                  borderRadius: 999,
                  padding: "0.4rem 0.7rem",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {barter.status} ✓
              </span>
            </div>

            <div
              style={{
                background: "#f8f6f1",
                borderRadius: 14,
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p style={{ marginBottom: "0.7rem" }}>
                <strong>You provide:</strong>
                <br />
                {barter.youProvide}
              </p>

              <p style={{ marginBottom: "0.7rem" }}>
                <strong>{barter.with} provides:</strong>
                <br />
                {barter.theyProvide}
              </p>

              <p style={{ marginBottom: "0.7rem" }}>
                <strong>When:</strong> {barter.when}
              </p>

              <p style={{ margin: 0 }}>
                <strong>Where:</strong> {barter.where}
              </p>
            </div>

            <div style={{ display: "grid", gap: "0.8rem" }}>
              <Link
                href="/agreement"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#315c44",
                  color: "#fff",
                  padding: "0.9rem",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 800,
                }}
              >
                View agreement
              </Link>

              <Link
                href="/messages?listing=carpentry-cooma"
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
                Message Riley
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
