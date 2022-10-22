import type { Data } from '../../../core/types'
import { encryptData, decryptData } from '../../../core/encryption'
import { TemplateStorage } from '../../../core/storages'
import { DataStatus } from '../../../core/types'

export abstract class DefaultStorage extends TemplateStorage {
    public static async getData(PIN: string): Promise<[DataStatus, Data | null]> {
        const data = localStorage.getItem('data')
        if (data === null) return [DataStatus.NoData, null]
        return [DataStatus.Success, await decryptData(PIN, data)]
    }

    public static async setData(PIN: string, data: Data): Promise<DataStatus> {
        const encryptedData = await encryptData(PIN, data)
        localStorage.setItem('data', encryptedData)
        return DataStatus.Success
    }

    public static async addAccount(PIN: string, name: string, secret: string): Promise<DataStatus> {
        const [status, data] = await this.getData(PIN)
        if (!(status === DataStatus.Success)) return status
        data!.push({ name: name, key: secret })
        return await this.setData(PIN, data!)
    }

    public static async removeAccount(PIN: string, name: string): Promise<DataStatus> {
        const [status, data] = await this.getData(PIN)
        if (!(status === DataStatus.Success)) return status
        const newData: Data = data!.filter((account) => account.name !== name) // TODO also check key
        return await this.setData(PIN, newData)
    }

    public static verifyLocalData(): boolean {
        // TODO verify local data
        return localStorage.getItem('data') !== null
    }

    public static clearLocalData(): DataStatus {
        localStorage.removeItem('data')
        return DataStatus.Success
    }

    public static initLocalData(PIN: string): DataStatus {
        this.setData(PIN, []) // TODO ask to add account
        return DataStatus.Success
    }
}

// TODO data validation and proper functions
