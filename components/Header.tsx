import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <Link className="brand" href="/">Local<span>Loop</span></Link>
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

