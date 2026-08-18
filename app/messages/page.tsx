import Link from "next/link";

export default function MessagesPage() {
  return (
    <main className="container page">
      <h1 style={{fontSize:"clamp(2.2rem,5vw,4rem)"}}>Messages</h1>
      <div className="card message-shell">
        <aside className="thread-list">
          <div className="thread active"><strong>Maya Chen</strong><div className="meta">Garden ↔ website trade</div></div>
          <div className="thread"><strong>Tom Bennett</strong><div className="meta">Couch move</div></div>
          <div className="thread"><strong>Aisha Patel</strong><div className="meta">Portrait session</div></div>
        </aside>
        <section className="chat">
          <div className="chat-head"><strong>Maya Chen</strong><div className="meta">Discussing: Garden clean-up this weekend</div></div>
          <div className="messages">
            <div className="bubble">Hey Riley — I saw you can do website work. Would you swap a landing-page refresh for the garden clean-up?</div>
            <div className="bubble me">Yep. If it&apos;s roughly 3 hours garden work, I can do a single-page refresh and mobile tidy-up.</div>
            <div className="bubble">Works for me. Saturday morning for the garden, and website changes by Wednesday?</div>
            <div className="bubble me">Deal. Let&apos;s put exactly that into the agreement.</div>
          </div>
          <div style={{padding:"0 16px 14px"}}><Link className="btn secondary" href="/agreement">Create barter agreement from this deal →</Link></div>
          <div className="chat-compose"><input className="input" placeholder="Write a message..."/><button className="btn">Send</button></div>
        </section>
      </div>
    </main>
  );
}
