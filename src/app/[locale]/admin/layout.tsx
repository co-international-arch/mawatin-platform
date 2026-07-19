import { ReactNode } from "react";
import Link from "next/link";
import { BarChart3, Settings, Users, LayoutDashboard, Home } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans selection:bg-blue-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white/50 backdrop-blur-xl flex flex-col fixed inset-y-0 z-40">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-semibold tracking-tight text-slate-900">Mawatin Admin</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-900 text-white shadow-md font-medium text-sm transition-all hover:shadow-lg">
            <LayoutDashboard className="w-5 h-5 opacity-90" />
            Vue d'ensemble
          </Link>
          <Link href="/admin/analyses" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
            <BarChart3 className="w-5 h-5 opacity-70" />
            Analyses de Site
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
            <Users className="w-5 h-5 opacity-70" />
            Architectes
          </Link>
          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
              <Home className="w-5 h-5 opacity-70" />
              Retour au site public
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors">
            <Settings className="w-5 h-5 opacity-70" />
            Paramètres
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen relative">
        {/* Glass Header */}
        <header className="h-16 fixed top-0 right-0 left-64 bg-white/70 backdrop-blur-md border-b border-white/40 z-30 flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm font-medium">Dashboard / Vue d'ensemble</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <div className="pt-24 px-8 pb-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
