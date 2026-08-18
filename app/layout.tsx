import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "FairTrade — Old-school barter, made easier",
  description: "Find people nearby, trade what you can do for what you need, and put the deal in writing.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="footer">
          <div className="container">FairTrade prototype · No credits. No internal currency. Users negotiate exchanges directly.</div>
        </footer>
      </body>
    </html>
  );
}
