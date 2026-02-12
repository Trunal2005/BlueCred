import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    const passwordHash = await bcrypt.hash('password123', 10)

    // 1. Create Users
    const admin = await prisma.user.upsert({
        where: { email: 'admin@bluecred.io' },
        update: { password: passwordHash },
        create: {
            email: 'admin@bluecred.io',
            name: 'Admin User',
            password: passwordHash,
            role: 'ADMIN',
        },
    })

    const ngo = await prisma.user.upsert({
        where: { email: 'ngo@earth.org' },
        update: { password: passwordHash },
        create: {
            email: 'ngo@earth.org',
            name: 'Green Earth NGO',
            password: passwordHash,
            role: 'NGO',
        },
    })

    const buyer = await prisma.user.upsert({
        where: { email: 'buyer@corp.com' },
        update: { password: passwordHash },
        create: {
            email: 'buyer@corp.com',
            name: 'Eco Corp',
            password: passwordHash,
            role: 'BUYER',
        },
    })

    // 2. Create Projects
    const project1 = await prisma.project.create({
        data: {
            name: 'Sundarbans Mangrove Restoration',
            location: 'Sundarbans, India',
            ecosystem: 'Mangrove',
            area: 500.5,
            gps: '21.9497, 89.1833',
            description: 'Restoration of 500 hectares of degraded mangrove forest in the Sundarbans delta. This project aims to sequester carbon and protect local biodiversity.',
            status: 'VERIFIED',
            ownerId: ngo.id,
            aiReport: {
                create: {
                    verificationScore: 95.5,
                    riskLevel: 'LOW',
                    summary: 'Satellite analysis confirms healthy mangrove density. Biomass estimation correlates with reported area. Low risk of deforestation.',
                }
            },
            credits: {
                create: {
                    amount: 2500,
                    status: 'AVAILABLE',
                    ownerId: ngo.id,
                }
            }
        },
    })

    const project2 = await prisma.project.create({
        data: {
            name: 'Blue Lagoon Seagrass Project',
            location: 'Bali, Indonesia',
            ecosystem: 'Seagrass',
            area: 120.0,
            gps: '-8.4095, 115.1889',
            description: 'Protection of seagrass meadows in the coastal waters of Bali. Crucial for marine life and carbon storage.',
            status: 'PENDING',
            ownerId: ngo.id,
            aiReport: {
                create: {
                    verificationScore: 82.0,
                    riskLevel: 'MEDIUM',
                    summary: 'Seagrass beds visible but some water turbidity interferes with precise density calculation. Field verification recommended.',
                }
            }
        },
    })

    console.log({ admin, ngo, buyer, project1, project2 })
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
