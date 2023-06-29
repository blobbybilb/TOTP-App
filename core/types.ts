import type {TOTP} from './external/otpauth.esm'

export type TOTPAccount = { name: string; key: string }
export type Data = TOTPAccount[]

export enum RemoteStatus {
    Success = 'success',
    Timeout = 'timeout',
    Exists = 'exists',
    InvalidRoute = 'invalidroute',
    InvalidData = 'invaliddata',
    NoData = 'nodata',
    TooLarge = 'toolarge',
}

export enum StorageStatus {
    Success,
    Error,
    NoData,
    Duplicate,
    NotFound,
    InvalidData,
}

export enum SyncStatus {
    Success,
    Error,
}

export type TOTPGenerator = TOTP
