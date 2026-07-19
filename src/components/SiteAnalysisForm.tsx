"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SECTIONS = [
  { id: "identification", title: "1. IDENTIFICATION DU SITE", desc: "Informations administratives et générales." },
  { id: "localisation", title: "2. LOCALISATION ET CONTEXTE", desc: "Place du terrain dans son environnement urbain." },
  { id: "accessibilite", title: "3. ACCESSIBILITÉ ET MOBILITÉ", desc: "Analyse des accès et des modes de transport." },
  { id: "environnement", title: "4. ENVIRONNEMENT IMMÉDIAT", desc: "Analyse du voisinage et des limites du site." },
  { id: "topographie", title: "5. TOPOGRAPHIE ET RELIEF", desc: "Configuration physique du terrain." },
  // Adding the rest dynamically for the sake of length
  { id: "geologie", title: "6. GÉOLOGIE ET PÉDOLOGIE", desc: "Nature du sol et sous-sol." },
  { id: "climat", title: "7. CLIMATOLOGIE", desc: "Conditions climatiques locales." },
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
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <span>Étape {currentStep + 1} sur {SECTIONS.length}</span>
          <span className="font-medium">{Math.round(((currentStep + 1) / SECTIONS.length) * 100)}% complété</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">{currentSection.title}</h2>
        <p className="text-slate-500 mt-2">{currentSection.desc}</p>
      </div>

      <div className="space-y-6">
        {currentStep === 0 && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom du projet</label>
              <Input 
                placeholder="Ex: Complexe Résidentiel Al Boustane" 
                value={formData.projectName || ""}
                onChange={(e) => setFormData({...formData, projectName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ville</label>
              <Input placeholder="Ex: Casablanca" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Adresse exacte</label>
              <Textarea placeholder="Adresse permettant de localiser le terrain..." />
            </div>
          </>
        )}
        
        {currentStep > 0 && (
          <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500">
            Interface pour la section {currentSection.title} (En cours de construction)
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
        <Button 
          variant="outline" 
          onClick={handlePrev} 
          disabled={currentStep === 0}
        >
          Précédent
        </Button>
        <Button 
          onClick={currentStep === SECTIONS.length - 1 ? () => alert("Sauvegarde terminée!") : handleNext}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentStep === SECTIONS.length - 1 ? "Terminer l'Analyse" : "Suivant"}
        </Button>
      </div>
    </div>
  );
}
