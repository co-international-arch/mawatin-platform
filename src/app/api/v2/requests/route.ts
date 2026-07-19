import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const service_request_id = searchParams.get('service_request_id');

  try {
    if (service_request_id) {
      const sr = await prisma.serviceRequest.findUnique({
        where: { service_request_id }
      });
      return NextResponse.json([sr], { status: 200 });
    }
    
    const requests = await prisma.serviceRequest.findMany({
      take: 50,
      orderBy: { requested_datetime: 'desc' }
    });
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Open311 POST parameters
    const { 
      service_code, 
      lat, 
      long, 
      description, 
      media_url, 
      first_name, 
      last_name, 
      phone, 
      email 
    } = body;

    // Basic validation per Open311 spec
    if (!lat || !long || !description) {
      return NextResponse.json({ error: "lat, long, and description are required" }, { status: 400 });
    }

    // [PHASE 3: AI Triage logic will be injected here to auto-determine service_code]

    const newRequest = await prisma.serviceRequest.create({
      data: {
        service_code: service_code || 'UNCLASSIFIED', // Default until AI is wired up
        lat: parseFloat(lat),
        long: parseFloat(long),
        description,
        media_url,
        first_name,
        last_name,
        phone,
        email,
      }
    });

    // Open311 v2 requires returning an array with the service_request_id
    return NextResponse.json([{ 
      service_request_id: newRequest.service_request_id,
      service_notice: "Your request has been received and is pending review by the municipal committee."
    }], { status: 201 });

  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json({ error: "Failed to create service request" }, { status: 500 });
  }
}
