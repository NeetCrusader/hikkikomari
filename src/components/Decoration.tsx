import Image from 'next/image';

interface DecorationProps {
  src: string;
  size?: number;
  alt?: string;
}

export default function Decoration({ src, size = 140, alt = 'avatar decoration' }: DecorationProps) {
  return (
    <div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        priority
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
