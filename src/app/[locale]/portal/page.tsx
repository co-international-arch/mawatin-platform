"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { AppleCard } from "@/components/ui/apple-cards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ArrowRight, LogIn, Search } from "lucide-react";

export default function ClientPortalPage() {
  const [email, setEmail] = useState("");
  const [analyses, setAnalyses] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/portal/lookup?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success) {
        setAnalyses(data.analyses);
      } else {
        setError("Aucune analyse trouvée pour cet e-mail.");
        setAnalyses([]);
      }
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="font-semibold tracking-tight text-slate-900">Portail Architecte</span>
          </div>
          <a href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            Retour au site
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        {/* Hero */}
        <AnimatedWrapper delay={0}>
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              Portail Architecte
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mx-auto">
              Retrouvez et suivez toutes vos analyses de site en entrant l'adresse e-mail associée à vos soumissions.
            </p>
          </div>
        </AnimatedWrapper>

        {/* Lookup Form */}
        <AnimatedWrapper delay={0.1}>
          <AppleCard className="p-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                  placeholder="votre@email.com"
                  className="h-14 pl-12 text-lg bg-slate-50/50 border-slate-200 focus:bg-white rounded-2xl"
                />
              </div>
              <Button
                onClick={handleLookup}
                disabled={loading || !email.trim()}
                className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                {loading ? "Recherche..." : "Rechercher"}
              </Button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-4 text-center"
              >
                {error}
              </motion.p>
            )}
          </AppleCard>
        </AnimatedWrapper>

        {/* Results */}
        <AnimatePresence>
          {analyses !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-4"
            >
              <h2 className="text-lg font-bold text-slate-900">
                {analyses.length} analyse{analyses.length !== 1 ? "s" : ""} trouvée{analyses.length !== 1 ? "s" : ""}
              </h2>

              {analyses.length === 0 && (
                <AppleCard className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📭</span>
                  </div>
                  <p className="text-slate-500">Aucune analyse n'est associée à cet e-mail.</p>
                </AppleCard>
              )}

              {analyses.map((a, i) => (
                <AnimatedWrapper key={a.id} delay={0.05 * i}>
                  <AppleCard className="p-6 hover:shadow-lg transition-shadow group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{a.projectName}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar className="w-3 h-3" />
                              {new Date(a.createdAt).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                a.status === "completed"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-amber-50 text-amber-600"
                              }`}
                            >
                              {a.status === "completed" ? "Complétée" : "Brouillon"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </AppleCard>
                </AnimatedWrapper>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
