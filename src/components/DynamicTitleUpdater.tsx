'use client';

import { useEffect } from 'react';

export default function DynamicTitleUpdater() {
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

        if (data._dn) {
          const currentTitle = document.title;
          const baseTitle = currentTitle.split('~')[0].trim();

          document.title = `${baseTitle} ~ ${data._dn}`;

          const ogTitle = document.querySelector("meta[property='og:title']");
          const ogDesc = document.querySelector("meta[property='og:description']");

          if (ogTitle) ogTitle.setAttribute('content', `${baseTitle} ~ ${data._dn}`);
          if (ogDesc) ogDesc.setAttribute('content', `OpenGraph atualizado dinamicamente`);
        }
      } catch (_err) {
        console.error('Invalid JSON:', event.data);
      }
    };

    const ping = setInterval(() => socket.send('ping'), 10000);

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
      socket.close();
      clearInterval(ping);
    };
  }, []);

  return null;
}
