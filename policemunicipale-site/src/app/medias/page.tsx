import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Médias",
};

const MEDIA = [
  { src: "1636745-pic-970x641.jpg", alt: "Reportage 31/12" },
  { src: "1636723-pic-970x641.jpg", alt: "Reportage 31/12" },
  { src: "1636721-pic-970x641.jpg", alt: "Reportage 31/12" },
  { src: "1636719-pic-970x641.jpg", alt: "Reportage 31/12" },
  { src: "108749-1-52.jpg", alt: "Nissan LEAF to the Rescue in Europe" },
  { src: "img-0885.jpg", alt: "Photographe: Daniel Roch", caption: "Photographe: Daniel Roch" },
  { src: "img-0841.jpg", alt: "Photographe: Daniel Roch", caption: "Photographe: Daniel Roch" },
  { src: "dro-3711.jpg", alt: "Photographe: Daniel Roch", caption: "Photographe: Daniel Roch" },
  { src: "dro-3698.jpg", alt: "Photographe: Daniel Roch", caption: "Photographe: Daniel Roch" },
  { src: "dro-3689.jpg", alt: "Photographe: Daniel Roch", caption: "Photographe: Daniel Roch" },
  { src: "home-img-111111-1024x4741.jpg", alt: "Galerie SPMG" },
  { src: "1925324-649428541773735-415183655-n.jpg", alt: "Galerie SPMG" },
  { src: "1654795-722854514401447-790607557-o.jpg", alt: "Galerie SPMG" },
  { src: "93859-43uz-trrkp-kjxx6-c3dgg.jpg", alt: "Galerie SPMG" },
  { src: "pol3-modif.jpg", alt: "Galerie SPMG" },
];

export default function MediasPage() {
  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Médias</h1>
          <p className="lede">
            Photographies et reportages liés à la police municipale genevoise.
          </p>
        </section>
      </div>
      <section className="section">
        <div className="media-grid">
          {MEDIA.map((item) => (
            <figure key={item.src}>
              <Image
                src={`/images/${item.src}`}
                alt={item.alt}
                width={480}
                height={320}
              />
            </figure>
          ))}
        </div>
        <p className="media-caption" style={{ marginTop: "1.25rem" }}>
          Crédits photos : Daniel Roch (sélection) — contenu exporté du site
          source.
        </p>
      </section>
    </>
  );
}
