import { encryptData, decryptData } from './encryption';
import { RemoteStatus } from './types';
export class TemplateRemote {
}
export class DefaultRemote extends TemplateRemote {
    baseRemoteURL = 'https://totp.blobbybilb.workers.dev/';
    remoteURLs = {
        get: this.baseRemoteURL + 'get/',
        set: this.baseRemoteURL + 'set/',
        exists: this.baseRemoteURL + 'exists/',
    };
    async checkIfExists() {
        try {
            await fetch(this.remoteURLs.exists);
        }
        catch {
            return false;
        }
        if ((await (await fetch(this.remoteURLs.exists)).text()) === RemoteStatus.Exists)
            return true;
        else
            return false;
    }
    async getData(token, password) {
        const recievedData = await (await fetch(this.remoteURLs.get + token)).text();
        if (!recievedData.startsWith(RemoteStatus.Success))
            return [recievedData, null];
        const data = await decryptData(password, recievedData.substring(RemoteStatus.Success.length, recievedData.length));
        // TODO validate data here?
        return [RemoteStatus.Success, data];
    }
    async setData(token, password, data) {
        const encryptedData = await encryptData(password, data);
        const recievedData = await (await fetch(this.remoteURLs.set + token, {
            method: 'POST',
            body: encryptedData,
        })).text();
        return recievedData;
    }
}
//# sourceMappingURL=remotes.js.map