import type React from 'react';
import { Loader2 } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <Loader2 className="animate-spin text-white" size={32} />
    </div>
  );
};

export default Loading;
