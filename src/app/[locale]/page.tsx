import { Suspense } from "react";
import { GlassNav } from "@/components/ui/glass-nav";
import { AnimatedWrapper, FadeInStagger, FadeInStaggerItem } from "@/components/ui/animated-wrapper";
import { BentoGrid, BentoCard } from "@/components/ui/apple-cards";
import { ParallaxBackground } from "@/components/ui/parallax-bg";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { MapPin, FileText, BarChart3, ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 selection:bg-blue-100 dark:selection:bg-blue-900 font-sans transition-colors duration-500">
      <GlassNav />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center">
        <ParallaxBackground />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <AnimatedWrapper delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8 border border-blue-100/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Introducing the New Architecture Platform
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Design the future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                urban planning.
              </span>
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper delay={0.3}>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the world's most advanced architectural site analysis tool. 
              Generate comprehensive reports, analyze topographies, and collaborate seamlessly.
            </p>
          </AnimatedWrapper>

          <AnimatedWrapper delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/analysis">
                <Button className="h-14 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-lg font-medium shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 group">
                  Start Analysis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" className="h-14 px-8 rounded-full text-lg font-medium border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </AnimatedWrapper>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 px-6 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedWrapper delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-slate-900 mb-16">
              Powerful tools.<br />Beautifully designed.
            </h2>
          </AnimatedWrapper>

          <FadeInStagger>
            <BentoGrid>
              <FadeInStaggerItem className="md:col-span-2">
                <BentoCard 
                  colSpan={2}
                  title="Interactive Site Mapping" 
                  description="Pinpoint your exact location with high-fidelity OpenStreetMap integration. Automatically extract precise GPS coordinates and topographical context."
                  icon={<MapPin className="w-6 h-6" />}
                />
              </FadeInStaggerItem>
              <FadeInStaggerItem>
                <BentoCard 
                  title="Instant PDF Reports" 
                  description="Generate stunning, client-ready PDF reports with a single click after completing your 27-step analysis."
                  icon={<FileText className="w-6 h-6" />}
                />
              </FadeInStaggerItem>
              <FadeInStaggerItem className="md:col-span-3">
                <BentoCard 
                  colSpan={3}
                  title="Enterprise Analytics Dashboard" 
                  description="Monitor all site analyses, track team progress, and visualize data trends with our state-of-the-art admin dashboard."
                  icon={<BarChart3 className="w-6 h-6" />}
                />
              </FadeInStaggerItem>
            </BentoGrid>
          </FadeInStagger>
        </div>
      </section>

      {/* Client Portal CTA */}
      <Suspense fallback={null}>
        <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedWrapper delay={0.1}>
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LogIn className="w-7 h-7 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
                Portail Architecte
              </h2>
              <p className="text-lg text-slate-500 mb-8 max-w-lg mx-auto">
                Retrouvez et suivez toutes vos analyses de site soumises en temps réel.
              </p>
              <Link href="/portal">
                <Button className="h-14 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5">
                  Accéder au Portail
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </AnimatedWrapper>
          </div>
        </section>
      </Suspense>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">M</div>
            <span className="font-semibold text-slate-900">Mawatin Platform</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 CO International Architecture. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
