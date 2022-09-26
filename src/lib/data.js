// @ts-ignore
// import { Octokit, App } from 'https://cdn.skypack.dev/octokit'
let passworder = window.passworder

const secrets = {}
const password = 'hunter55'

passworder.encrypt(password, secrets).then((blob) => console.log(blob))

// const octokit = new Octokit({
//     auth: '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', // TODO don't leak token
// })
// console.log(await octokit.request('GET /gists', {}))

function getEncryptedDataMock() {}

function getEncryptedDataGithub() {}

async function decryptData(key, data) {
    return await passworder.decrypt(key, data)
}

async function encryptData(key, data) {
    return await passworder.encrypt(key, data)
}

function updateTokenData() {}

function getTokenData() {}

export const tokenData = [
    {
        name: 'beep',
        key: 'JBSWY3DPEHPK3PXP',
    },
    {
        name: 'blip',
        key: 'blap',
    },
]
