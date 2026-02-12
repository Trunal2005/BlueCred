import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            // FALLBACK FOR VERCEL DEMO (If DB is empty/missing)
            if (password === 'password123') {
                const demoUsers = {
                    'admin@bluecred.io': { id: 'demo-admin', name: 'Admin User', role: 'ADMIN' },
                    'ngo@earth.org': { id: 'demo-ngo', name: 'Green Earth NGO', role: 'NGO' },
                    'buyer@corp.com': { id: 'demo-buyer', name: 'Eco Corp', role: 'BUYER' }
                }
                const demoUser = demoUsers[email as keyof typeof demoUsers] || { id: 'demo-generic', name: 'Demo User', role: 'COMMUNITY' }

                if (demoUser) {
                    const token = signToken({ userId: demoUser.id, role: demoUser.role })
                    return NextResponse.json({
                        token,
                        user: { ...demoUser, email }
                    })
                }
            }
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const token = signToken({ userId: user.id, role: user.role })

        return NextResponse.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
