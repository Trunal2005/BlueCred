import crypto from 'crypto'

export function calculateHash(
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
): string {
    return crypto
        .createHash('sha256')
        .update(index + previousHash + timestamp + data)
        .digest('hex')
}
