"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        background: "#f7f6f1",
        borderBottom: "1px solid #e5e2da",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "22px 16px 16px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-block",
            color: "#111",
            textDecoration: "none",
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            marginBottom: 18,
          }}
        >
          Local<span style={{ color: "#214d3d" }}>Loop</span>
        </Link>

        <nav
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 2,
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Link href="/" style={navButton}>
            Home
          </Link>

          <Link href="/browse" style={navButton}>
            Browse
          </Link>

          <Link href="/barters" style={navButton}>
            My Deals
          </Link>

          <Link href="/profile" style={navButton}>
            Profile
          </Link>

          <Link
            href="/post"
            style={{
              ...navButton,
              background: "#214d3d",
              color: "#fff",
              borderColor: "#214d3d",
            }}
          >
            Post a listing
          </Link>
        </nav>
      </div>
    </header>
  );
}

const navButton = {
  flex: "0 0 auto",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 48,
  padding: "0 16px",
  border: "1px solid #dedbd3",
  borderRadius: 14,
  background: "#fff",
  color: "#171917",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 16,
  whiteSpace: "nowrap" as const,
};
