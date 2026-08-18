import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="container hero">
        <div>
          <span className="eyebrow">LOCAL HELP. LOCAL TRADES.</span>

          <h1>Trade what you can do for what you need.</h1>

          <p>
            LocalLoop connects people nearby so they can swap skills, favours,
            transport help, produce and practical jobs without everything
            needing to be a cash transaction.
          </p>

          <div className="hero-actions">
            <Link className="btn" href="/browse">
              Browse offers
            </Link>

            <Link className="btn secondary" href="/post">
              Post a listing
            </Link>
          </div>
        </div>

        <div className="card hero-card">
          <span className="badge offer">REAL LOCAL EXAMPLE</span>

          <h2 style={{ marginTop: 14 }}>
            Merimbula pickup ↔ two dozen fresh eggs
          </h2>

          <div className="swap">
            <div className="swap-row">
              <strong>Someone is already travelling inland</strong>
              They collect your prepaid Click & Collect order in Merimbula.
            </div>

            <div className="swap-row">
              <strong>You offer something useful in return</strong>
              Two dozen fresh eggs from home.
            </div>

            <div className="swap-row">
              <strong>LocalLoop helps both people agree</strong>
              Pickup, timing and exchange terms are clear before anyone starts.
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <span className="eyebrow">HOW IT WORKS</span>

        <h2 style={{ marginTop: 14 }}>
          Simple enough to explain in a minute.
        </h2>

        <div className="grid" style={{ marginTop: 22 }}>
          <div className="card">
            <h3>1. Say what you need</h3>
            <p>
              A Pambula hardware pickup, garden help, firewood, trailer
              transport, pet minding, mechanical help or almost any useful
              local favour.
            </p>
          </div>

          <div className="card">
            <h3>2. Say what you can offer</h3>
            <p>
              Fresh eggs, produce, a useful skill, another favour, transport,
              equipment use or something else the other person actually wants.
            </p>
          </div>

          <div className="card">
            <h3>3. Find a local match</h3>
            <p>
              Browse people nearby, filter by town and distance, and find someone
              whose offer fits what you need.
            </p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div
          className="card"
          style={{
            background: "#f4efe3",
            border: "1px solid #ded8cd",
          }}
        >
          <span className="eyebrow">THE BARTER</span>

          <h2 style={{ marginTop: 14 }}>
            You decide what feels fair.
          </h2>

          <p>
            LocalLoop does not decide the value of your time, produce or skills.
            The two people involved negotiate the exchange themselves.
          </p>

          <div
            style={{
              display: "grid",
              gap: 14,
              marginTop: 22,
            }}
          >
            <div className="swap-row">
              <strong>You provide</strong>
              Two dozen fresh eggs.
            </div>

            <div className="swap-row">
              <strong>They provide</strong>
              Collection of your prepaid order from Merimbula and bring it back
              toward Cooma.
            </div>

            <div className="swap-row">
              <strong>Both agree</strong>
              Where to meet, when the pickup happens, and exactly what is being
              exchanged.
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <span className="eyebrow">PUT IT IN WRITING</span>

        <h2 style={{ marginTop: 14 }}>
          No more “that’s not what we agreed.”
        </h2>

        <p style={{ maxWidth: 760 }}>
          Once both people are happy with the proposal, LocalLoop turns the deal
          into a simple barter agreement showing what each person provides,
          timing, location, materials and any special conditions.
        </p>

        <div className="grid" style={{ marginTop: 22 }}>
          <div className="card">
            <h3>Propose</h3>
            <p>
              Tell the other person what you’re offering and what you want in
              return.
            </p>
          </div>

          <div className="card">
            <h3>Agree</h3>
            <p>
              Confirm the details and request changes until both sides are happy.
            </p>
          </div>

          <div className="card">
            <h3>Keep track</h3>
            <p>
              Accepted exchanges appear in My Barters so both people can see the
              agreed deal.
            </p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "2.5rem 1.5rem",
          }}
        >
          <span className="eyebrow">KEEP IT LOCAL</span>

          <h2 style={{ marginTop: 14 }}>
            Someone nearby probably has what you need.
          </h2>

          <p style={{ maxWidth: 680, margin: "0 auto 1.5rem" }}>
            And chances are you have something useful to offer them in return.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link className="btn" href="/browse">
              See what’s nearby
            </Link>

            <Link className="btn secondary" href="/post">
              Post what you need
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
