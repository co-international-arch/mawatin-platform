import { PrismaClient } from "@prisma/client";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { AppleCard } from "@/components/ui/apple-cards";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminAnalysesPage() {
  const analyses = await prisma.siteAnalysis.findMany({
    orderBy: { createdAt: "desc" }
  });

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
          {analyses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Aucune analyse pour le moment</h3>
              <p className="text-slate-500 max-w-md">Les formulaires d'analyse de site soumis apparaîtront ici.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-xl">Projet</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4">Date de Création</th>
                    <th className="px-6 py-4 rounded-tr-xl">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {analyses.map((analysis) => (
                    <tr key={analysis.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {analysis.projectName}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {analysis.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {analysis.createdAt.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Voir les détails</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AppleCard>
      </AnimatedWrapper>
    </div>
  );
}
