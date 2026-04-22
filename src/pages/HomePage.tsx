import React from 'react';
import { useLocalStorage, getDayOfYear } from '@/lib/store';
import { User, Shield, Battery, Zap, ChevronRight } from 'lucide-react';
const AFFIRMATIONS = [
  "My voice is a valuable strategic asset.",
  "Setting boundaries increases my professional impact.",
  "Direct communication is a form of kindness.",
  "I am the leader of my own time and energy.",
  "Clarity is more important than being liked.",
  "I trust my expertise and my instincts.",
  "I don't need permission to lead.",
  "Rest is a requirement for excellence.",
  "My presence is intentional and powerful.",
  "I speak my truth with calm confidence.",
  "I am building a sustainable leadership path.",
  "My limits are my strengths."
];
export function HomePage() {
  const [identityRules, setIdentityRules] = useLocalStorage<string[]>('Ascerta_identity_rules', [
    'I do not apologize for having needs.',
    'I finish my sentences without trailing off.',
    'I pause before saying yes.'
  ]);
  const [energyState] = useLocalStorage<string>('Ascerta_last_energy', 'high');
  const dayIndex = getDayOfYear() % 12;
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <header className="space-y-1">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Tuesday, Oct 24</p>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, Elena</h1>
      </header>
      {/* Energy Banner */}
      <div className={`p-4 ${energyState === 'low' ? 'bg-soft-amber' : 'bg-soft-purple'} flex items-start gap-4`}>
        <div className="mt-1">
          <Zap size={20} className="text-ascerta-purple" />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Capacity Snapshot</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            {energyState === 'low' 
              ? "Energy is dipping. Prioritize structural frames today and delegate where possible."
              : "Energy is stable. A good day for high-stakes conversations and political strategy."}
          </p>
        </div>
      </div>
      {/* Affirmation */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Today's Anchor</h3>
        <p className="font-serif italic text-xl leading-relaxed text-ascerta-purple">
          "{AFFIRMATIONS[dayIndex]}"
        </p>
      </div>
      {/* Identity Rules */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Identity Rules</h3>
          <Shield size={16} className="text-gray-300" />
        </div>
        <div className="space-y-2">
          {identityRules.map((rule, i) => (
            <div key={i} className="p-4 bg-white border border-gray-100 text-sm flex items-center justify-between group">
              <span>{rule}</span>
              <ChevronRight size={14} className="text-gray-300 group-hover:text-ascerta-purple transition-colors" />
            </div>
          ))}
        </div>
      </div>
      {/* Capacity Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Daily Pulse</h3>
        <div className="grid grid-cols-2 gap-3">
          <PulseItem label="Nervous System" color="bg-soft-green" />
          <PulseItem label="Voice Usage" color="bg-soft-pink" />
          <PulseItem label="Spatial Depth" color="bg-soft-blue" />
          <PulseItem label="Boundary Load" color="bg-soft-coral" />
        </div>
      </div>
    </div>
  );
}
function PulseItem({ label, color }: { label: string; color: string }) {
  return (
    <div className={`p-4 ${color} flex flex-col justify-between h-24`}>
      <span className="text-xs font-medium text-gray-800">{label}</span>
      <div className="flex justify-between items-end">
        <span className="text-lg font-bold">7.5</span>
        <div className="w-2 h-2 rounded-full bg-gray-900/10" />
      </div>
    </div>
  );
}