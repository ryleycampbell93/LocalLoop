export default function MembershipPage() {
  return (
    <main className="container page">
      <div style={{maxWidth:860, margin:"0 auto", textAlign:"center"}}>
        <span className="eyebrow">MEMBERSHIP</span><h1 style={{fontSize:"clamp(2.2rem,5vw,4rem)"}}>One simple fee. No cut of your barter.</h1><p>The prototype uses a membership model rather than charging transaction fees or introducing an internal currency.</p>
        <div className="grid" style={{gridTemplateColumns:"1fr 1fr", marginTop:24, textAlign:"left"}}>
          <div className="card"><span className="badge">MONTHLY</span><h2 style={{marginTop:12}}>$6 / month</h2><p>Browse, post, message, create agreements and build reputation.</p><button className="btn" style={{width:"100%"}}>Choose monthly</button></div>
          <div className="card"><span className="badge offer">YEARLY</span><h2 style={{marginTop:12}}>$60 / year</h2><p>Same access, with two months effectively free compared with monthly.</p><button className="btn" style={{width:"100%"}}>Choose yearly</button></div>
        </div>
      </div>
    </main>
  );
}
