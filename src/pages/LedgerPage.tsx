import React, { useState } from 'react';
import { useLocalStorage } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ShieldCheck, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
export function LedgerPage() {
  const [beliefs, setBeliefs] = useLocalStorage<string[]>('Ascerta_operating_beliefs', [
    "My contribution is not defined by my availability.",
    "I am paid for my judgment, not my speed.",
    "I belong at every table I sit at."
  ]);
  const [checkedBeliefs, setCheckedBeliefs] = useLocalStorage<string[]>('Ascerta_checked_beliefs', []);
  const [newBelief, setNewBelief] = useState('');
  const toggleBelief = (belief: string) => {
    if (checkedBeliefs.includes(belief)) {
      setCheckedBeliefs(checkedBeliefs.filter(b => b !== belief));
    } else {
      setCheckedBeliefs([...checkedBeliefs, belief]);
    }
  };
  const addBelief = () => {
    if (newBelief.trim()) {
      setBeliefs([...beliefs, newBelief.trim()]);
      setNewBelief('');
    }
  };
  const deleteBelief = (index: number) => {
    const beliefToDelete = beliefs[index];
    setBeliefs(beliefs.filter((_, i) => i !== index));
    setCheckedBeliefs(checkedBeliefs.filter(b => b !== beliefToDelete));
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-in fade-in duration-700">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">Ledger</h1>
          <p className="text-sm text-gray-500">The quarterly capacity audit.</p>
        </header>
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Strategic Assessment</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Structural', 'Human', 'Political', 'Symbolic'].map(frame => (
              <div key={frame} className="p-4 bg-soft-blue space-y-2">
                <span className="text-[10px] font-bold uppercase text-gray-500">{frame} Frame</span>
                <p className="text-[9px] text-gray-400">Assessment of alignment</p>
                <div className="h-1 bg-white/40 w-full" />
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Costs / Restoration</h3>
          <div className="border border-gray-100 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[300px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="p-4 text-[9px] font-bold uppercase text-gray-400">Area</th>
                    <th className="p-4 text-[9px] font-bold uppercase text-gray-400">Sacrifice</th>
                    <th className="p-4 text-[9px] font-bold uppercase text-gray-400 text-center">Worth It?</th>
                  </tr>
                </thead>
                <tbody>
                  {['Financial', 'Social', 'Creative', 'Leisure', 'Health'].map(area => (
                    <tr key={area} className="border-b border-gray-50 last:border-0">
                      <td className="p-4 text-xs font-bold uppercase whitespace-nowrap">{area}</td>
                      <td className="p-4 text-[10px] text-gray-500 italic font-serif">Variable</td>
                      <td className="p-4">
                        <div className="flex justify-center gap-3">
                          <button className="w-6 h-6 border border-gray-200 active:bg-soft-green transition-colors" />
                          <button className="w-6 h-6 border border-gray-200 active:bg-soft-coral transition-colors" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <div className="p-6 border border-ascerta-purple border-dashed text-center space-y-2 bg-soft-purple/10">
            <ShieldCheck size={24} className="mx-auto text-ascerta-purple" />
            <h4 className="text-[10px] font-bold uppercase tracking-widest">Quarterly Reframe</h4>
            <p className="font-serif italic text-sm text-gray-700 leading-relaxed">
              "Am I doing the job I was hired for, or the emotional labor I was expected to provide?"
            </p>
          </div>
        </section>
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Worth Beliefs</h3>
          <div className="space-y-2">
            {beliefs.map((belief, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <label className="flex-1 flex items-center gap-3 p-4 bg-gray-50 text-xs cursor-pointer border border-transparent hover:border-gray-200 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={checkedBeliefs.includes(belief)}
                    onChange={() => toggleBelief(belief)}
                    className="w-4 h-4 border-gray-300 rounded-none accent-ascerta-purple" 
                  />
                  <span className={cn(checkedBeliefs.includes(belief) && "line-through text-gray-400")}>{belief}</span>
                </label>
                <button 
                  onClick={() => deleteBelief(i)}
                  className="p-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Input
                value={newBelief}
                onChange={(e) => setNewBelief(e.target.value)}
                placeholder="+ New operating belief"
                className="w-full h-12 border-gray-100 rounded-none text-xs outline-none bg-white focus:ring-ascerta-purple"
                onKeyDown={(e) => e.key === 'Enter' && addBelief()}
              />
              <button 
                onClick={addBelief}
                className="px-4 border border-gray-100 bg-white text-ascerta-purple active:bg-gray-50 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}