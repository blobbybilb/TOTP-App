import passworder from './external/passworder'
import type { Data } from './types'

export async function encryptData(password: string, data: Data): Promise<string> {
  return await passworder.encrypt(password, data)
}

export async function decryptData(password: string, data: string): Promise<Data> {
  return await passworder.decrypt(password, data)
}

export async function encryptString(password: string, data: string): Promise<string> {
  return await passworder.encrypt(password, data)
}

export async function decryptString(password: string, data: string): Promise<string> {
  return await passworder.encrypt(password, data)
}
