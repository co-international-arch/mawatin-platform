import { ComplaintForm } from "@/components/ComplaintForm";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-8">
      
      {/* Hero Section */}
      <div className="w-full max-w-2xl mb-8 text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {t('title')}
        </h1>
        <p className="text-lg text-slate-600">
          {t('subtitle')}
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">{t('newComplaint')}</h2>
          <p className="text-sm text-slate-500">All reports are routed directly to the appropriate municipal department per Organic Law 113.14.</p>
        </div>
        
        <ComplaintForm />
      </div>

      <footer className="mt-12 text-center text-sm text-slate-400">
        <p>Built for the Moroccan Municipal Administration Framework.</p>
      </footer>
    </div>
  );
}
