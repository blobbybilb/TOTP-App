import { DefaultStorage } from './storage'
import { DefaultRemote } from '../../../core/remotes'
import { RemoteStatus, StorageStatus, SyncStatus } from '../../../core/types'
import { TemplateSync } from '../../../core/syncs'

export abstract class DefaultSync extends TemplateSync {
    public static async syncData(
        PIN: string,
        token: string,
        password: string
    ): Promise<[SyncStatus, [RemoteStatus, StorageStatus]]> {
        const [, remoteData] = await DefaultRemote.getData(token, password)
        const [, localData] = await DefaultStorage.getData(PIN)

        if (remoteData === null) await DefaultRemote.setData(token, password, localData) // TODO make this proper

        const merged = [...remoteData!, ...localData!] // FIXME errors if no remote data or error because remoteData is null

        const existingNames: string[] = []
        const deduplicated = merged.filter((value) => {
            if (existingNames.includes(value.name)) return false
            existingNames.push(value.name)
            return true
        })

        await DefaultStorage.setData(PIN, deduplicated)
        await DefaultRemote.setData(token, password, deduplicated)

        return [SyncStatus.Success, [RemoteStatus.Success, StorageStatus.Success]]
    }
}
