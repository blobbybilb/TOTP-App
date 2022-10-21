import type { DataStatus } from './types'

export abstract class TemplateSync {
    abstract syncData(PIN: string, encryptedToken: string, encryptedPassword: string): Promise<DataStatus>
}
