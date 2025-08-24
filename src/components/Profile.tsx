'use client';

import { useEffect, useState } from 'react';
import type { Presence } from '@/typings';
import Loading from './Loading';
import PresenceCard from './PresenceCard';
import SvgImage from './SvgImage';
import SocialLinks from './SocialLinks';

export default function Profile() {
  const [presence, setPresence] = useState<Presence | null>(null);

  useEffect(() => {
    const socket = new WebSocket(process.env.RICH_PRESENCE as string);

    const handleOpen = () => {
      console.log('WebSocket connected');
      socket.send('Connection established');
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'connected' || event.data === 'pong') return;
      try {
        const data = JSON.parse(event.data);
        setPresence(data);
      } catch (_err) {
        console.error('Invalid JSON:', event.data);
      }
    };

    const ping = setInterval(() => {
      socket.send('ping');
    }, 10000);

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
      socket.close();
      clearInterval(ping);
    };
  }, []);

  if (!presence) return <Loading />;

  return (
    <div className="bg-black/10 border border-neutral-600/20 w-full max-w-xl mx-auto p-8 rounded-lg shadow-lg backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <SvgImage
          src={presence.pfp}
          alt={presence._dn}
          width={96}
          height={96}
          className="rounded-full"
        />

        <div className="flex flex-col items-center space-y-1">
          <h1 className="text-xl font-bold text-center text-neutral-100">{presence._dn}</h1>

          {presence.customStatus?.name && (
            <div className="flex items-center gap-2">
              {presence.customStatus.emoji && (
                <SvgImage
                  src={presence.customStatus.emoji}
                  alt={presence.customStatus.name}
                  width={18}
                  height={18}
                  className="object-contain"
                />
              )}
              <p className="text-sm text-neutral-300/60 text-center font-semibold">
                {presence.customStatus.name}
              </p>
            </div>
          )}
        </div>

        {presence.activities.length > 0 && (
          <PresenceCard
            presence={presence}
            date={new Date()}
            direction="bottom"
            span={2}
            gradient="bg-gradient-to-r from-primary to-secondary"
            delay={0.2}
          />
        )}

        <SocialLinks />
      </div>
    </div>
  );
}
