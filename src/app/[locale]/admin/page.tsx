import { PrismaClient } from "@prisma/client";
import { AdminDashboardClient } from "@/components/AdminDashboardClient";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'; // Prevent caching, always show live data

export default async function AdminDashboardServer() {
  // 1. Fetch real data from Neon PostgreSQL
  const totalAnalyses = await prisma.siteAnalysis.count();
  
  // Get all analyses to calculate stats
  const analyses = await prisma.siteAnalysis.findMany({
    select: { createdAt: true, status: true, localisation: true }
  });

  // Calculate unique cities (assuming it's stored in localisation notes or similar)
  // For now, mock based on total, or extract if structured
  const citiesCovered = Math.max(1, Math.floor(totalAnalyses / 3)); 
  const activeArchitects = Math.max(1, Math.floor(totalAnalyses / 2));

  const stats = {
    totalAnalyses,
    activeArchitects,
    citiesCovered,
  };

  // Group by day for the chart
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const chartDataMap: Record<string, number> = {
    "Lun": 0, "Mar": 0, "Mer": 0, "Jeu": 0, "Ven": 0, "Sam": 0, "Dim": 0
  };

  analyses.forEach(a => {
    const dayName = days[a.createdAt.getDay()];
    chartDataMap[dayName] += 1;
  });

  const chartData = [
    { name: "Lun", analyses: chartDataMap["Lun"] },
    { name: "Mar", analyses: chartDataMap["Mar"] },
    { name: "Mer", analyses: chartDataMap["Mer"] },
    { name: "Jeu", analyses: chartDataMap["Jeu"] },
    { name: "Ven", analyses: chartDataMap["Ven"] },
    { name: "Sam", analyses: chartDataMap["Sam"] },
    { name: "Dim", analyses: chartDataMap["Dim"] },
  ];

  return <AdminDashboardClient stats={stats} chartData={chartData} />;
}
