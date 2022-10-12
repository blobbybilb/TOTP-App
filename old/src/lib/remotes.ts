import { encryptData, decryptData } from './encryption'
import { Data } from './types'

export enum SyncStatus {
    Success,
    Error,
    NotFound,
    NoData,
}

abstract class TemplateRemote {
    abstract getData(token: string, password: string, PIN: string): Promise<SyncStatus>

    abstract setData(token: string, password: string, PIN: string): Promise<SyncStatus>
}

export abstract class DefaultRemote extends TemplateRemote {
    public static async getData(token: string, password: string, PIN: string): Promise<SyncStatus> {
        const recievedData = await fetch('https://totp-app.blobbybilb.workers.dev/get/' + token)
        const data = await decryptData(password, await recievedData.text())

        const encryptedData = await encryptData(PIN, data)
        localStorage.setItem('data', encryptedData)

        return SyncStatus.Success
    }

    public static async setData(token: string, password: string, PIN: string): Promise<SyncStatus> {
        const localData = localStorage.getItem('data')
        if (localData === null) return SyncStatus.NoData

        const data = await decryptData(PIN, localData)

        const encryptedData = await encryptData(password, data)
        await fetch('https://totp-app.blobbybilb.workers.dev/set/' + token, {
            method: 'POST',
            body: encryptedData,
        })

        return SyncStatus.Success
    }
}
