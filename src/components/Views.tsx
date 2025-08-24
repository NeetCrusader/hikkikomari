'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

interface ViewsProps {
  views: number | null;
}

export default function Views({ views }: ViewsProps) {
  if (views === null) return null;

  return (
    <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/10 border border-neutral-600/20 text-neutral-100/50 px-3 py-1 rounded-md text-sm">
      <FontAwesomeIcon icon={faEye} />
      <span>{views}</span>
    </div>
  );
}
