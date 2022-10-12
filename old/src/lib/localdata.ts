import { Data } from './types'
import { encryptData, decryptData } from './encryption'

export enum DataStatus {
    Success,
    Error,
    NoData,
    InvalidData,
}

export async function getLocalData(PIN: string): Promise<[DataStatus, Data | null]> {
    const data = localStorage.getItem('data')
    if (data === null) return [DataStatus.NoData, null]
    return [DataStatus.Success, await decryptData(PIN, data)]
}

export async function setLocalData(PIN: string, data: Array<Object>): Promise<DataStatus> {
    const encryptedData = await encryptData(PIN, data)
    localStorage.setItem('data', encryptedData)
    return DataStatus.Success
}

export async function addAccount(PIN: string, name: string, secret: string): Promise<DataStatus> {
    const [status, data] = await getLocalData(PIN)
    if (!(status === DataStatus.Success)) return status
    data!.push({ name: name, key: secret })
    return await setLocalData(PIN, data!)
}

export async function removeAccount(PIN: string, name: string): Promise<DataStatus> {
    const [status, data] = await getLocalData(PIN)
    if (!(status === DataStatus.Success)) return status
    const newData = data!.filter((account) => account.name !== name)
    return await setLocalData(PIN, newData)
}

export function verifyLocalData(): boolean {
    // TODO verify local data
    return localStorage.getItem('data') !== null
}

export function clearLocalData(): DataStatus {
    localStorage.removeItem('data')
    return DataStatus.Success
}

export function initLocalData(PIN: string): DataStatus {
    setLocalData(PIN, []) // TODO ask to add account
    return DataStatus.Success
}
