import Link from "next/link";

const listings = {
  "mitre10-pambula-pickup": {
    title: "Mitre 10 Pambula pickup",
    person: "Chris",
    town: "Pambula",
    category: "Pickups & Errands",
    offers:
      "Can collect a prepaid hardware order from Mitre 10 Pambula and bring it toward Cooma.",
    wants:
      "Firewood, a hand with fencing, or another useful local favour.",
    description:
      "Ideal for someone already travelling inland who can save another local a long round trip.",
  },

  "merimbula-pharmacy-pickup": {
    title: "Merimbula pharmacy pickup",
    person: "Emma",
    town: "Merimbula",
    category: "Pickups & Errands",
    offers:
      "Can collect eligible prepaid pharmacy items from Merimbula when already travelling inland.",
    wants:
      "Garden help, dog minding, or help moving a few items.",
    description:
      "For eligible prepaid items only, with collection arranged in line with the pharmacy's requirements.",
  },

  "click-and-collect-coast": {
    title: "Click & Collect pickup",
    person: "Dan",
    town: "Merimbula",
    category: "Pickups & Errands",
    offers:
      "Heading from the coast toward Cooma and can collect a prepaid Click & Collect order on the way.",
    wants:
      "Trailer use, mechanical help, or help splitting firewood.",
    description:
      "A practical regional pickup for someone already making the trip.",
  },

  "lamb-barter-bombala": {
    title: "Farm produce available to barter",
    person: "Mick",
    town: "Bombala",
    category: "Farm & Produce",
    offers:
      "Locally raised farm produce available for a private barter, subject to applicable food-safety requirements.",
    wants:
      "Fencing help, machinery repair, or transport assistance.",
    description:
      "A local farm barter listing designed to connect useful skills with regional produce.",
  },

  "firewood-cooma": {
    title: "Firewood delivery around Cooma",
    person: "Steve",
    town: "Cooma",
    category: "Home & Farm",
    offers:
      "Can deliver a ute load of firewood around Cooma and nearby areas.",
    wants:
      "Small carpentry job, welding help, or mower servicing.",
    description:
      "Good for locals who need firewood and have a useful skill or favour to exchange.",
  },

  "trailer-transport-jindabyne": {
    title: "Trailer transport help",
    person: "Sarah",
    town: "Jindabyne",
    category: "Transport",
    offers:
      "Can help move a mower, furniture or other suitable items with a trailer.",
    wants:
      "Garden cleanup, painting help, or computer assistance.",
    description:
      "Useful for local moves and pickups where someone already has the trailer and time.",
  },

  "fencing-bombala": {
    title: "Need a hand with fencing",
    person: "Tom",
    town: "Bombala",
    category: "Trades & Farm",
    offers:
      "Can trade livestock-yard cleanup, firewood or general farm help.",
    wants:
      "Someone experienced to help repair and tension a section of fencing.",
    description:
      "A straightforward skills-for-skills farm barter.",
  },

  "mechanical-cooma": {
    title: "Small engine & mechanical help",
    person: "Riley",
    town: "Cooma",
    category: "Mechanical",
    offers:
      "Can help with basic mower, small engine and mechanical jobs.",
    wants:
      "Carpentry, transport help, or a useful local trade.",
    description:
      "Local mechanical help for small jobs, exchanged for another useful service or favour.",
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
          Posted by {listing.person}
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
