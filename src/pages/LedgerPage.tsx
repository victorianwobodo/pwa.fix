import React from 'react';
import { useLocalStorage } from '@/lib/store';
import { ShieldCheck, TrendingDown, Layers } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
export function LedgerPage() {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
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
        <div className="border border-gray-100 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="p-3 text-[9px] font-bold uppercase text-gray-400">Area</th>
                <th className="p-3 text-[9px] font-bold uppercase text-gray-400">Sacrifice</th>
                <th className="p-3 text-[9px] font-bold uppercase text-gray-400">Worth It?</th>
              </tr>
            </thead>
            <tbody>
              {['Financial', 'Social', 'Creative', 'Leisure', 'Health'].map(area => (
                <tr key={area} className="border-b border-gray-50 last:border-0">
                  <td className="p-3 text-xs font-bold uppercase">{area}</td>
                  <td className="p-3 text-[10px] text-gray-500 italic font-serif">Variable</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 border border-gray-200" />
                      <div className="w-3 h-3 border border-gray-200" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="space-y-4">
        <div className="p-6 border border-ascerta-purple border-dashed text-center space-y-2">
          <ShieldCheck size={24} className="mx-auto text-ascerta-purple" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest">Quarterly Reframe</h4>
          <p className="font-serif italic text-sm text-gray-700">
            "Am I doing the job I was hired for, or the emotional labor I was expected to provide?"
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Worth Beliefs</h3>
        <div className="space-y-2">
          {[
            "My contribution is not defined by my availability.",
            "I am paid for my judgment, not my speed.",
            "I belong at every table I sit at."
          ].map((belief, i) => (
            <label key={i} className="flex items-center gap-3 p-4 bg-gray-50 text-xs cursor-pointer">
              <input type="checkbox" className="w-4 h-4 border-gray-300 rounded-none" />
              <span>{belief}</span>
            </label>
          ))}
          <input 
            placeholder="+ New operating belief"
            className="w-full p-4 border border-gray-100 text-xs outline-none"
          />
        </div>
      </section>
    </div>
  );
}