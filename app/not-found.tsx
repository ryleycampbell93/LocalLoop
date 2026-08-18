import Link from "next/link";
export default function NotFound(){return <main className="container page"><div className="card"><h1 style={{fontSize:"3rem"}}>Listing not found</h1><p>That listing may have been removed or completed.</p><Link className="btn" href="/">Back to marketplace</Link></div></main>}
