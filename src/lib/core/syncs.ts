import type { SyncStatus } from './remotes'

export abstract class TemplateSync {
    abstract syncData(PIN: string, encryptedToken: string, encryptedPassword: string): Promise<SyncStatus>
}
