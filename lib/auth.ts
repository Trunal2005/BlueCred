import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import prisma from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export interface JwtPayload {
    userId: string
    role: string
}

export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch (error) {
        return null
    }
}

export async function getUserFromRequest(req: NextRequest) {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null
    }

    const token = authHeader.split(' ')[1]
    const payload = verifyToken(token)

    if (!payload) return null

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, name: true, email: true, role: true }
    })

    return user
}
