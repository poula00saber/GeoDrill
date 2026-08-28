import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * GeoDrill brand logo.
 *
 * Two normal colour variations ship as raster images:
 *   - logo.png  -> used on light backgrounds (light/coloured theme logo)
 *   - logo2.png -> used on dark backgrounds (dark theme logo)
 *
 * Pass `onDark` to pick the darker variant, or `src` to override entirely.
 *
 * `monochrome` renders the logo in a single colour driven purely by the theme
 * via a CSS filter (no new asset needed):
 *   - Light theme -> `brightness(0)`          (pure black)
 *   - Dark theme  -> `brightness(0) invert(1)` (pure white)
 */
export function Logo({
  className,
  size = "h-10",
  src,
  onDark = false,
  monochrome = false,
}: {
  className?: string;
  /** Height utility applied to the logo image (e.g. 'h-9', 'h-10', 'h-12'). */
  size?: string;
  /** Explicit logo asset. When omitted, onDark selects /logo2.png else /logo.png. */
  src?: string;
  /** true → use the dark/for-dark logo (logo2.png). */
  onDark?: boolean;
  /** true → force a single colour: pure black on light, pure white on dark. */
  monochrome?: boolean;
}) {
  const resolved = src ?? (onDark ? "/logo2.png" : "/logo.png");
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={resolved}
        alt="GEODRILL — Construction Experts"
        width={180}
        height={48}
        priority
        className={cn(
          size,
          "w-auto object-contain",
          // Pure black in light theme, pure white in dark theme.
          monochrome && "brightness-0 dark:brightness-0 dark:invert",
        )}
      />
    </span>
  );
}
