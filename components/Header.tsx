import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <div className="brand">
          Local<span>Loop</span>
        </div>

        <nav className="navlinks">
          <Link href="/">Home</Link>
          <Link href="/browse">Browse</Link>
          <Link href="/barters">My Barters</Link>
          <Link href="/profile">Profile</Link>
          <Link className="btn" href="/post">
            Post a listing
          </Link>
        </nav>
      </div>
    </header>
  );
}
