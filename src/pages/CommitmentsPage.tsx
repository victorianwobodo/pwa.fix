import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { TrendingUp, Users, Calendar } from 'lucide-react';
export function CommitmentsPage() {
  const [activeTab, setActiveTab] = useState('weekly');
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-gray-900">Living Commitments</h1>
        <p className="text-sm text-gray-500">Long-term behavioral alignment.</p>
      </header>
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="w-full bg-gray-100 p-1 rounded-none flex">
          <TabsTrigger value="weekly" className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:text-ascerta-purple text-xs">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:text-ascerta-purple text-xs">Quarterly</TabsTrigger>
          <TabsTrigger value="patterns" className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:text-ascerta-purple text-xs">Patterns</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="py-6 space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Advocacy Check</h3>
            <div className="p-6 bg-soft-green flex flex-col items-center justify-center gap-2">
              <span className="text-4xl font-bold">5 / 7</span>
              <p className="text-xs text-gray-600">Days with Voice Pillar engagement</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Weekly Reflection</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold mb-2">What did I say 'no' to this week?</p>
                <Textarea className="border-gray-100 rounded-none min-h-[80px]" placeholder="..." />
              </div>
              <div>
                <p className="text-xs font-semibold mb-2">My primary leadership win</p>
                <Textarea className="border-gray-100 rounded-none min-h-[80px]" placeholder="..." />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="monthly" className="py-6 space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="p-6 bg-soft-blue border border-blue-100">
            <h4 className="text-sm font-bold mb-2">Quarterly Review Prompt</h4>
            <p className="text-sm font-serif italic text-gray-700 leading-relaxed">
              "Am I still doing the job I was hired for, or have I drifted into the job I'm expected to do?"
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Commitment Pulse</h3>
            <div className="space-y-2">
              {['Visibility Strategy', 'Network Health', 'Skill Acquisition'].map(label => (
                <div key={label} className="p-4 border border-gray-100 flex justify-between items-center text-sm">
                  <span>{label}</span>
                  <div className="w-12 h-1 bg-gray-100 overflow-hidden">
                    <div className="w-3/4 h-full bg-ascerta-purple" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="patterns" className="py-6 space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Behavioral Trends</h3>
            <div className="p-4 bg-soft-amber border border-amber-100 flex items-start gap-3">
              <TrendingUp size={16} className="mt-0.5 text-amber-700" />
              <div>
                <p className="text-xs font-bold text-amber-800">Observation</p>
                <p className="text-xs text-amber-700">Passive communication patterns spike on Thursdays. Likely tied to cumulative decision fatigue.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">The Circle</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-gray-50 border border-gray-100 flex flex-col items-center justify-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-soft-purple" />
                  <span className="text-[10px] text-gray-400">Mentor</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}