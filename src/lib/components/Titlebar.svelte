<script lang="ts">
    import { randomSecret } from '../core/totp'
    import { DefaultLocalStorage } from '../localdata'

    import { DefaultSync } from '../sync'

    export let PIN: string

    const password = 'test'

    function tokenPrompt() {
        const token = prompt(
            'Enter an existing token or use the randomly generated one.',
            localStorage.getItem('remoteToken') ?? randomSecret()
        )

        localStorage.setItem('remoteToken', token)
    }

    function sync() {
        DefaultSync.syncData(PIN, localStorage.getItem('remoteToken'), password)
    }

    function addAccount() {
        const name = prompt('Enter account name')
        const key = prompt('Enter account key')
        DefaultLocalStorage.addAccount(PIN, name, key)
    }
</script>

<main>
    <h1>TOTP App</h1>
    <span on:click={tokenPrompt}>config</span>
    <span on:click={sync}>sync</span>
    <!-- <span on:click={save}>save</span> -->
    <span on:click={addAccount}>add</span>
</main>
<hr />

<style>
    h1 {
        text-align: center;
        width: 100%;
        margin-top: 2vh;
        margin-bottom: 2vh;
        display: inline-block;
    }
    span {
        display: inline;
    }
</style>
