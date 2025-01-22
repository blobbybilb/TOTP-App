import {RemoteStatus} from '../core/types'

export interface Env {
    kv: KVNamespace
}

async function createHeaders(): Promise<Headers> {
    const responseHeaders = new Headers()
    responseHeaders.set('Access-Control-Allow-Origin', '*')
    return responseHeaders
}

async function createResponse(data: string): Promise<Response> {
    return new Response(data, {headers: await createHeaders()})
}

async function invalidRoute(): Promise<Response> {
    return createResponse(RemoteStatus.InvalidRoute)
}

async function existsCheck(): Promise<Response> {
    return createResponse(RemoteStatus.Exists)
}

async function timeoutResponse(): Promise<Response> {
    return createResponse(RemoteStatus.Timeout)
}

const getSeconds = () => Math.floor(new Date().getTime() / 1000)

const recentIPsRead = new Set<string>()
const recentIPsWrite = new Set<string>()
let readReset = getSeconds()
let writeReset = getSeconds()

async function updateTimeout() {
    if (getSeconds() - readReset >= 1) { // 5
        readReset = getSeconds()
        recentIPsRead.clear()
    }
    if (getSeconds() - writeReset >= 10) { // 30
        writeReset = getSeconds()
        recentIPsWrite.clear()
    }
}

async function timeoutCheck(ip: string, write: boolean): Promise<boolean> {
    const recentIPs = write ? recentIPsWrite : recentIPsRead
    if (recentIPs.has(ip)) return true
    recentIPs.add(ip)
    return false
}

async function getData(token: string, env: Env): Promise<Response> {
    const data = await env.kv.get(token)
    if (data === null) return createResponse(RemoteStatus.NoData)
    return createResponse(RemoteStatus.Success + data)
}

async function setData(token: string, env: Env, data: string): Promise<Response> {
    if (data.length > 1024 ** 2 * 3) return createResponse(RemoteStatus.TooLarge)
    await env.kv.put(token, data)
    return createResponse(RemoteStatus.Success)
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const [action, token] =
            new URL(request.url).pathname.split('/').filter(x => x !== '')

        const ip = request.headers.get('CF-Connecting-IP')!

        updateTimeout()
        switch (action) {
            case 'get':
                if (await timeoutCheck(ip, false)) return await timeoutResponse()
                return await getData(token, env)
            case 'set':
                if (await timeoutCheck(ip, true)) return await timeoutResponse()
                return await setData(token, env, await request.text())
            case 'exists':
                return await existsCheck()
            default:
                return await invalidRoute()
        }
    },
}
