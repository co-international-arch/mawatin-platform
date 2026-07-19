import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Moroccan Legal Categories (Organic Law 113.14 Article 83)...')

  const categories = [
    {
      service_code: 'WATER_01',
      service_name: 'Water Supply Issue',
      description: 'Issues related to potable water distribution, leaks, or pressure (ONEE/SDL).',
      group: 'Water & Energy',
    },
    {
      service_code: 'ENERGY_01',
      service_name: 'Electrical Fault',
      description: 'Power outages or electrical hazards (ONEE/SDL).',
      group: 'Water & Energy',
    },
    {
      service_code: 'SANITATION_01',
      service_name: 'Wastewater / Sewage',
      description: 'Liquid sanitation, blocked drains, or wastewater treatment issues.',
      group: 'Sanitation & Waste',
    },
    {
      service_code: 'WASTE_01',
      service_name: 'Solid Waste Collection',
      description: 'Missed household waste collection, illegal dumping, or street cleaning.',
      group: 'Sanitation & Waste',
    },
    {
      service_code: 'INFRA_01',
      service_name: 'Public Lighting',
      description: 'Broken street lights or dark public areas.',
      group: 'Infrastructure',
    },
    {
      service_code: 'INFRA_02',
      service_name: 'Road Damage',
      description: 'Potholes, collapsed roads, or damaged public road signage.',
      group: 'Infrastructure',
    },
  ]

  for (const cat of categories) {
    await prisma.service.upsert({
      where: { service_code: cat.service_code },
      update: {},
      create: cat,
    })
  }

  console.log('Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
