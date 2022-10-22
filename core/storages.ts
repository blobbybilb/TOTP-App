import type { Data, StorageStatus } from './types'

export abstract class TemplateStorage {
    abstract getData(PIN: string): Promise<[StorageStatus, Data | null]>

    abstract setData(PIN: string, data: Data): Promise<StorageStatus>

    abstract addAccount(PIN: string, name: string, secret: string): Promise<StorageStatus>

    abstract removeAccount(PIN: string, name: string): Promise<StorageStatus>

    abstract verifyLocalData(PIN: string): boolean

    abstract clearLocalData(): StorageStatus

    abstract initLocalData(PIN: string): StorageStatus
}
