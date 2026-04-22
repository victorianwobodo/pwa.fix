import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from '@/lib/store';
import { TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
export function CommitmentsPage() {
  const [recoveryReps] = useLocalStorage('Ascerta_recovery_reps', 0);
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-gray-900">Track</h1>
        <p className="text-sm text-gray-500">Long-term behavioral alignment.</p>
      </header>
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="w-full bg-gray-100 p-1 rounded-none flex overflow-x-auto scrollbar-hide">
          {['Weekly', 'Quarterly', 'Patterns', 'My Circle'].map(tab => (
            <TabsTrigger 
              key={tab} 
              value={tab.toLowerCase().replace(' ', '-')} 
              className="flex-1 min-w-[80px] rounded-none data-[state=active]:bg-white data-[state=active]:text-ascerta-purple text-[10px] font-bold uppercase tracking-tighter"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="weekly" className="py-6 space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-soft-green flex flex-col items-center justify-center gap-2 h-32">
              <span className="text-3xl font-bold">5 / 7</span>
              <p className="text-[9px] font-bold uppercase text-gray-600 text-center">Advocacy Streak</p>
            </div>
            <div className="p-6 bg-soft-purple flex flex-col items-center justify-center gap-2 h-32">
              <span className="text-3xl font-bold">{recoveryReps}</span>
              <p className="text-[9px] font-bold uppercase text-gray-600 text-center">Recovery Reps</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Behavioral Review</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 mb-2">What did I say 'no' to this week?</p>
                <Textarea className="border-gray-100 rounded-none min-h-[80px] font-serif italic text-sm" placeholder="..." />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 mb-2">My primary leadership win</p>
                <Textarea className="border-gray-100 rounded-none min-h-[80px] font-serif italic text-sm" placeholder="..." />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="patterns" className="py-6 space-y-8">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Communication Dots</h3>
            <div className="p-4 bg-white border border-gray-100 space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase text-coral-600">Passive/Hedging</p>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({length: 8}).map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-soft-coral" />)}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase text-green-600">Assertive/Direct</p>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({length: 12}).map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-soft-green" />)}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Strengths Reframes</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
              {[
                "My empathy is a structural insight tool.",
                "My silence is a strategic pause, not absence.",
                "My attention to detail is risk management."
              ].map((card, i) => (
                <div key={i} className="min-w-[240px] p-6 bg-soft-blue border border-blue-100 font-serif italic text-sm">
                  "{card}"
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="my-circle" className="py-6 space-y-8">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Core Support</h3>
            <div className="flex flex-wrap gap-2">
              {['Mentor', 'Sponsor', 'Peer', 'Direct Report', 'Coach'].map(role => (
                <div key={role} className="px-4 py-2 bg-white border border-gray-100 flex items-center gap-3">
                  <span className="text-xs font-bold uppercase">{role}</span>
                  <CheckCircle2 size={16} className="text-gray-200 hover:text-soft-green cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Network Journal</p>
            <Textarea className="border-gray-100 rounded-none min-h-[120px] font-serif italic text-sm" placeholder="Who did I advocate for this week?" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}