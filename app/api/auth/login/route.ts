import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // AUTH STRATEGY: 
    // 1. Try DB Login
    // 2. If DB Login fails (User not found OR DB crashed), Try Demo Fallback

    try {
        // Attempt DB lookup
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = signToken({ userId: user.id, role: user.role });
                return NextResponse.json({
                    token,
                    user: { id: user.id, name: user.name, email: user.email, role: user.role },
                });
            }
            // If user exists but bad password, fail immediately (don't fallback)
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
    } catch (dbError) {
        console.warn("Database lookup failed (expected on demo/read-only envs):", dbError);
        // Continue to fallback...
    }

    // --- FALLBACK / DEMO MODE ---
    // Reached if: User not found in DB -OR- DB crashed (catch block above)
    if (password === 'password123') {
        const demoUsers = {
            'admin@bluecred.io': { id: 'demo-admin', name: 'Admin User', role: 'ADMIN' },
            'ngo@earth.org': { id: 'demo-ngo', name: 'Green Earth NGO', role: 'NGO' },
            'buyer@corp.com': { id: 'demo-buyer', name: 'Eco Corp', role: 'BUYER' }
        }
        // Use predefined demo user or create a generic one for the provided email
        const demoUser = demoUsers[email as keyof typeof demoUsers] || { id: 'demo-generic', name: 'Demo User', role: 'COMMUNITY' };

        console.log(`Using Demo Login for ${email}`);
        const token = signToken({ userId: demoUser.id, role: demoUser.role });
        return NextResponse.json({
            token,
            user: { ...demoUser, email }
        });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
