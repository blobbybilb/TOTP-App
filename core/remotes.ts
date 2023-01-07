import { encryptData, decryptData } from './encryption'
import type { Data } from './types'
import { RemoteStatus } from './types'

export abstract class TemplateRemote {
    public abstract readonly remoteURLs: { get: string; set: string }

    public abstract getData(token: string, password: string): Promise<[RemoteStatus, Data | null]>
    public abstract setData(token: string, password: string, data: Data): Promise<RemoteStatus>
}

export abstract class DefaultRemote extends TemplateRemote {
    static readonly baseRemoteURL: string = 'https://totp.blobbybilb.workers.dev/'

    public static readonly remoteURLs = {
        get: this.baseRemoteURL + 'get/',
        set: this.baseRemoteURL + 'set/',
        exists: this.baseRemoteURL + 'exists/',
    }

    public static async checkIfExists(): Promise<boolean> {
        try {
            await fetch(this.remoteURLs.exists)
        } catch {
            return false
        }
        if ((await (await fetch(this.remoteURLs.exists)).text()) === RemoteStatus.Exists) return true
        else return false
    }

    public static async getData(token: string, password: string): Promise<[RemoteStatus, Data | null]> {
        const recievedData = await (await fetch(this.remoteURLs.get + token)).text()

        if (!recievedData.startsWith(RemoteStatus.Success)) return [recievedData as unknown as RemoteStatus, null]
        const data = await decryptData(
            password,
            recievedData.substring(RemoteStatus.Success.length, recievedData.length)
        )
        // TODO validate data here?
        return [RemoteStatus.Success, data]
    }

    public static async setData(token: string, password: string, data: Data): Promise<RemoteStatus> {
        const encryptedData = await encryptData(password, data)

        const recievedData = await (
            await fetch(this.remoteURLs.set + token, {
                method: 'POST',
                body: encryptedData,
            })
        ).text()

        return recievedData as unknown as RemoteStatus
    }
}
