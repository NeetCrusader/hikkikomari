'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpotify,
  faInstagram,
  faReddit,
  faSteam,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { SOCIALS } from '@/config/socials';
import { motion, AnimatePresence } from 'framer-motion';

type Direction = 'top' | 'bottom' | 'left' | 'right';

const socialsData = [
  { name: 'Spotify', icon: faSpotify, url: SOCIALS.spotify },
  { name: 'Instagram', icon: faInstagram, url: SOCIALS.instagram },
  { name: 'Reddit', icon: faReddit, url: SOCIALS.reddit },
  { name: 'Steam', icon: faSteam, url: SOCIALS.steam },
  { name: 'X', icon: faTwitter, url: SOCIALS.x },
];

export default function SocialLinks() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>('top');

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const vertical = y < rect.height / 2 ? 'top' : 'bottom';
    const horizontal = x < rect.width / 2 ? 'left' : 'right';

    const dir =
      Math.abs(y - rect.height / 2) > Math.abs(x - rect.width / 2) ? vertical : horizontal;

    setDirection(dir as Direction);
    setHovered(name);
  };

  return (
    <div className="flex justify-center gap-6 mt-4">
      {socialsData.map((social) => (
        <div key={social.name} className="relative flex flex-col items-center">
          <Link href={social.url} target="_blank" rel="noopener noreferrer">
            <button
              type="button"
              onMouseEnter={(e) => handleMouseEnter(e, social.name)}
              onMouseLeave={() => setHovered(null)}
              className="text-3xl relative z-10 text-neutral-200/60 hover:text-neutral-100 duration-300 cursor-pointer"
            >
              <FontAwesomeIcon icon={social.icon} />
            </button>
          </Link>

          <AnimatePresence>
            {hovered === social.name && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className={`
                  absolute px-4 py-2 rounded-md bg-black/65 border border-neutral-400/30
                  text-neutral-200 text-xs shadow-lg z-20
                  ${direction === 'top' ? 'bottom-full mb-2' : ''}
                  ${direction === 'bottom' ? 'top-full mt-2' : ''}
                  ${direction === 'left' ? 'right-full mr-2' : ''}
                  ${direction === 'right' ? 'left-full ml-2' : ''}
                `}
              >
                {social.name}
                <span
                  className={`
                    absolute w-2 h-2 bg-black/50 border border-neutral-400/30 rotate-45
                    ${direction === 'top' ? '-bottom-1 left-1/2 -translate-x-1/2' : ''}
                    ${direction === 'bottom' ? '-top-1 left-1/2 -translate-x-1/2' : ''}
                    ${direction === 'left' ? '-right-1 top-1/2 -translate-y-1/2' : ''}
                    ${direction === 'right' ? '-left-1 top-1/2 -translate-y-1/2' : ''}
                  `}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
