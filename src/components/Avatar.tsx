import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Avatar({ src, alt = '', width = 96, height = 96, className }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
