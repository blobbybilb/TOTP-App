import { DefaultLocalStorage } from './localdata'
import { DefaultRemote, SyncStatus } from './core/remotes'
import { TemplateSync } from './core/syncs'

export abstract class DefaultSync extends TemplateSync {
    public static async syncData(PIN: string, token: string, password: string): Promise<SyncStatus> {
        const [, remoteData] = await DefaultRemote.getData(token, password)
        const [, localData] = await DefaultLocalStorage.getData(PIN)
        const merged = [...remoteData!, ...localData!]

        const existingNames: string[] = []
        const deduplicated = merged.filter((value) => {
            if (existingNames.includes(value.name)) return false

            existingNames.push(value.name)

            return true
        })

        DefaultLocalStorage.setData(PIN, deduplicated)
        DefaultRemote.setData(token, password, deduplicated)

        return SyncStatus.Success
    }
}
