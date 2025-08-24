import { useEffect, useState } from 'react';

interface SvgImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}
/**
 * SvgImage - Renders any image as SVG using the original URL.
 * By default, it uses the original width and height of the image, but accepts props to override them.
 * Includes alt for accessibility.
 */
export default function SvgImage({ src, alt = '', width, height, className }: SvgImageProps) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [src]);

  if (!dimensions) return <div>Carregando...</div>;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? dimensions.width}
      height={height ?? dimensions.height}
      className={className}
      role="img"
      aria-label={alt}
    >
      <image href={src} width={width ?? dimensions.width} height={height ?? dimensions.height} />
    </svg>
  );
}
