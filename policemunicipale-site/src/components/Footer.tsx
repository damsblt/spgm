import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__brand">SPMG</p>
          <p>
            Syndicat des Polices Municipales Genevoises
            <br />
            Case postale — 1211 Genève 2
          </p>
        </div>
        <div className="site-footer__links">
          <Link href="/contact">Contact</Link>
          <Link href="/formulaires">Adhésion</Link>
          <Link href="/mentions">Mentions légales</Link>
          <a href="mailto:info@policemunicipale.ch">info@policemunicipale.ch</a>
        </div>
        <p className="site-footer__note">
          Brouillon local — contenu exporté de policemunicipale.ch. Hors
          production.
        </p>
      </div>
    </footer>
  );
}
