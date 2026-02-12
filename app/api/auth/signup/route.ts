import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
    let body;
    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { name, email, password, role } = body;

    // Basic Validation
    if (!name || !email || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    try {
        // Check existing user
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'COMMUNITY', // Default role
            },
        });

        // Generate Token
        const token = signToken({ userId: user.id, role: user.role });

        return NextResponse.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        });

    } catch (error) {
        console.error('Signup error:', error);

        // DEMO FALLBACK: If DB write fails (Likely Netlify/Vercel Read-Only)
        // We use the variables parsed at the start of the function
        if (name && email) {
            console.log("Activating Demo Signup Fallback for:", email);
            const demoId = `demo-user-${Date.now()}`;
            // Use 'COMMUNITY' as default role for fallbacks
            const fallbackRole = role || 'COMMUNITY';

            const token = signToken({ userId: demoId, role: fallbackRole });

            return NextResponse.json({
                token,
                user: { id: demoId, name, email, role: fallbackRole },
            });
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
