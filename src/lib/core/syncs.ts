import type { TemplateRemote, SyncStatus } from './remotes'
import type { TemplateStorage } from './storages'

export abstract class TemplateSync {
    abstract syncData(PIN: string, encryptedToken: string, encryptedPassword: string): Promise<SyncStatus>
}
