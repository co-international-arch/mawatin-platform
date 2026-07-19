"use client";

import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { AppleCard } from "@/components/ui/apple-cards";

export default function AdminAnalysesPage() {
  return (
    <div className="space-y-8">
      <AnimatedWrapper delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Analyses de Site</h1>
            <p className="text-slate-500 mt-1">Gérez et consultez toutes les analyses générées par les architectes.</p>
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper delay={0.1}>
        <AppleCard className="p-8">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Aucune analyse pour le moment</h3>
            <p className="text-slate-500 max-w-md">Les formulaires d'analyse de site soumis apparaîtront ici sous forme de tableau de données.</p>
          </div>
        </AppleCard>
      </AnimatedWrapper>
    </div>
  );
}
