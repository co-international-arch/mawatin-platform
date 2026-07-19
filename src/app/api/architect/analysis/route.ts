import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const analyses = await prisma.siteAnalysis.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    return NextResponse.json(analyses);
  } catch (error) {
    console.error("Error fetching site analyses:", error);
    return NextResponse.json({ error: "Failed to fetch analyses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const newAnalysis = await prisma.siteAnalysis.create({
      data: {
        projectName: data.projectName || "Nouvelle Analyse de Site",
        status: "draft",
        // Initialize other JSON fields if provided
        ...data
      }
    });
    
    return NextResponse.json(newAnalysis, { status: 201 });
  } catch (error) {
    console.error("Error creating site analysis:", error);
    return NextResponse.json({ error: "Failed to create analysis" }, { status: 500 });
  }
}
