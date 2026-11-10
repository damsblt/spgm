type Props = {
  /** Visual size for header vs compact contexts */
  size?: "header" | "compact";
  className?: string;
};

const LETTERS = ["S", "P", "M", "G"] as const;

/**
 * Vector-style wordmark inspired by home-logo41.png, without scaling the bitmap
 * (avoids pixelation and illegible fine print).
 */
export function BrandMark({ size = "header", className = "" }: Props) {
  return (
    <span className={`brand-mark brand-mark--${size} ${className}`.trim()}>
      <span className="brand-mark__row" aria-hidden="true">
        <span className="brand-mark__blocks">
          {LETTERS.map((letter) => (
            <span key={letter} className="brand-mark__block">
              {letter}
            </span>
          ))}
        </span>
      </span>
      <span className="brand-mark__rule" aria-hidden="true" />
      <span className="brand-mark__name">
        Syndicat des Polices Municipales Genevoises
      </span>
      <span className="sr-only">SPMG — Syndicat des Polices Municipales Genevoises</span>
    </span>
  );
}
