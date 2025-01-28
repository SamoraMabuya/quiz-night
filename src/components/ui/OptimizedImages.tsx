import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}
export function OptimizedImage({
  src,
  alt,
  className,
  sizes = "100vw",
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${loading ? "blur-sm" : "blur-0"}`}
      loading="lazy" // lazy for images above the fold
      onLoad={() => setLoading(false)}
      sizes={sizes}
      decoding="async"
    />
  );
}
