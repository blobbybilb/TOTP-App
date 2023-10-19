import {encryptData, decryptData} from './encryption'
import type {Data} from './types'
import {RemoteStatus} from './types'

export abstract class TemplateRemote {
    public abstract readonly remoteURLs: { get: string; set: string; exists: string }

    public abstract getData(token: string, password: string): Promise<[RemoteStatus, Data | null]>

    public abstract setData(token: string, password: string, data: Data): Promise<RemoteStatus>
}

export class DefaultRemote extends TemplateRemote {
    readonly baseRemoteURL: string = 'https://totp.blobbybilb.workers.dev/'

    public readonly remoteURLs = {
        get: this.baseRemoteURL + 'get/',
        set: this.baseRemoteURL + 'set/',
        exists: this.baseRemoteURL + 'exists/',
    }

    public async checkIfExists(): Promise<boolean> {
        try {
            await fetch(this.remoteURLs.exists)
        } catch {
            return false
        }
        if ((await (await fetch(this.remoteURLs.exists)).text()) === RemoteStatus.Exists) return true
        else return false
    }

    public async getData(token: string, password: string): Promise<[RemoteStatus, Data | null]> {
        const recievedData = await (await fetch(this.remoteURLs.get + token)).text()

        if (!recievedData.startsWith(RemoteStatus.Success)) return [recievedData as unknown as RemoteStatus, null]
        const data = await decryptData(
            password,
            recievedData.substring(RemoteStatus.Success.length, recievedData.length)
        )
        return [RemoteStatus.Success, data]
    }

    public async setData(token: string, password: string, data: Data): Promise<RemoteStatus> {
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
