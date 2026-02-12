import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const records = await prisma.blockchainRecord.findMany({
            orderBy: { timestamp: 'desc' },
            include: {
                project: {
                    select: { name: true }
                }
            }
        })
        return NextResponse.json(records)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
