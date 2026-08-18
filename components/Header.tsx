import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <Link className="brand" href="/">Fair<span>Trade</span></Link>
        <nav className="navlinks">
          <Link href="/">Browse</Link>
          <Link href="/messages">Messages</Link>
          <Link href="/profile">Profile</Link>
          <Link className="btn" href="/post">Post a listing</Link>
        </nav>
      </div>
    </header>
  );
}
