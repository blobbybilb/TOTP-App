<script lang="ts">
    import * as data from './data'
    export let PIN: string
    const randomToken = () =>
        Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)

    function tokenPrompt() {
        const token = prompt(
            'Enter an existing token or use the randomly generated one.',
            localStorage.getItem('remoteToken') ?? randomToken()
        )

        localStorage.setItem('remoteToken', token)
    }

    function sync() {
        const password = prompt('Enter decryption password')
        data.getRemoteData(localStorage.getItem('remoteToken'), password, PIN)
    }

    function save() {
        const password = prompt('Enter encryption password')
        data.setRemoteData(localStorage.getItem('remoteToken'), password, PIN)
    }

    function addAccount() {
        const name = prompt('Enter account name')
        const key = prompt('Enter account key')
        data.addAccount(PIN, name, key)
    }
</script>

<main>
    <h1>TOTP App</h1>
    <span on:click={tokenPrompt}>config</span>
    <span on:click={sync}>sync</span>
    <span on:click={save}>save</span>
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
