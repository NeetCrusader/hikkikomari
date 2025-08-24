'use client';

import { useEffect } from 'react';

export default function RegisterVisit() {
  useEffect(() => {
    fetch('/api/views', { method: 'POST' }).catch(console.error);
  }, []);

  return null;
}
