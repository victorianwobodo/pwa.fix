import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, ClipboardCheck, Compass, Bookmark, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAscertaStore } from '@/lib/store';
import { PrepareOverlay } from '@/components/PrepareOverlay';
export function MobileLayout() {
  const isPrepareOpen = useAscertaStore(s => s.isPrepareOpen);
  const setPrepareOpen = useAscertaStore(s => s.setPrepareOpen);
  return (
    <div className="flex justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-[390px] h-[100dvh] relative bg-white border-x border-gray-100 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </main>
        {/* Floating Prepare Button */}
        <button
          onClick={() => setPrepareOpen(true)}
          className="absolute bottom-20 right-4 w-12 h-12 bg-ascerta-purple rounded-full flex items-center justify-center text-white z-40 active:scale-95 transition-transform"
        >
          <Plus size={24} />
        </button>
        {/* Navigation */}
        <nav className="h-16 border-t border-gray-100 flex items-center justify-around px-4 pb-[env(safe-area-inset-bottom)] bg-white z-40">
          <NavItem to="/" icon={<Home size={20} />} label="Home" />
          <NavItem to="/check-in" icon={<ClipboardCheck size={20} />} label="Check-in" />
          <NavItem to="/frames" icon={<Compass size={20} />} label="Frames" />
          <NavItem to="/commitments" icon={<Bookmark size={20} />} label="Commitments" />
        </nav>
        {isPrepareOpen && <PrepareOverlay />}
      </div>
    </div>
  );
}
function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-1 text-[10px] font-medium transition-colors",
          isActive ? "text-ascerta-purple" : "text-gray-400"
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}