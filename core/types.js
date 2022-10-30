export var RemoteStatus;
(function (RemoteStatus) {
    RemoteStatus["Success"] = "success";
    RemoteStatus["Timeout"] = "timeout";
    RemoteStatus["Exists"] = "exists";
    RemoteStatus["InvalidRoute"] = "invalidroute";
    RemoteStatus["InvalidData"] = "invaliddata";
    RemoteStatus["NoData"] = "nodata";
    RemoteStatus["TooLarge"] = "toolarge";
})(RemoteStatus || (RemoteStatus = {}));
export var StorageStatus;
(function (StorageStatus) {
    StorageStatus[StorageStatus["Success"] = 0] = "Success";
    StorageStatus[StorageStatus["Error"] = 1] = "Error";
    StorageStatus[StorageStatus["NoData"] = 2] = "NoData";
    StorageStatus[StorageStatus["NotFound"] = 3] = "NotFound";
    StorageStatus[StorageStatus["InvalidData"] = 4] = "InvalidData";
})(StorageStatus || (StorageStatus = {}));
export var SyncStatus;
(function (SyncStatus) {
    SyncStatus[SyncStatus["Success"] = 0] = "Success";
    SyncStatus[SyncStatus["Error"] = 1] = "Error";
})(SyncStatus || (SyncStatus = {}));
