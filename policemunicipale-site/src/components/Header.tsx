"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/communications", label: "Communications" },
  { href: "/comite", label: "Comité" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/medias", label: "Médias" },
  { href: "/formulaires", label: "Formulaires" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Image
            src="/images/home-logo41.png"
            alt="Logo SPMG"
            width={52}
            height={52}
            className="brand__logo"
            priority
          />
          <span className="brand__text">
            <span className="brand__name">SPMG</span>
            <span className="brand__tag">
              Syndicat des Polices Municipales Genevoises
            </span>
          </span>
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
