import { RemoteStatus, StorageStatus, SyncStatus } from './types'
import type { TemplateRemote } from './remotes'
import type { TemplateStorage } from './storages'
export abstract class TemplateSync {
    abstract readonly remote: TemplateRemote
    abstract readonly storage: TemplateStorage

    abstract syncData(
        PIN: string,
        encryptedToken: string,
        encryptedPassword: string
    ): Promise<[SyncStatus, [RemoteStatus, StorageStatus]]>
}

export class DefaultSync extends TemplateSync {
    remote: TemplateRemote
    storage: TemplateStorage

    constructor(remote: TemplateRemote, storage: TemplateStorage) {
        super()
        this.remote = remote
        this.storage = storage
    }

    public async syncData(
        PIN: string,
        token: string,
        password: string
    ): Promise<[SyncStatus, [RemoteStatus, StorageStatus]]> {
        let [, remoteData] = await this.remote.getData(token, password)
        const [, localData] = await this.storage.getData(PIN)

        if (remoteData === null) {
            await this.remote.setData(token, password, localData!)
            remoteData = localData
        }

        const merged = [...localData!, ...remoteData!] // order matters - local data overwrites if a local account has been edited

        const existingNames: string[] = []
        const deduplicated = merged.filter((value) => {
            if (existingNames.includes(value.name)) return false
            existingNames.push(value.name)
            return true
        })

        await this.storage.setData(PIN, deduplicated)
        await this.remote.setData(token, password, deduplicated) // FIXME may cause timeout error, can be ignored though?

        return [SyncStatus.Success, [RemoteStatus.Success, StorageStatus.Success]]
    }
}
