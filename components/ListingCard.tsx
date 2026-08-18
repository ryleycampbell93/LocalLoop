import Link from "next/link";
import type { Listing } from "@/lib/data";

export default function ListingCard({ item }: { item: Listing }) {
  return (
    <Link href={`/listing/${item.id}`} className="card listing">
      <span className={`badge ${item.type}`}>{item.type === "need" ? "NEEDS HELP" : "OFFERING"}</span>
      <h3>{item.title}</h3>
      <div className="meta">{item.category} · {item.location}</div>
      <p>{item.description}</p>
      <div className="exchange">↔ {item.exchange}</div>
    </Link>
  );
}
