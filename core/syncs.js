import { RemoteStatus, StorageStatus, SyncStatus } from './types';
export class TemplateSync {
}
export class DefaultSync extends TemplateSync {
    remote;
    storage;
    constructor(remote, storage) {
        super();
        this.remote = remote;
        this.storage = storage;
    }
    async syncData(PIN, token, password) {
        let [, remoteData] = await this.remote.getData(token, password);
        const [, localData] = await this.storage.getData(PIN);
        if (remoteData === null) {
            await this.remote.setData(token, password, localData);
            remoteData = localData;
        }
        const merged = [...localData, ...remoteData] // order matters - local data overwrites if a local account has been edited
            .filter((el) => el.key !== 'deleteddeleteddeleted');
        const existingNames = [];
        const deduplicated = merged.filter((value) => {
            if (existingNames.includes(value.name))
                return false;
            existingNames.push(value.name);
            return true;
        });
        await this.storage.setData(PIN, deduplicated);
        await this.remote.setData(token, password, deduplicated); // FIXME may cause timeout error, can be ignored though? -- FIXME also for remote, not causing timeout error?
        return [SyncStatus.Success, [RemoteStatus.Success, StorageStatus.Success]];
    }
}
//# sourceMappingURL=syncs.js.map