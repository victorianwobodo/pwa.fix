import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Info } from 'lucide-react';
import { useAscertaStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
export function PrepareOverlay() {
  const setPrepareOpen = useAscertaStore(s => s.setPrepareOpen);
  const [step, setStep] = useState(1);
  const [ask, setAsk] = useState({ who: '', what: '', why: '' });
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-50 flex flex-col p-6 overflow-y-auto"
    >
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-ascerta-purple">Prepare</h2>
        <button onClick={() => setPrepareOpen(false)} className="p-2">
          <X size={24} className="text-gray-400" />
        </button>
      </header>
      <div className="space-y-8 flex-1">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-sm font-medium mb-4 text-gray-500 uppercase tracking-wider">Step 1: Body Check</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Steady Breath', 'Ground Feet', 'Soft Jaw', 'Open Posture'].map(item => (
                  <button key={item} className="p-4 border border-gray-100 text-left text-sm hover:bg-soft-purple active:bg-soft-purple transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={() => setStep(2)} className="w-full bg-ascerta-purple">Continue</Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-sm font-medium mb-4 text-gray-500 uppercase tracking-wider">Step 2: Script Your Ask</h3>
            <div className="space-y-4">
              <input
                placeholder="Who are you speaking to?"
                className="w-full p-3 border-b border-gray-100 outline-none text-sm"
                value={ask.who}
                onChange={e => setAsk({ ...ask, who: e.target.value })}
              />
              <input
                placeholder="What exactly is the request?"
                className="w-full p-3 border-b border-gray-100 outline-none text-sm"
                value={ask.what}
                onChange={e => setAsk({ ...ask, what: e.target.value })}
              />
              <textarea
                placeholder="Why is this important now?"
                className="w-full p-3 border border-gray-100 outline-none text-sm h-24"
                value={ask.why}
                onChange={e => setAsk({ ...ask, why: e.target.value })}
              />
            </div>
            <div className="p-4 bg-soft-green text-xs font-serif italic leading-relaxed">
              "{ask.who || '[Name]'}, I am requesting {ask.what || '[request]'}. This matters because {ask.why || '[justification]'}."
            </div>
            <Button onClick={() => setStep(3)} className="w-full bg-ascerta-purple">Final Anchor</Button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-sm font-medium mb-4 text-gray-500 uppercase tracking-wider">Step 3: Identity Anchor</h3>
            <div className="p-8 border border-ascerta-purple text-center">
              <p className="font-serif italic text-lg text-ascerta-purple">"I state my needs clearly without apology."</p>
            </div>
            <Button onClick={() => setPrepareOpen(false)} className="w-full bg-ascerta-purple">I'm Ready</Button>
            <div className="text-center">
              <button className="text-xs text-gray-400 underline flex items-center gap-1 mx-auto">
                <Info size={12} /> Open Recovery Protocol
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}