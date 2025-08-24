'use client';

import { motion } from 'framer-motion';

interface OverlayProps {
  onClose: () => void;
}

export default function Overlay({ onClose }: OverlayProps) {
  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer"
    >
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="text-neutral-100/90 text-2xl font-bold"
      >
        [Click to enter...]
      </motion.h1>
    </motion.div>
  );
}
