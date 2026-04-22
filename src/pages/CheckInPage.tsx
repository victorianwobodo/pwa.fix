import React, { useState } from 'react';
import { useLocalStorage, getTodayStr } from '@/lib/store';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
const PILLARS = [
  { name: 'Body', color: 'bg-soft-green', icon: '👤' },
  { name: 'Mind', color: 'bg-soft-blue', icon: '🧠' },
  { name: 'Space', color: 'bg-soft-amber', icon: '🏠' },
  { name: 'Connection', color: 'bg-soft-pink', icon: '🤝' },
  { name: 'Pace', color: 'bg-soft-purple', icon: '⏱️' },
  { name: 'Voice', color: 'bg-soft-coral', icon: '🗣️' },
];
export function CheckInPage() {
  const today = getTodayStr();
  const [log, setLog] = useLocalStorage<any>(`Ascerta_checkin_${today}`, {});
  const [voiceExpanded, setVoiceExpanded] = useState(false);
  const savePillar = (name: string, value: number) => {
    setLog({ ...log, [name]: value });
  };
  return (
    <div className="p-6 space-y-8 pb-32 overflow-y-auto">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-gray-900">Daily Check-in</h1>
        <p className="text-sm text-gray-500">Track your leadership infrastructure.</p>
      </header>
      <div className="grid grid-cols-2 gap-4">
        {PILLARS.map((pillar) => (
          <div key={pillar.name} className="space-y-2">
            <button
              onClick={() => pillar.name === 'Voice' ? setVoiceExpanded(!voiceExpanded) : null}
              className={`${pillar.color} p-4 h-32 flex flex-col justify-between text-left group`}
            >
              <div className="flex justify-between items-start">
                <span className="text-2xl">{pillar.icon}</span>
                {log[pillar.name] && <Check size={16} className="text-gray-900" />}
              </div>
              <div className="flex justify-between items-end w-full">
                <span className="text-sm font-semibold">{pillar.name}</span>
                {pillar.name === 'Voice' && (
                  voiceExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                )}
              </div>
            </button>
            {!voiceExpanded && pillar.name !== 'Voice' && (
              <input
                type="range"
                min="1"
                max="10"
                className="w-full accent-ascerta-purple"
                onChange={(e) => savePillar(pillar.name, parseInt(e.target.value))}
              />
            )}
          </div>
        ))}
      </div>
      {voiceExpanded && (
        <div className="p-6 bg-soft-coral space-y-6 animate-in slide-in-from-top-2 duration-300">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-700">The Voice Pillar</h3>
          <div className="space-y-4">
            {[
              "Did I state a need without hedging?",
              "Did I hold eye contact during a request?",
              "Did I avoid an 'I'm sorry' filler?",
              "Did I speak at my natural volume?",
              "Did I pause to let others respond?",
              "Did I name a boundary clearly?"
            ].map((q, i) => (
              <label key={i} className="flex items-start gap-3 text-sm cursor-pointer">
                <input type="checkbox" className="mt-1 w-4 h-4 border-gray-300 rounded-none checked:bg-ascerta-purple" />
                <span>{q}</span>
              </label>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">Observations</p>
            <Textarea className="bg-white/50 border-none rounded-none text-sm" placeholder="Where did you swallow your voice today?" />
          </div>
        </div>
      )}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Recovery Log</h3>
        <div className="p-4 bg-soft-purple flex justify-between items-center">
          <span className="text-sm">Total Recovery Reps today</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 bg-white border border-gray-100 flex items-center justify-center text-xs font-bold">
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button className="w-full h-12 bg-ascerta-purple" onClick={() => alert('Saved!')}>
        Complete Entry
      </Button>
    </div>
  );
}