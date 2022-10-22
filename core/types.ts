import type { TOTP } from './external/otpauth.esm'

export type TOTPAccount = { name: string; key: string }
export type Data = TOTPAccount[]

export enum StorageStatus {
    Success,
    Error,
    NoData,
    NotFound,
    InvalidData,
}

export enum RemoteStatus {
    Success = 'success',
    Timeout = 'timeout',
    Exists = 'exists',
    InvalidRoute = 'invalid',
    NoData = 'nodata',
    TooLarge = 'toolarge',
}

export enum SyncStatus {}

export type TOTPGenerator = TOTP
