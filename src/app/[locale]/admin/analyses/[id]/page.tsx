import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { AppleCard } from "@/components/ui/apple-cards";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, FileText } from "lucide-react";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

const SECTION_LABELS: Record<string, { title: string; icon: string }> = {
  identification: { title: "1. Identification du Site", icon: "🏷️" },
  localisation: { title: "2. Localisation et Contexte", icon: "📍" },
  accessibilite: { title: "3. Accessibilité et Mobilité", icon: "🚗" },
  environnement: { title: "4. Environnement Immédiat", icon: "🏘️" },
  topographie: { title: "5. Topographie et Relief", icon: "⛰️" },
  geologie: { title: "6. Géologie et Pédologie", icon: "🪨" },
  climat: { title: "7. Climatologie", icon: "🌤️" },
  orientation: { title: "8. Orientation et Ensoleillement", icon: "☀️" },
  vues: { title: "9. Vues et Perspectives", icon: "👁️" },
  sonore: { title: "10. Environnement Sonore", icon: "🔊" },
  qualiteAir: { title: "11. Qualité de l'Air", icon: "💨" },
  vegetation: { title: "12. Végétation", icon: "🌿" },
  hydrologie: { title: "13. Hydrologie", icon: "💧" },
  reseaux: { title: "14. Réseaux et Infrastructures", icon: "🔌" },
  reglementation: { title: "15. Réglementation Urbanistique", icon: "📜" },
  morphologie: { title: "16. Morphologie Urbaine", icon: "🏗️" },
  fonctionnelle: { title: "17. Analyse Fonctionnelle", icon: "⚙️" },
  flux: { title: "18. Flux et Dynamiques", icon: "🔄" },
  socioEco: { title: "19. Contexte Socio-Économique", icon: "📊" },
  identiteArch: { title: "20. Identité Architecturale", icon: "🏛️" },
  paysage: { title: "21. Paysage", icon: "🌅" },
  environnementale: { title: "22. Analyse Environnementale", icon: "♻️" },
  contraintes: { title: "23. Contraintes Majeures", icon: "⚠️" },
  opportunites: { title: "24. Opportunités de Développement", icon: "💡" },
  swot: { title: "25. Analyse SWOT", icon: "📋" },
  synthese: { title: "26. Synthèse Générale", icon: "📝" },
};

export default async function AnalysisDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const analysis = await prisma.siteAnalysis.findUnique({
    where: { id: params.id },
  });

  if (!analysis) return notFound();

  // Collect all filled sections
  const sectionKeys = Object.keys(SECTION_LABELS);
  const filledSections = sectionKeys.filter(
    (key) => (analysis as any)[key] !== null && (analysis as any)[key] !== undefined
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <AnimatedWrapper delay={0}>
        <div className="flex items-start justify-between">
          <div>
            <Link
              href={`/${params.locale}/admin/analyses`}
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour aux analyses
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {analysis.projectName}
            </h1>
            <div className="flex items-center gap-4 mt-3">
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                {analysis.createdAt.toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  analysis.status === "completed"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {analysis.status === "completed" ? "Complétée" : "Brouillon"}
              </span>
            </div>
          </div>
        </div>
      </AnimatedWrapper>

      {/* Section Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectionKeys.map((key, index) => {
          const sectionData = (analysis as any)[key];
          const label = SECTION_LABELS[key];
          const isFilled = sectionData !== null && sectionData !== undefined;

          return (
            <AnimatedWrapper key={key} delay={0.05 * Math.min(index, 6)}>
              <AppleCard
                className={`p-6 ${
                  isFilled
                    ? "border-l-4 border-l-blue-500"
                    : "opacity-50"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{label.icon}</span>
                  <h3 className="font-bold text-slate-900">{label.title}</h3>
                </div>
                {isFilled ? (
                  <div className="space-y-3">
                    {typeof sectionData === "object" &&
                      Object.entries(sectionData).map(([fieldKey, fieldValue]) => (
                        <div key={fieldKey}>
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {fieldKey}
                          </span>
                          <p className="text-sm text-slate-700 mt-0.5 leading-relaxed">
                            {String(fieldValue) || "—"}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">
                    Section non renseignée
                  </p>
                )}
              </AppleCard>
            </AnimatedWrapper>
          );
        })}
      </div>
    </div>
  );
}
