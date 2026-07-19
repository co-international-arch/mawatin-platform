import { SiteAnalysisForm } from "@/components/SiteAnalysisForm";
import { getTranslations } from "next-intl/server";

export default async function SiteAnalysisPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Analyse de Site Architecturale
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Complétez ce formulaire pour générer un rapport d'analyse de site complet.
          </p>
        </div>
        
        <SiteAnalysisForm />
      </div>
    </div>
  );
}
