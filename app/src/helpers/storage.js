import { encryptData, decryptData } from '../../../core/encryption';
import { TemplateStorage } from '../../../core/storages';
import { StorageStatus } from '../../../core/types';
export class DefaultStorage extends TemplateStorage {
    async getData(PIN) {
        const data = localStorage.getItem('data');
        if (data === null)
            return [StorageStatus.NoData, null];
        return [StorageStatus.Success, await decryptData(PIN, data)];
    }
    async setData(PIN, data) {
        const encryptedData = await encryptData(PIN, data);
        localStorage.setItem('data', encryptedData);
        return StorageStatus.Success;
    }
    async addAccount(PIN, name, secret) {
        const [status, data] = await this.getData(PIN);
        if (!(status === StorageStatus.Success))
            return status;
        data.push({ name: name, key: secret });
        return await this.setData(PIN, data);
    }
    async removeAccount(PIN, name) {
        const [status, data] = await this.getData(PIN);
        if (!(status === StorageStatus.Success))
            return status;
        const newData = data.filter((account) => account.name !== name);
        return await this.setData(PIN, newData);
    }
    verifyLocalData() {
        return localStorage.getItem('data') !== null;
    }
    clearLocalData() {
        localStorage.removeItem('data');
        return StorageStatus.Success;
    }
    initLocalData(PIN) {
        this.setData(PIN, []);
        return StorageStatus.Success;
    }
}
//# sourceMappingURL=storage.js.map