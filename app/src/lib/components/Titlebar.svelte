<script lang="ts">
    import { randomSecret } from '../../../../core/totp'
    import { DefaultStorage } from '../storage'
    import syncIcon from '../../assets/sync-outline.svg'
    import settingsIcon from '../../assets/settings-outline.svg'
    import { keybind } from '../ui'

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
    <div id="grid">
        <img src={syncIcon} on:click={sync} on:keypress={keybind} alt="sync" />
        <p>yAuth</p>
        <img src={settingsIcon} alt="settings" />
    </div>
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
        /* outline: 3px solid var(--accent-background-color); */
        outline-offset: 3px;
    }
    div#grid {
        display: grid;
        margin-left: 10px;
        margin-right: 10px;
        grid-template: 100% / 25px auto 25px;
    }
    p {
        margin: 0;
        font-size: 1.4em;
    }
</style>
