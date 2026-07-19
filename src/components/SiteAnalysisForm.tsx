"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const MapLocationPicker = dynamic(() => import("./MapLocationPicker"), { ssr: false });

const SECTIONS = [
  { id: "identification", title: "1. IDENTIFICATION", desc: "Informations administratives." },
  { id: "localisation", title: "2. LOCALISATION", desc: "Contexte urbain." },
  { id: "accessibilite", title: "3. ACCESSIBILITÉ", desc: "Modes de transport." },
  { id: "environnement", title: "4. ENVIRONNEMENT", desc: "Voisinage immédiat." },
  { id: "topographie", title: "5. TOPOGRAPHIE", desc: "Relief du terrain." },
  { id: "geologie", title: "6. GÉOLOGIE", desc: "Nature du sol." },
  { id: "climat", title: "7. CLIMATOLOGIE", desc: "Conditions climatiques." },
  { id: "orientation", title: "8. ORIENTATION", desc: "Ensoleillement." },
  { id: "vues", title: "9. VUES", desc: "Vues et perspectives." },
  { id: "sonore", title: "10. ENV. SONORE", desc: "Nuisances acoustiques." },
  { id: "qualiteAir", title: "11. QUALITÉ DE L'AIR", desc: "Pollution et vents." },
  { id: "vegetation", title: "12. VÉGÉTATION", desc: "Flore existante." },
  { id: "hydrologie", title: "13. HYDROLOGIE", desc: "Réseau hydrique." },
  { id: "reseaux", title: "14. RÉSEAUX", desc: "Infrastructures (eau, élec)." },
  { id: "reglementation", title: "15. RÉGLEMENTATION", desc: "PLU et normes." },
  { id: "morphologie", title: "16. MORPHOLOGIE", desc: "Tissu urbain." },
  { id: "fonctionnelle", title: "17. FONCTIONNELLE", desc: "Usages du site." },
  { id: "flux", title: "18. FLUX", desc: "Dynamiques de mouvement." },
  { id: "socioEco", title: "19. SOCIO-ÉCO", desc: "Contexte social." },
  { id: "identiteArch", title: "20. IDENTITÉ ARCH", desc: "Patrimoine." },
  { id: "paysage", title: "21. PAYSAGE", desc: "Qualités paysagères." },
  { id: "environnementale", title: "22. ENV. GLOBAL", desc: "Impact écologique." },
  { id: "contraintes", title: "23. CONTRAINTES", desc: "Défis majeurs." },
  { id: "opportunites", title: "24. OPPORTUNITÉS", desc: "Potentiels de dev." },
  { id: "swot", title: "25. SWOT", desc: "Forces/Faiblesses." },
  { id: "synthese", title: "26. SYNTHÈSE", desc: "Conclusion globale." },
];

export function SiteAnalysisForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({ projectName: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (currentStep < SECTIONS.length - 1) setCurrentStep((c) => c + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((c) => c - 1);
  };

  const handleFieldChange = (sectionId: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [field]: value
      }
    }));
  };

  const generatePDF = async () => {
    if (!formRef.current) return;
    const canvas = await html2canvas(formRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${formData.projectName || "Analyse_de_Site"}.pdf`);
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      // 1. Save to Neon Database
      const res = await fetch("/api/architect/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");

      // 2. Generate PDF
      await generatePDF();
      
      alert("✅ Analyse sauvegardée dans la base de données et PDF généré avec succès !");
      window.location.href = "/admin"; // Redirect to admin dashboard to see it
    } catch (error) {
      console.error(error);
      alert("❌ Une erreur s'est produite lors de la sauvegarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSection = SECTIONS[currentStep];

  return (
    <div ref={formRef} className="bg-white/70 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <span className="font-medium">Étape {currentStep + 1} sur {SECTIONS.length}</span>
          <span className="font-semibold text-blue-600">{Math.round(((currentStep + 1) / SECTIONS.length) * 100)}% complété</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <motion.div 
            className="bg-blue-600 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / SECTIONS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">{currentSection.title}</h2>
        <p className="text-slate-500 mt-2 text-lg">{currentSection.desc}</p>
      </div>

      <div className="space-y-6 min-h-[400px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {/* Step 1: Identification requires specific fields */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nom du projet</label>
                  <Input 
                    className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white rounded-xl"
                    placeholder="Ex: Complexe Résidentiel Al Boustane" 
                    value={formData.projectName || ""}
                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description Générale</label>
                  <Textarea 
                    className="min-h-[100px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-xl" 
                    placeholder="Notes préliminaires sur le projet..."
                    value={formData.identification?.notes || ""}
                    onChange={(e) => handleFieldChange("identification", "notes", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Localisation with GPS Map */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Coordonnées GPS</label>
                  <p className="text-xs text-slate-500 mb-3">Cliquez sur la carte pour définir les coordonnées</p>
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-[300px]">
                    <MapLocationPicker 
                      value={formData.localisation?.gps}
                      onChange={(loc: any) => handleFieldChange("localisation", "gps", loc)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Notes sur le contexte urbain</label>
                  <Textarea 
                    className="min-h-[100px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-xl" 
                    placeholder="Description du quartier, limites..."
                    value={formData.localisation?.notes || ""}
                    onChange={(e) => handleFieldChange("localisation", "notes", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* All other dynamic steps */}
            {currentStep > 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Observations Principales</label>
                  <Textarea 
                    className="min-h-[150px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-xl text-lg" 
                    placeholder={`Notes détaillées concernant: ${currentSection.desc.toLowerCase()}`}
                    value={formData[currentSection.id]?.notes || ""}
                    onChange={(e) => handleFieldChange(currentSection.id, "notes", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Impact sur le projet</label>
                  <Input 
                    className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white rounded-xl"
                    placeholder="Ex: Nécessite un terrassement important..."
                    value={formData[currentSection.id]?.impact || ""}
                    onChange={(e) => handleFieldChange(currentSection.id, "impact", e.target.value)}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div data-html2canvas-ignore="true" className="flex justify-between mt-12 pt-8 border-t border-slate-100">
        <Button 
          variant="outline" 
          onClick={handlePrev} 
          disabled={currentStep === 0 || isSubmitting}
          className="h-12 px-6 rounded-full border-slate-200 hover:bg-slate-50"
        >
          Précédent
        </Button>
        <Button 
          onClick={currentStep === SECTIONS.length - 1 ? handleFinish : handleNext}
          disabled={isSubmitting}
          className="h-12 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          {isSubmitting ? "Enregistrement..." : currentStep === SECTIONS.length - 1 ? "Terminer & Télécharger PDF" : "Suivant"}
        </Button>
      </div>
    </div>
  );
}
