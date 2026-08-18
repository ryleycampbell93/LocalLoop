export default function AgreementPage() {
  return (
    <main className="container page">
      <div className="page-grid">
        <section className="stack">
          <div><span className="eyebrow">BARTER AGREEMENT</span><h1 style={{fontSize:"clamp(2.2rem,5vw,4rem)"}}>Put the deal in writing.</h1><p>Version 1 · Draft · Both parties must accept before the agreement becomes active.</p></div>
          <div className="card agreement">
            <div className="term"><strong>Party A</strong><div>Riley Morgan</div></div>
            <div className="term"><strong>Party B</strong><div>Maya Chen</div></div>
            <div className="term"><strong>Riley provides</strong><div>Refresh one existing landing page, tidy copy, improve mobile layout, and deliver by Wednesday 26 August.</div></div>
            <div className="term"><strong>Maya provides</strong><div>Up to 3 hours of garden clean-up: hedge trimming, weeding and green-waste consolidation on Saturday morning.</div></div>
            <div className="term"><strong>Materials</strong><div>Maya provides garden tools and green-waste bags. Riley works on Maya&apos;s existing website and hosting account.</div></div>
            <div className="term"><strong>Completion</strong><div>Each party confirms their side is complete in the app. Any changes after acceptance require a new amendment accepted by both parties.</div></div>
            <div className="term"><strong>Cancellation</strong><div>Either party can cancel before work begins. Once either side starts, cancellation terms must be agreed in writing through the deal chat.</div></div>
          </div>
          <div className="notice">Prototype language only — production agreement terms and platform liability wording should be reviewed by an Australian lawyer before launch.</div>
        </section>
        <aside className="stack">
          <div className="card"><h3>Acceptance</h3><p><strong>Riley:</strong> Ready to accept</p><p><strong>Maya:</strong> Awaiting acceptance</p><button className="btn" style={{width:"100%"}}>Accept agreement</button></div>
          <div className="card"><h3>Need a change?</h3><p>Never overwrite an accepted deal. Proposed changes become a new amendment with their own timestamp and acceptance.</p><button className="btn secondary" style={{width:"100%"}}>Propose amendment</button></div>
        </aside>
      </div>
    </main>
  );
}
