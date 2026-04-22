import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, Briefcase, Users, Scale, Star } from 'lucide-react';
const FRAMES = [
  {
    id: 'structural',
    title: 'Structural Frame',
    icon: <Briefcase size={18} />,
    color: 'bg-soft-blue',
    border: 'border-blue-200',
    tagline: 'Architecting clarity through roles and rules.',
    practices: ['Update job descriptions', 'Define meeting agendas', 'Clarify delegation levels'],
    prompt: 'Where is the ambiguity causing friction?'
  },
  {
    id: 'human-resource',
    title: 'Human Resource Frame',
    icon: <Users size={18} />,
    color: 'bg-soft-green',
    border: 'border-green-200',
    tagline: 'Leading through alignment and human needs.',
    practices: ['Listening tours', 'Needs mapping', 'Capacity check-ins'],
    prompt: 'Is this a skill gap or a needs gap?'
  },
  {
    id: 'political',
    title: 'Political Frame',
    icon: <Scale size={18} />,
    color: 'bg-soft-coral',
    border: 'border-orange-200',
    tagline: 'Navigating power, conflict, and resources.',
    practices: ['Stakeholder mapping', 'Coalition building', 'Negotiating trade-offs'],
    prompt: 'Who has the power to say yes?'
  },
  {
    id: 'symbolic',
    title: 'Symbolic Frame',
    icon: <Star size={18} />,
    color: 'bg-soft-purple',
    border: 'border-purple-200',
    tagline: 'Shaping culture through meaning and ritual.',
    practices: ['Team values session', 'Celebrating wins', 'Shared narratives'],
    prompt: 'What story are we telling here?'
  }
];
export function FramesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-in fade-in duration-700">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">Leadership Compass</h1>
          <p className="text-sm text-gray-500">Reframing the problem from four angles.</p>
        </header>
        <Accordion type="single" collapsible className="space-y-4">
          {FRAMES.map((frame) => (
            <AccordionItem key={frame.id} value={frame.id} className="border-none">
              <AccordionTrigger className={`${frame.color} p-4 hover:no-underline [&[data-state=open]]:pb-2 transition-all`}>
                <div className="flex items-center gap-3">
                  {frame.icon}
                  <span className="text-sm font-bold uppercase tracking-wider">{frame.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className={`${frame.color} px-4 pb-4 pt-0 space-y-4`}>
                <p className="text-xs italic font-serif text-gray-700">{frame.tagline}</p>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Practices</p>
                  <ul className="space-y-1">
                    {frame.practices.map(p => (
                      <li key={p} className="text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-900 rounded-full" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-white/40 border border-white/20">
                  <p className="text-xs font-medium mb-1">Reflection</p>
                  <p className="text-sm font-serif italic text-ascerta-purple">"{frame.prompt}"</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="pt-8 space-y-4">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">The Caregiver Caveat</h3>
          <div className="p-4 border-l-2 border-ascerta-purple bg-gray-50 text-xs leading-relaxed text-gray-600">
            "When structural frames fail, we often default to human resource emotional labor. Notice if you are over-functioning to compensate for poor system design."
          </div>
        </div>
      </div>
    </div>
  );
}