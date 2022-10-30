<script lang="ts">
    import { randomSecret } from '../../../../core/totp'
    import { DefaultStorage } from '../storage'

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
        DefaultStorage.addAccount(PIN, name, key)
    }
</script>

<main>
    <p>TOTP App</p>
    <!-- <span on:click={tokenPrompt}>config</span>
    <span on:click={sync}>sync</span>
    <span on:click={addAccount}>add</span> -->
</main>

<style>
    main {
        text-align: center;
        background-color: var(--accent-background-color);
        width: 100%;
        margin-top: -20px;
        padding-top: 30px;
        border-radius: 10px;
        height: var(--titlebar-height);
        outline: 3px solid var(--accent-background-color);
        outline-offset: 3px;
    }
    p {
        margin: 0;
        font-size: 1.4em;
    }
</style>
