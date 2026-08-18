import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <section className="container hero">
        <div>
          <span className="eyebrow">OLD-SCHOOL BARTER, BUILT FOR NOW</span>
          <h1>Trade what you can do for what you need.</h1>
          <p>Find people nearby, negotiate a fair exchange, put the deal in writing, and build reputation through completed trades.</p>
          <div className="hero-actions">
            <Link className="btn" href="/post">Post what you need</Link>
            <Link className="btn secondary" href="#browse">Browse offers</Link>
          </div>
        </div>
        <div className="card hero-card">
          <span className="badge need">EXAMPLE BARTER</span>
          <h2 style={{marginTop:14}}>Garden work ↔ Website help</h2>
          <div className="swap">
            <div className="swap-row"><strong>Maya provides</strong>3 hours of garden clean-up assistance</div>
            <div className="swap-row"><strong>Riley provides</strong>Landing-page refresh and mobile tidy-up</div>
            <div className="swap-row"><strong>Both agree</strong>Scope, date and completion terms recorded in-app</div>
          </div>
        </div>
      </section>

      <section id="browse" className="container section">
        <div className="section-head">
          <div><span className="eyebrow">MARKETPLACE</span><h2 style={{marginTop:10}}>Nearby needs & offers</h2></div>
          <Link className="btn secondary" href="/post">+ New listing</Link>
        </div>
        <div className="filterbar">
          <button className="pill active">All</button><button className="pill">Needs</button><button className="pill">Offers</button><button className="pill">Home & Garden</button><button className="pill">Digital</button>
        </div>
        <div className="grid">{listings.map((item) => <ListingCard key={item.id} item={item} />)}</div>
      </section>

      <section className="container section">
        <div className="card">
          <span className="eyebrow">HOW IT WORKS</span>
          <div className="grid" style={{marginTop:18}}>
            <div><h3>1. List it</h3><p>Say what you need or what you can offer. No artificial pricing system required.</p></div>
            <div><h3>2. Negotiate it</h3><p>Chat directly and agree on the scope, timing and exchange that feels fair to both sides.</p></div>
            <div><h3>3. Put it in writing</h3><p>Turn the deal into a simple barter agreement, accepted by both people before work starts.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
