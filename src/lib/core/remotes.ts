import { encryptData, decryptData } from './encryption'
import type { Data } from './types'

export enum SyncStatus {
    Success,
    Error,
    NotFound,
    NoData,
}

export abstract class TemplateRemote {
    abstract getData(token: string, password: string, PIN: string): Promise<SyncStatus>
    abstract setData(token: string, password: string, PIN: string): Promise<SyncStatus>
}

export abstract class DefaultRemote extends TemplateRemote {
    public static async getData(token: string, password: string): Promise<[SyncStatus, Data | null]> {
        const recievedData = await fetch('https://totp-app.blobbybilb.workers.dev/get/' + token)
        const data = await decryptData(password, await recievedData.text())
        return [SyncStatus.Success, data]
    }

    public static async setData(token: string, password: string, data: Data): Promise<SyncStatus> {
        const encryptedData = await encryptData(password, data)
        await fetch('https://totp-app.blobbybilb.workers.dev/set/' + token, {
            method: 'POST',
            body: encryptedData,
        })

        return SyncStatus.Success
    }
}

// TODO check if remote exists and validate data
