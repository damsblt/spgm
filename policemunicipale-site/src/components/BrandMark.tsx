import Image from "next/image";

type Props = {
  /** Visual size for header vs compact contexts */
  size?: "header" | "compact";
  className?: string;
};

/** Intrinsic logo dimensions (1256×740). */
const INTRINSIC = { width: 1256, height: 740 } as const;

/**
 * Official SPMG logo (eagle emblem + wordmark).
 * Display size is controlled via CSS; width/height keep correct aspect ratio.
 */
export function BrandMark({ size = "header", className = "" }: Props) {
  return (
    <span className={`brand-mark brand-mark--${size} ${className}`.trim()}>
      <Image
        src="/images/spmg-logo.webp"
        alt="SPMG — Syndicat des Polices Municipales Genevoises"
        width={INTRINSIC.width}
        height={INTRINSIC.height}
        className="brand-mark__img"
        priority={size === "header"}
        sizes={
          size === "compact"
            ? "(max-width: 860px) 140px, 168px"
            : "(max-width: 860px) 168px, 220px"
        }
      />
    </span>
  );
}
