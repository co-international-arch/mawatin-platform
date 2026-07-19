import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, error: "E-mail requis" },
      { status: 400 }
    );
  }

  try {
    const analyses = await prisma.siteAnalysis.findMany({
      where: { architectEmail: email },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        projectName: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, analyses });
  } catch (error) {
    console.error("Portal lookup error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
