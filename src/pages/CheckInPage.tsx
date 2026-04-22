import React, { useState } from 'react';
import { useLocalStorage, getTodayStr, useDailyLog, useShameProtocol } from '@/lib/store';
import { Check, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
const PILLARS = [
  { id: 'body', name: 'Body', color: 'bg-soft-green', icon: '👤' },
  { id: 'mind', name: 'Mind', color: 'bg-soft-blue', icon: '🧠' },
  { id: 'space', name: 'Space', color: 'bg-soft-amber', icon: '🏠' },
  { id: 'connection', name: 'Connection', color: 'bg-soft-pink', icon: '🤝' },
  { id: 'pace', name: 'Pace', color: 'bg-soft-purple', icon: '⏱️' },
  { id: 'voice', name: 'Voice', color: 'bg-soft-coral', icon: '🗣️' },
];
export function CheckInPage() {
  const [log, setLog] = useDailyLog<Record<string, any>>('Ascerta_checkin', {});
  const [voiceLog, setVoiceLog] = useDailyLog<any>('Ascerta_voice_daily', {});
  const [energyAudit, setEnergyAudit] = useDailyLog<Record<string, string>>('Ascerta_energy_audit', {});
  const isShameTriggered = useShameProtocol();
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const savePillar = (id: string, value: any) => {
    setLog(prev => ({ ...prev, [id]: value }));
  };
  const handleEnergyAudit = (activity: string, state: string) => {
    setEnergyAudit(prev => ({ ...prev, [activity]: state }));
  };
  const handleComplete = () => {
    toast.success("Entry Logged", {
      description: "Leadership infrastructure updated.",
      className: "rounded-none border-ascerta-purple"
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-in fade-in duration-500">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">Daily Log</h1>
          <p className="text-sm text-gray-500">Documenting leadership infrastructure.</p>
        </header>
        {isShameTriggered && (
          <div className="p-6 bg-soft-coral border-2 border-dashed border-ascerta-purple/20 space-y-3">
            <div className="flex items-center gap-2 text-ascerta-purple">
              <AlertCircle size={20} />
              <h4 className="font-bold uppercase text-xs tracking-widest">Practice Continues</h4>
            </div>
            <p className="text-sm font-serif italic text-gray-700 leading-relaxed">
              "Absence of data is not failure. It is an observation of capacity. Today is a fresh start for your voice."
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="space-y-2">
              <button
                onClick={() => setActivePillar(activePillar === pillar.id ? null : pillar.id)}
                className={cn(
                  pillar.color,
                  "p-4 h-32 w-full flex flex-col justify-between text-left transition-all",
                  activePillar === pillar.id && "ring-2 ring-ascerta-purple"
                )}
              >
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{pillar.icon}</span>
                  {log[pillar.id] && <Check size={16} className="text-gray-900" />}
                </div>
                <div className="flex justify-between items-end w-full">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{pillar.name}</span>
                  {activePillar === pillar.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>
            </div>
          ))}
        </div>
        {activePillar === 'voice' && (
          <div className="p-6 bg-soft-coral space-y-6 animate-in slide-in-from-top-2 duration-300">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700">Self-Advocacy Audit</h3>
            <div className="space-y-4">
              {[
                "Did I state a need without hedging?",
                "Did I hold eye contact during a request?",
                "Did I avoid an 'I'm sorry' filler?",
                "Did I speak at my natural volume?",
                "Did I pause to let others respond?",
                "Did I name a boundary clearly?"
              ].map((q, i) => (
                <label key={i} className="flex items-start gap-3 text-sm cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={voiceLog[`q${i}`] || false}
                    onChange={(e) => setVoiceLog((prev: any) => ({ ...prev, [`q${i}`]: e.target.checked }))}
                    className="mt-1 w-4 h-4 border-gray-300 rounded-none checked:bg-ascerta-purple transition-colors"
                  />
                  <span className="font-serif italic text-[13px] text-gray-700 group-hover:text-black">{q}</span>
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Observations</p>
              <Textarea
                value={voiceLog.notes || ''}
                onChange={(e) => setVoiceLog((prev: any) => ({ ...prev, notes: e.target.value }))}
                className="bg-white/50 border-none rounded-none text-sm min-h-[100px] placeholder:italic"
                placeholder="Where did you swallow your voice today?"
              />
            </div>
          </div>
        )}
        {activePillar && activePillar !== 'voice' && (
          <div className="p-6 bg-gray-50 space-y-4 animate-in slide-in-from-top-2 duration-300">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{activePillar} Intensity</h3>
            <input
              type="range"
              min="1"
              max="10"
              value={log[activePillar] || 5}
              className="w-full accent-ascerta-purple h-2 bg-gray-200 rounded-none appearance-none"
              onChange={(e) => savePillar(activePillar, parseInt(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
              <span>Minimum</span>
              <span>Current: {log[activePillar] || 5}</span>
              <span>Optimum</span>
            </div>
          </div>
        )}
        <div className="space-y-6 pt-4 border-t border-gray-100">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Energy Audit</h3>
          <div className="space-y-3">
            {['Meetings', 'Email', 'Deep Work', 'Home Labor'].map(activity => (
              <div key={activity} className="p-4 border border-gray-100 flex items-center justify-between bg-white">
                <span className="text-sm font-medium">{activity}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEnergyAudit(activity, 'restored')}
                    className={cn(
                      "px-3 py-1 text-[9px] font-bold uppercase border transition-colors",
                      energyAudit[activity] === 'restored' ? "bg-soft-green border-green-200" : "border-gray-100 hover:bg-soft-green"
                    )}
                  >
                    Restored
                  </button>
                  <button 
                    onClick={() => handleEnergyAudit(activity, 'depleted')}
                    className={cn(
                      "px-3 py-1 text-[9px] font-bold uppercase border transition-colors",
                      energyAudit[activity] === 'depleted' ? "bg-soft-coral border-coral-200" : "border-gray-100 hover:bg-soft-coral"
                    )}
                  >
                    Depleted
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button className="w-full h-14 bg-ascerta-purple text-white font-bold uppercase tracking-widest" onClick={handleComplete}>
          Complete Daily Entry
        </Button>
      </div>
    </div>
  );
}