import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { validateProjectWithAI } from '@/lib/ai'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromRequest(req)
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { name, location, ecosystem, area, gps, description, imageUrl } = body

        if (!name || !location || !area || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // 1. Create Project
        const project = await prisma.project.create({
            data: {
                name,
                location,
                ecosystem,
                area: parseFloat(area),
                gps,
                description,
                imageUrl,
                ownerId: user.id
            }
        })

        // 2. Run AI Validation
        const aiResult = await validateProjectWithAI({ name, location, ecosystem, area, description, gps })

        // 3. Save AI Report
        await prisma.aIValidationReport.create({
            data: {
                projectId: project.id,
                verificationScore: aiResult.verificationScore,
                riskLevel: aiResult.riskLevel,
                summary: aiResult.summary
            }
        })

        // 4. Update Project Status based on score
        const newStatus = aiResult.verificationScore > 70 ? 'VERIFIED' : 'PENDING' // Or REJECTED if very low

        const updatedProject = await prisma.project.update({
            where: { id: project.id },
            data: { status: newStatus },
            include: { aiReport: true }
        })

        return NextResponse.json(updatedProject)

    } catch (error) {
        console.error('Project creation error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const user = await getUserFromRequest(req)
        if (!user) {
            // Allow public to fetch verified projects maybe? For now restrict.
            // Actually, let's allow public to see all projects for marketplace simulation
        }

        const projects = await prisma.project.findMany({
            include: { aiReport: true, owner: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(projects)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
