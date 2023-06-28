<script lang="ts">
    import {randomSecret} from '../../../core/totp'
    import syncIcon from '../assets/sync-outline.svg'
    import settingsIcon from '../assets/settings-outline.svg'
    import {sync} from '../helpers/stores'
    import IconButton from "../lib/components/IconButton.svelte";
    import {DefaultSync} from "../../../core/syncs";
    import {DefaultStorage} from "../helpers/storage";
    import {DefaultRemote} from "../../../core/remotes";

    export let PIN: string

    let password: string | null = null

    function tokenPrompt() {
        const token = prompt(
            'Enter an existing sync token or use the randomly generated one.',
            localStorage.getItem('remoteToken') ?? randomSecret()
        )
        if (token) localStorage.setItem('remoteToken', token)
    }

    function runSync() {
        password = prompt('Enter your sync encryption password.', password ?? '')
        $sync.syncData(PIN, localStorage.getItem('remoteToken')!, password!)
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
