import React from 'react';
import { useLocalStorage, useStreak } from '@/lib/store';
import { HeartPulse, History, FastForward, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
export function InsightsPage() {
  const streak = useStreak();
  const [narrative, setNarrative] = useLocalStorage('Ascerta_2026_narrative', '');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-in fade-in duration-700">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">Data</h1>
          <p className="text-sm text-gray-500">Visualization of behavioral shifts.</p>
        </header>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-soft-green flex flex-col justify-between h-32 border border-green-100">
            <HeartPulse size={20} className="text-ascerta-purple" />
            <div>
              <p className="text-3xl font-bold">{streak}</p>
              <p className="text-[9px] font-bold uppercase text-gray-600 tracking-widest">Practice Streak</p>
            </div>
          </div>
          <div className="p-6 bg-soft-coral flex flex-col justify-between h-32 border border-coral-100">
            <Sparkles size={20} className="text-ascerta-purple" />
            <div>
              <p className="text-3xl font-bold">14</p>
              <p className="text-[9px] font-bold uppercase text-gray-600 tracking-widest">Active Reframes</p>
            </div>
          </div>
        </div>
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capacity Heatmap (30d)</h3>
          <div className="grid grid-cols-7 gap-1 bg-white p-2 border border-gray-100">
            {Array.from({length: 35}).map((_, i) => (
              <div
                key={i}
                className={`aspect-square transition-colors ${i % 5 === 0 ? 'bg-ascerta-purple' : i % 3 === 0 ? 'bg-soft-purple' : 'bg-gray-50'}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-bold uppercase text-gray-400">
            <span>Depleted</span>
            <span>Abundant</span>
          </div>
        </section>
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Narrative Planning</h3>
          <Accordion type="single" collapsible className="border border-gray-100 bg-white">
            <AccordionItem value="2026" className="border-none">
              <AccordionTrigger className="px-4 hover:no-underline uppercase text-[10px] font-bold tracking-widest h-14">
                My 2026 Future Self
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <Textarea
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  placeholder="Where are you in 2026? Describe your environment, your voice, and your boundaries."
                  className="font-serif italic text-sm min-h-[200px] border-none bg-gray-50 p-4 leading-relaxed focus-visible:ring-0"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reframe of the Week</h3>
          <div className="p-6 bg-soft-blue border border-blue-100 text-center">
            <p className="font-serif italic text-lg text-ascerta-purple leading-relaxed">
              "Your silence is a strategic resource, not a lack of contribution."
            </p>
          </div>
        </section>
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Return-After-Absence Protocol</h3>
          <div className="p-4 bg-white border border-gray-100 space-y-3">
            {[
              'Review 30d of Check-ins',
              'Reset Identity Rules',
              'Update stakeholders',
              'Body Check before first login'
            ].map((step, i) => (
              <div key={i} className="flex gap-3 text-xs items-start">
                <span className="text-ascerta-purple font-bold w-4 shrink-0">{i+1}.</span>
                <span className="text-gray-600 leading-tight">{step}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}