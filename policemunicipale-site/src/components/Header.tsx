"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/communications", label: "Communications" },
  { href: "/comite", label: "Comité" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/medias", label: "Médias" },
  { href: "/formulaires", label: "Formulaires" },
  { href: "/espace-membres", label: "Espace membres" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <BrandMark size="header" />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span />
          <span />
          <span />
        </button>

        <nav
          id="site-nav"
          className={`site-nav ${open ? "is-open" : ""}`}
          aria-label="Navigation principale"
        >
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "is-active" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
