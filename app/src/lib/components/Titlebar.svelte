<script lang="ts">
    import { randomSecret } from '../../../../core/totp'
    import { DefaultStorage } from '../storage'
    import syncIcon from '../../assets/sync-outline.svg'
    import settingsIcon from '../../assets/settings-outline.svg'
    import { keybind } from '../ui'

    import { DefaultSync } from '../sync'
    import { refreshAccountsContainer } from '../stores'

    export let PIN: string

    let password = null

    function tokenPrompt() {
        const token = prompt(
            'Enter an existing sync token or use the randomly generated one.',
            localStorage.getItem('remoteToken') ?? randomSecret()
        )
        if (token) localStorage.setItem('remoteToken', token)
    }

    function sync() {
        password = prompt('Enter your sync encryption password.', password ?? '')
        DefaultSync.syncData(PIN, localStorage.getItem('remoteToken'), password)
        refresh()
    }

    function refresh() {
        refreshAccountsContainer.update((n) => n + 1)
    }
</script>

<main>
    <div id="grid">
        <div on:click={sync} on:keypress={keybind}>
            <img src={syncIcon} alt="sync" />
        </div>
        <p>TOTP-App</p>
        <div on:click={tokenPrompt} on:keypress={keybind}>
            <img src={settingsIcon} alt="settings" />
        </div>
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
        box-shadow: 0 0 0 3px var(--main-background-color), 0 0 0 6px var(--accent-background-color);
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
