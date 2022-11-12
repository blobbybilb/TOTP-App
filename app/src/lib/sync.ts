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
        const merged = [...(remoteData!), ...(localData!)]

        const existingNames: string[] = []
        const deduplicated = merged.filter((value) => {
            // TODO check if key is same too
            if (existingNames.includes(value.name)) return false

            existingNames.push(value.name)

            return true
        })

        DefaultStorage.setData(PIN, deduplicated)
        DefaultRemote.setData(token, password, deduplicated)

        return [SyncStatus.Success, [RemoteStatus.Success, StorageStatus.Success]]
    }
}
