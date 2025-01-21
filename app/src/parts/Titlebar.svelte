<script lang="ts">
    import {randomSecret} from '../../../core/totp'
    import syncIcon from '../assets/sync-outline.svg'
    import settingsIcon from '../assets/settings-outline.svg'
    import {sync} from '../helpers/stores'
    import IconButton from "../components/IconButton.svelte";

    let { PIN }: { PIN: string } = $props();

    // let password: string | null = null

    function tokenPrompt() {
        const token = prompt(
            'Enter an existing sync token or use the randomly generated one. This should be the same across all your devices, and make sure to save it somewhere safe.',
            localStorage.getItem('remoteToken') ?? randomSecret() // TODO encrypt
        )
        if (token) localStorage.setItem('remoteToken', token)
    }

    async function runSync() {
        let password = prompt('Enter your sync encryption password. If this is the first time you are syncing, enter a new password (and keep it somewhere safe).', localStorage.getItem('remotePassword') ?? '')
        if (password === null) return
        localStorage.setItem('remotePassword', password) // TODO encrypt
        try {
            await $sync.syncData(PIN, localStorage.getItem('remoteToken')!, password!)
            window.location.reload()
        } catch (error) {
            if (error instanceof Error && error.message === "Incorrect password") {
                alert("Incorrect password. Please try again.")
                localStorage.removeItem('remotePassword')
            } else {
                throw error
            }
        }
    }
</script>

<main>
    <div id="grid">
        <IconButton action={runSync} src={syncIcon} alt="sync"/>
        <p>TOTP[App]</p>
        <IconButton action={tokenPrompt} src={settingsIcon} alt="settings"/>
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
        grid-template: 100% / min-content auto min-content;
    }

    p {
        margin: 0;
        font-size: 1.4em;
    }
</style>
