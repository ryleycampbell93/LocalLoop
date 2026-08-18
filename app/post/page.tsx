export default function PostPage() {
  return (
    <main className="container page">
      <div style={{maxWidth:760, margin:"0 auto"}}>
        <span className="eyebrow">NEW LISTING</span><h1 style={{fontSize:"clamp(2.2rem,5vw,4rem)"}}>What do you want to trade?</h1>
        <div className="card">
          <form className="form">
            <label className="label">Listing type<select className="select" defaultValue="need"><option value="need">I need something</option><option value="offer">I&apos;m offering something</option></select></label>
            <label className="label">Title<input className="input" placeholder="e.g. Need help painting a bedroom" /></label>
            <label className="label">Description<textarea className="textarea" placeholder="Describe the job or service clearly..." /></label>
            <label className="label">What can you offer in exchange?<textarea className="textarea" placeholder="e.g. I can offer bookkeeping, gardening or guitar lessons. Open to suggestions." /></label>
            <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
              <label className="label">Category<select className="select"><option>Home & Garden</option><option>Digital</option><option>Moving</option><option>Creative</option><option>Lessons</option><option>Other</option></select></label>
              <label className="label">Location<input className="input" placeholder="Suburb or region" /></label>
            </div>
            <button type="button" className="btn">Preview listing</button>
          </form>
        </div>
      </div>
    </main>
  );
}
