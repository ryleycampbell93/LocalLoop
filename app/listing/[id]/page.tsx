import Link from "next/link";
import { notFound } from "next/navigation";
import { listings } from "@/lib/data";

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = listings.find((x) => x.id === id);
  if (!item) notFound();
  return (
    <main className="container page">
      <div className="page-grid">
        <section className="stack">
          <div className="card">
            <span className={`badge ${item.type}`}>{item.type === "need" ? "NEEDS HELP" : "OFFERING"}</span>
            <h1 style={{fontSize:"clamp(2.2rem,5vw,4rem)", marginTop:18}}>{item.title}</h1>
            <div className="meta">{item.category} · {item.location}</div>
            <p style={{fontSize:"1.08rem"}}>{item.description}</p>
          </div>
          <div className="card"><h2>What they&apos;re proposing</h2><p>{item.exchange}</p><div className="notice">Everything is negotiable. The final exchange is only locked once both people accept the Barter Agreement.</div></div>
          <div className="card"><h2>Tags</h2><div className="filterbar">{item.tags.map(t => <span className="pill" key={t}>{t}</span>)}</div></div>
        </section>
        <aside className="stack">
          <div className="card">
            <div className="profile-head"><div className="avatar">{item.user.split(" ").map(x=>x[0]).join("")}</div><div><h3>{item.user}</h3><div className="meta">★ {item.rating} · Verified member</div></div></div>
            <p>Member profile with trade history, reviews and preferred exchange categories.</p>
            <Link className="btn" href="/messages" style={{width:"100%"}}>Message about this</Link>
          </div>
          <div className="card"><h3>Ready to agree?</h3><p>Once you&apos;ve negotiated the details, turn the conversation into a written barter agreement.</p><Link className="btn secondary" href="/agreement" style={{width:"100%"}}>Open agreement builder</Link></div>
        </aside>
      </div>
    </main>
  );
}
