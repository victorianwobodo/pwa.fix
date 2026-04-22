import React, { useState } from 'react';
import { useLocalStorage, getDayOfYear, getTodayStr, AFFIRMATIONS, useDailyLog } from '@/lib/store';
import { Zap, Edit3, Bell } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
export function HomePage() {
  // Hooks must be called in the exact same order every render
  const today = getTodayStr();
  const [identityRules] = useLocalStorage<string[]>('Ascerta_identity_rules', [
    'I do not apologize for having needs.',
    'I finish my sentences without trailing off.',
    'I pause before saying yes.'
  ]);
  const [pulse, setPulse] = useDailyLog<string>('Ascerta_pulse', 'Neutral');
  const [capacity, setCapacity] = useDailyLog<Record<string, string>>('Ascerta_capacity', {
    physical: 'neutral',
    emotional: 'neutral',
    mental: 'neutral',
    relational: 'neutral'
  });
  const [isRulesEditing, setIsRulesEditing] = useState(false);
  const dayIndex = getDayOfYear() % 12;
  const [currentAffirmation, setCurrentAffirmation] = useState(dayIndex);
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentAffirmation(prev => (prev + 1) % 12),
    onSwipedRight: () => setCurrentAffirmation(prev => (prev - 1 + 12) % 12),
    trackMouse: true
  });
  const progressCount = [
    pulse !== 'Neutral' ? 1 : 0,
    ...Object.values(capacity).map(v => (v !== 'neutral' ? 1 : 0))
  ].reduce((a, b) => a + b, 0);
  const progressPercent = (progressCount / 5) * 100;
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            {format(new Date(), 'EEEE, MMM d')}
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, Elena</h1>
        </div>
        <Link to="/insights" className="p-2 text-gray-400">
          <Bell size={20} />
        </Link>
      </header>
      {/* Energy Banner */}
      <div className={cn(
        "p-4 flex items-start gap-4 transition-colors",
        pulse === 'Depleted' ? 'bg-soft-coral' : pulse === 'Abundance' ? 'bg-soft-green' : 'bg-soft-purple'
      )}>
        <Zap size={20} className="text-ascerta-purple mt-1 shrink-0" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold uppercase tracking-tight">Strategy Note</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            {pulse === 'Depleted'
              ? "Energy is low. Prioritize structural tasks today and delegate emotional labor."
              : pulse === 'Abundance'
              ? "Capacity is high. Ideal for high-stakes advocacy and political framing."
              : "Stability is key today. Focus on pace and boundary maintenance."}
          </p>
        </div>
      </div>
      {/* Swipeable Affirmation */}
      <div {...handlers} className="space-y-3 cursor-grab active:cursor-grabbing touch-none">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Daily Anchor</h3>
        <p className="font-serif italic text-lg leading-relaxed text-ascerta-purple min-h-[3.5rem]">
          "{AFFIRMATIONS[currentAffirmation]}"
        </p>
        <div className="flex gap-1 justify-center">
          {AFFIRMATIONS.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-1 h-1 transition-colors", 
                i === currentAffirmation ? "bg-ascerta-purple" : "bg-gray-200"
              )} 
            />
          ))}
        </div>
      </div>
      {/* Pulse Selector */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Morning Pulse</h3>
        <div className="grid grid-cols-3 gap-2">
          {['Depleted', 'Neutral', 'Abundance'].map(mode => (
            <button
              key={mode}
              onClick={() => setPulse(mode)}
              className={cn(
                "py-3 text-[10px] font-bold uppercase border transition-all",
                pulse === mode ? "bg-ascerta-purple text-white border-ascerta-purple" : "bg-white border-gray-100 text-gray-400"
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      {/* Identity Rules */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Identity Rules</h3>
          <button 
            onClick={() => setIsRulesEditing(!isRulesEditing)} 
            className="text-gray-400 hover:text-ascerta-purple"
          >
            <Edit3 size={14} />
          </button>
        </div>
        <div className="space-y-2">
          {identityRules.map((rule, i) => (
            <div key={i} className="p-4 bg-white border-l-2 border-ascerta-purple border-y border-r border-gray-100">
              <p className="font-serif text-sm italic text-gray-800 leading-relaxed">"{rule}"</p>
            </div>
          ))}
        </div>
      </div>
      {/* Capacity Grid */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capacity Snapshot</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(capacity).map(([key, val]) => (
            <button
              key={key}
              onClick={() => {
                const cycle: Record<string, string> = { neutral: 'restored', restored: 'deficit', deficit: 'neutral' };
                setCapacity(prev => ({ ...prev, [key]: cycle[val] }));
              }}
              className={cn(
                "p-4 text-left flex flex-col justify-between h-24 transition-colors",
                val === 'restored' ? 'bg-soft-green' : val === 'deficit' ? 'bg-soft-coral' : 'bg-soft-blue'
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">{key}</span>
              <span className="text-lg font-bold capitalize">{val}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
          <span>Daily Readiness</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-1 bg-gray-100 w-full overflow-hidden">
          <div 
            className="h-full bg-ascerta-purple transition-all duration-500" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>
      <Button asChild className="w-full h-14 bg-ascerta-purple text-white font-bold uppercase tracking-widest rounded-none shadow-none">
        <Link to="/check-in">Begin Today's Check-in</Link>
      </Button>
    </div>
  );
}