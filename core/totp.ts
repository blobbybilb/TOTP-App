import { TOTP } from './external/otpauth.esm'
import type { TOTPGenerator } from './types'

export function getTimeUntilTOTPChange(): number {
    const now = new Date()
    return 30 - (now.getSeconds() % 30)
}

export function newTOTP(secret: string): TOTPGenerator {
    return new TOTP({
        digits: 6,
        period: 30,
        secret: secret,
    })
}

export function randomSecret(): string {
    return (
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2)
    )
}
