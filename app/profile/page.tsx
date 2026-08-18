import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="container page">
      <div className="page-grid">
        <section className="stack">
          <div className="card">
            <div className="profile-head"><div className="avatar">RM</div><div><h2>Riley Morgan</h2><div className="meta">Newcastle, NSW · ★ 5.0 · Mobile verified</div></div></div>
            <p>I build simple websites and digital systems. Happy to trade for practical help, creative services and things that save me time.</p>
          </div>
          <div className="card"><h2>I can offer</h2><div className="filterbar"><span className="pill">Website help</span><span className="pill">Copy tidy-up</span><span className="pill">Tech setup</span></div></div>
          <div className="card"><h2>I&apos;m looking for</h2><div className="filterbar"><span className="pill">Carpentry</span><span className="pill">Car detailing</span><span className="pill">Photography</span><span className="pill">Garden work</span></div></div>
          <div className="card"><h2>Recent reviews</h2><p>★★★★★ “Clear deal, did exactly what was agreed, easy to work with.”</p><p>★★★★★ “Great communication and no mucking around.”</p></div>
        </section>
        <aside className="stack">
          <div className="card"><h3>Member status</h3><p>Founding Member · Prototype plan</p><Link className="btn secondary" href="/membership" style={{width:"100%"}}>View membership</Link></div>
          <div className="card"><h3>Trade history</h3><p><strong>7</strong> completed trades</p><p><strong>0</strong> unresolved disputes</p></div>
        </aside>
      </div>
    </main>
  );
}
