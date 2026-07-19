"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MapLocationPicker = dynamic(() => import("./MapLocationPicker"), { ssr: false });

const SECTIONS = [
  { id: "identification", title: "1. IDENTIFICATION DU SITE", desc: "Informations administratives et générales." },
  { id: "localisation", title: "2. LOCALISATION ET CONTEXTE", desc: "Place du terrain dans son environnement urbain." },
  { id: "accessibilite", title: "3. ACCESSIBILITÉ ET MOBILITÉ", desc: "Analyse des accès et des modes de transport." },
  { id: "environnement", title: "4. ENVIRONNEMENT IMMÉDIAT", desc: "Analyse du voisinage et des limites du site." },
  { id: "topographie", title: "5. TOPOGRAPHIE ET RELIEF", desc: "Configuration physique du terrain." },
  { id: "geologie", title: "6. GÉOLOGIE ET PÉDOLOGIE", desc: "Nature du sol et sous-sol." },
  { id: "climat", title: "7. CLIMATOLOGIE", desc: "Conditions climatiques locales." },
  { id: "orientation", title: "8. ORIENTATION ET ENSOLEILLEMENT", desc: "Analyse héliothermique." },
  { id: "swot", title: "26. ANALYSE SWOT", desc: "Forces, Faiblesses, Opportunités, Menaces." },
];

export function SiteAnalysisForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({ projectName: "" });

  const handleNext = () => {
    if (currentStep < SECTIONS.length - 1) setCurrentStep((c) => c + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((c) => c - 1);
  };

  const currentSection = SECTIONS[currentStep];

  return (
    <div className="bg-white/70 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
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
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nom du projet</label>
                  <Input 
                    className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors rounded-xl"
                    placeholder="Ex: Complexe Résidentiel Al Boustane" 
                    value={formData.projectName || ""}
                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ville</label>
                    <Input className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors rounded-xl" placeholder="Ex: Casablanca" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Quartier</label>
                    <Input className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors rounded-xl" placeholder="Ex: Maarif" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Adresse exacte</label>
                  <Textarea className="min-h-[100px] bg-slate-50/50 border-slate-200 focus:bg-white transition-colors rounded-xl" placeholder="Adresse permettant de localiser le terrain..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Coordonnées GPS</label>
                  <p className="text-xs text-slate-500 mb-3">Cliquez sur la carte pour définir les coordonnées (Latitude: {formData.gps?.lat?.toFixed(5) || "N/A"}, Longitude: {formData.gps?.lng?.toFixed(5) || "N/A"})</p>
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                    <MapLocationPicker 
                      value={formData.gps}
                      onChange={(loc: any) => setFormData({...formData, gps: loc})}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {currentStep > 0 && (
              <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 text-slate-500 flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-4">
                  <span className="text-2xl">🚧</span>
                </div>
                <p className="text-lg font-medium text-slate-700">Interface pour la section {currentSection.title}</p>
                <p className="text-sm mt-2">En cours de construction...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
        <Button 
          variant="outline" 
          onClick={handlePrev} 
          disabled={currentStep === 0}
          className="h-12 px-6 rounded-full border-slate-200 hover:bg-slate-50"
        >
          Précédent
        </Button>
        <Button 
          onClick={currentStep === SECTIONS.length - 1 ? () => alert("Sauvegarde terminée!") : handleNext}
          className="h-12 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          {currentStep === SECTIONS.length - 1 ? "Terminer l'Analyse" : "Suivant"}
        </Button>
      </div>
    </div>
  );
}
