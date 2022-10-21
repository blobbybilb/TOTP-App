export type TOTPAccount = { name: string; key: string }
export type Data = TOTPAccount[]

export enum DataStatus {
    Success,
    Error,
    NoData,
    NotFound,
    InvalidData,
}
