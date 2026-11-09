import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le comité",
};

const MEMBERS = [
  { role: "Présidence", name: "MENETREY Damien" },
  { role: "Vice-présidence", name: "PASTANELLA Davide" },
  { role: "Secrétaire", name: "LANGEL Thierry" },
  { role: "Trésorier", name: "WETZEL Denis" },
  { role: "Membre adjoint", name: "LECHEVALLIER Damien" },
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
            <div className="committee__row" key={member.role}>
              <div className="committee__role">{member.role}</div>
              <div className="committee__name">{member.name}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
