import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('@/components/Profile'));

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[url('/245YJEKOF7FQ7KCI2AEKMTFCYPJ36R810C5RA5MYJL13AS9UFB6S1LYHU55FFG6U.png')] bg-cover bg-center filter blur-xs"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 select-none">
        <Profile />
      </div>
    </div>
  );
}
