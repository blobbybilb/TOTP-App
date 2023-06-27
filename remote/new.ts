import {RemoteStatus} from '../core/types'
import {Hono} from "hono";
import {cors} from "hono/cors";

export type Env = {
    kv: KVNamespace
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

const getSeconds = () => Math.floor(new Date().getTime() / 1000)
const recentIPsWrite = new Set<string>()
let writeReset = getSeconds()

function updateTimeout() {
    if (getSeconds() - writeReset >= 10) {
        writeReset = getSeconds()
        recentIPsWrite.clear()
    }
}

function isTimeout(ip: string) {
    if (recentIPsWrite.has(ip)) return true
    recentIPsWrite.add(ip)
    return false
}


const app = new Hono<{Bindings: Env}>()

app.use("*", cors())

app.get('/get/:token', (c) => {
    return c.text(getData(c.req.param().token, c.env))
})

app.post("/set/:token", (c) => {
    const ip = c.req.headers.get('CF-Connecting-IP')!
    updateTimeout()
    if (isTimeout(ip)) return c.text(RemoteStatus.Timeout)
    return c.text("hi")
})

app.get("/exists", (c) =>  c.text(RemoteStatus.Exists))

app.get("*", (c) => c.text(RemoteStatus.InvalidRoute))

export default app