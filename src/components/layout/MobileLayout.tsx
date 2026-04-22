import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, ClipboardCheck, Compass, Bookmark, Wallet, BarChart3, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAscertaStore } from '@/lib/store';
import { PrepareOverlay } from '@/components/PrepareOverlay';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
export function MobileLayout() {
  const isPrepareOpen = useAscertaStore(s => s.isPrepareOpen);
  const setPrepareOpen = useAscertaStore(s => s.setPrepareOpen);
  return (
    <div className="flex justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-[390px] h-[100dvh] relative bg-white border-x border-gray-100 flex flex-col overflow-hidden shadow-none">
        <main className="flex-1 overflow-y-auto pb-24">
          <Outlet />
        </main>
        {/* Floating Prepare Button */}
        <button
          onClick={() => setPrepareOpen(true)}
          className="absolute bottom-24 right-4 w-12 h-12 bg-ascerta-purple rounded-full flex items-center justify-center text-white z-40 active:scale-95 transition-transform"
          aria-label="Prepare"
        >
          <Plus size={24} />
        </button>
        {/* 6-Tab Navigation */}
        <nav className="h-20 border-t border-gray-100 grid grid-cols-6 items-center px-1 pb-[env(safe-area-inset-bottom)] bg-white z-40">
          <NavItem to="/" icon={<Home size={18} />} label="Home" />
          <NavItem to="/check-in" icon={<ClipboardCheck size={18} />} label="Log" />
          <NavItem to="/frames" icon={<Compass size={18} />} label="Frames" />
          <NavItem to="/commitments" icon={<Bookmark size={18} />} label="Track" />
          <NavItem to="/ledger" icon={<Wallet size={18} />} label="Ledger" />
          <NavItem to="/insights" icon={<BarChart3 size={18} />} label="Data" />
        </nav>
        <AnimatePresence>
          {isPrepareOpen && <PrepareOverlay />}
        </AnimatePresence>
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              borderRadius: '0px',
              border: '1px solid #E5E7EB',
              boxShadow: 'none',
              fontFamily: 'Inter, sans-serif'
            }
          }}
        />
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
          "flex flex-col items-center justify-center gap-1 text-[9px] font-medium transition-colors h-full",
          isActive ? "text-ascerta-purple" : "text-gray-400"
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}