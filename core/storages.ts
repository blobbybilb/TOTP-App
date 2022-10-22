import type { Data, DataStatus } from './types'

export abstract class TemplateStorage {
    abstract getData(PIN: string): Promise<[DataStatus, Data | null]>

    abstract setData(PIN: string, data: Data): Promise<DataStatus>

    abstract addAccount(PIN: string, name: string, secret: string): Promise<DataStatus>

    abstract removeAccount(PIN: string, name: string): Promise<DataStatus>

    abstract verifyLocalData(PIN: string): boolean

    abstract clearLocalData(): DataStatus

    abstract initLocalData(PIN: string): DataStatus
}
