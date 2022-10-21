import { encryptData, decryptData } from './encryption'
import type { Data } from './types'
import { DataStatus } from './types'

export abstract class TemplateRemote {
    public abstract readonly remoteURLs: { get: string; set: string }

    public abstract getData(token: string, password: string): Promise<[DataStatus, Data | null]>
    public abstract setData(token: string, password: string, data: Data): Promise<DataStatus>
}

export abstract class DefaultRemote extends TemplateRemote {
    static readonly baseRemoteURL: string = 'https://totp-app.blobbybilb.workers.dev/'

    public static readonly remoteURLs = {
        get: this.baseRemoteURL + 'get/',
        set: this.baseRemoteURL + 'set/',
    }

    public static async getData(token: string, password: string): Promise<[DataStatus, Data | null]> {
        const recievedData = await fetch(this.remoteURLs.get + token)
        const data = await decryptData(password, await recievedData.text())
        return [DataStatus.Success, data]
    }

    public static async setData(token: string, password: string, data: Data): Promise<DataStatus> {
        const encryptedData = await encryptData(password, data)
        await fetch(this.remoteURLs.set + token, {
            method: 'POST',
            body: encryptedData,
        })

        return DataStatus.Success
    }
}

// TODO check if remote exists and validate data
