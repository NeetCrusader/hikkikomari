'use client';

import Overlay from './Overlay';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function OverlayWrapper({ children }: { children: React.ReactNode }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isOverlayVisible) {
      setShowContent(true);
    }
  }, [isOverlayVisible]);

  return (
    <>
      <AnimatePresence>
        {isOverlayVisible && <Overlay onClose={() => setIsOverlayVisible(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </>
  );
}
