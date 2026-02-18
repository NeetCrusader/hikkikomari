import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('@/components/Profile'));

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[url('/4d8dec78-e182-4b68-9ea9-05d02fd52ffa.png')] bg-cover bg-center filter blur-xs"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 select-none">
        <Profile />
      </div>
    </div>
  );
}
