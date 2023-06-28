import passworder from './external/passworder';
export async function encryptData(password, data) {
    return await passworder.encrypt(password, data);
}
export async function decryptData(password, data) {
    return await passworder.decrypt(password, data);
}
export async function encryptString(password, data) {
    return await passworder.encrypt(password, data);
}
export async function decryptString(password, data) {
    return await passworder.encrypt(password, data);
}
//# sourceMappingURL=encryption.js.map