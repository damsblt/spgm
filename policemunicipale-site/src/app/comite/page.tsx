import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le comité",
};

const MEMBERS = [
  { role: "Présidence", name: "MENETREY Damien" },
  { role: "Vice-présidence", name: "PASTANELLA Davide" },
  { role: "Secrétaire", name: "F. Alexandre" },
  { role: "Vice-secrétaire", name: "KALMAN Jonathan" },
  { role: "Trésorier", name: "WETZEL Denis" },
  { role: "Vice-trésorier", name: "LECHEVALLIER Damien" },
  { role: "Membre adjoint", name: "LANGEL Thierry" },
];

export default function ComitePage() {
  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Le comité</h1>
          <p className="lede">Composition du comité du SPMG.</p>
        </section>
      </div>
      <section className="section">
        <div className="committee">
          {MEMBERS.map((member) => (
            <div className="committee__row" key={`${member.role}-${member.name}`}>
              <div className="committee__role">{member.role}</div>
              <div className="committee__name">{member.name}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
