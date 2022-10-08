import passworder from '../assets/passworder.js'

export async function encryptData(
    password: string,
    data: Object
): Promise<string> {
    return await passworder.encrypt(password, data)
}

export async function decryptData(
    password: string,
    data: string
): Promise<Object> {
    return await passworder.decrypt(password, data)
}
