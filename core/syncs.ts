import type { RemoteStatus, StorageStatus, SyncStatus } from './types'

export abstract class TemplateSync {
    abstract syncData(
        PIN: string,
        encryptedToken: string,
        encryptedPassword: string
    ): Promise<[SyncStatus, [RemoteStatus, StorageStatus]]>
}
