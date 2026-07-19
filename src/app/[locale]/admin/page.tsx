"use client";

import { AnimatedWrapper, FadeInStagger, FadeInStaggerItem } from "@/components/ui/animated-wrapper";
import { AppleCard } from "@/components/ui/apple-cards";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Users, Building2, TrendingUp } from "lucide-react";

const data = [
  { name: "Lun", analyses: 4 },
  { name: "Mar", analyses: 7 },
  { name: "Mer", analyses: 5 },
  { name: "Jeu", analyses: 12 },
  { name: "Ven", analyses: 9 },
  { name: "Sam", analyses: 3 },
  { name: "Dim", analyses: 2 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <AnimatedWrapper delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Vue d'ensemble</h1>
            <p className="text-slate-500 mt-1">Suivez l'activité de la plateforme en temps réel.</p>
          </div>
        </div>
      </AnimatedWrapper>

      <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FadeInStaggerItem>
          <AppleCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <FileText className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Analyses Complétées</h3>
            <p className="text-3xl font-bold text-slate-900">142</p>
          </AppleCard>
        </FadeInStaggerItem>
        
        <FadeInStaggerItem>
          <AppleCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Users className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> +4%
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Architectes Actifs</h3>
            <p className="text-3xl font-bold text-slate-900">38</p>
          </AppleCard>
        </FadeInStaggerItem>

        <FadeInStaggerItem>
          <AppleCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Villes Couvertes</h3>
            <p className="text-3xl font-bold text-slate-900">12</p>
          </AppleCard>
        </FadeInStaggerItem>
      </FadeInStagger>

      <AnimatedWrapper delay={0.2}>
        <AppleCard className="p-8">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900">Activité des Analyses de Site</h3>
            <p className="text-sm text-slate-500">Volume de rapports générés cette semaine.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="analyses" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorAnalyses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AppleCard>
      </AnimatedWrapper>
    </div>
  );
}
