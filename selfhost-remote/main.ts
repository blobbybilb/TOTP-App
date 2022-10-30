import { Application, Router } from "https://deno.land/x/oak/mod.ts"
import { RemoteStatus } from "../core/types.ts"

const router = new Router()
const dataDir = "./data/"

async function getData(token: string): Promise<string> {
    const data = await Deno.readTextFile(dataDir + token) // FIXME catch error, and below code doesn't work

    return data === "Not Found"
        ? RemoteStatus.NoData
        : RemoteStatus.Success + data
}

async function saveData(token: string, data: string): Promise<RemoteStatus> {
    await Deno.writeTextFile(dataDir + token, data)
    return RemoteStatus.Success
}

router
    .get("/get/:token", async (ctx) => {
        ctx.response.body = await getData(ctx.params.token)
    })
    .post("/set/:token", async (ctx) => {
        ctx.response.body = await saveData(
            ctx.params.token,
            await ctx.request.body().value
        )
    })
    .get("/exists", (ctx) => {
        ctx.response.body = RemoteStatus.Exists
    })

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener("listen", (e) =>
    console.log("Listening on http://localhost:8080")
)
await app.listen({ port: 8080 })
