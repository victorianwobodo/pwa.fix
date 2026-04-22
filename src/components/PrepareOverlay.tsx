import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Info, Timer, CheckCircle } from 'lucide-react';
import { useAscertaStore, useLocalStorage } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function PrepareOverlay() {
  const setPrepareOpen = useAscertaStore(s => s.setPrepareOpen);
  const [step, setStep] = useState(1);
  const [ask, setAsk] = useState({ who: '', what: '', why: '' });
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [prepareLog, setPrepareLog] = useLocalStorage<any[]>('Ascerta_prepare_log', []);
  const [recoveryReps, setRecoveryReps] = useLocalStorage('Ascerta_recovery_reps', 0);
  const [identityRules] = useLocalStorage<string[]>('Ascerta_identity_rules', []);
  useEffect(() => {
    let interval: any;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);
  const handleFinish = () => {
    const newEntry = { ...ask, timestamp: new Date().toISOString() };
    setPrepareLog([newEntry, ...prepareLog]);
    setPrepareOpen(false);
  };
  const randomRule = identityRules[Math.floor(Math.random() * identityRules.length)] || "I state my needs clearly.";
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-[100] flex flex-col p-6 overflow-y-auto"
    >
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ascerta-purple">Prepare Protocol</h2>
        <button onClick={() => setPrepareOpen(false)} className="p-2">
          <X size={20} className="text-gray-400" />
        </button>
      </header>
      <div className="space-y-8 flex-1">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-[10px] font-bold mb-4 text-gray-500 uppercase tracking-widest">Step 1: Somatic Check</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Tense Jaw', 'Quick Breath', 'Tight Chest', 'Locked Knees', 'Fixed Gaze', 'High Shoulders'].map(item => (
                  <button 
                    key={item} 
                    onClick={() => { setTimer(60); setIsTimerActive(true); }}
                    className="p-4 border border-gray-100 text-left text-xs uppercase font-bold text-gray-600 hover:bg-soft-purple active:bg-soft-purple transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            {isTimerActive && (
              <div className="p-6 bg-soft-purple flex items-center justify-between border border-ascerta-purple/20">
                <div className="flex items-center gap-3">
                  <Timer className="text-ascerta-purple animate-pulse" />
                  <span className="font-serif italic text-sm">Regulation Breath...</span>
                </div>
                <span className="text-xl font-bold">{timer}s</span>
              </div>
            )}
            <Button onClick={() => setStep(2)} className="w-full h-14 bg-ascerta-purple uppercase font-bold tracking-widest">Regulated. Continue.</Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-[10px] font-bold mb-4 text-gray-500 uppercase tracking-widest">Step 2: Logic Framing</h3>
            <div className="space-y-4">
              <input
                placeholder="Who are you speaking to?"
                className="w-full p-4 border-b border-gray-100 outline-none text-sm placeholder:uppercase placeholder:text-[10px] placeholder:font-bold"
                value={ask.who}
                onChange={e => setAsk({ ...ask, who: e.target.value })}
              />
              <input
                placeholder="What is the request?"
                className="w-full p-4 border-b border-gray-100 outline-none text-sm placeholder:uppercase placeholder:text-[10px] placeholder:font-bold"
                value={ask.what}
                onChange={e => setAsk({ ...ask, what: e.target.value })}
              />
              <textarea
                placeholder="Why is this strategic now?"
                className="w-full p-4 border border-gray-100 outline-none text-sm h-24 placeholder:uppercase placeholder:text-[10px] placeholder:font-bold"
                value={ask.why}
                onChange={e => setAsk({ ...ask, why: e.target.value })}
              />
            </div>
            <div className="p-6 bg-soft-green text-sm font-serif italic leading-relaxed">
              "{ask.who || '[Name]'}, I am requesting {ask.what || '[request]'}. This is necessary because {ask.why || '[justification]'}."
            </div>
            <Button onClick={() => setStep(3)} className="w-full h-14 bg-ascerta-purple uppercase font-bold tracking-widest">Script Set. Anchor.</Button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-[10px] font-bold mb-4 text-gray-500 uppercase tracking-widest">Step 3: Identity Anchor</h3>
            <div className="p-10 border-2 border-ascerta-purple text-center bg-soft-purple/30">
              <p className="font-serif italic text-xl text-ascerta-purple leading-relaxed">"{randomRule}"</p>
            </div>
            <Button onClick={handleFinish} className="w-full h-14 bg-ascerta-purple uppercase font-bold tracking-widest">I Am Ready</Button>
            <div className="pt-8 space-y-4">
              <div className="p-4 border-l-2 border-ascerta-purple bg-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">Recovery Protocol</h4>
                  <p className="text-[11px] text-gray-500">If rejection occurs, log a rep.</p>
                </div>
                <button 
                  onClick={() => setRecoveryReps(prev => prev + 1)}
                  className="w-10 h-10 border border-ascerta-purple flex items-center justify-center text-ascerta-purple font-bold active:bg-ascerta-purple active:text-white"
                >
                  +1
                </button>
              </div>
              <button className="text-[10px] font-bold uppercase text-gray-400 underline flex items-center gap-1 mx-auto">
                <Info size={12} /> View Recovery Steps
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}