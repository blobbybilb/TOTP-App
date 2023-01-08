<script lang="ts">
    import Topbar from './Topbar.svelte'
    import Account from './Account.svelte'
    import { DefaultStorage } from '../../storage'
    import type { TOTPAccount } from '../../../../../core/types'

    export let PIN: string
    export let setTOTPDisplay: (token: TOTPAccount) => void
</script>

<main>
    <Topbar {PIN} />
    <div id="container">
        {#await DefaultStorage.getData(PIN) then tokens}
            {#each tokens[1] as token}
                <Account {token} {setTOTPDisplay} />
            {/each}
        {/await}
        <div id="bottom-padding" />
    </div>
</main>

<style>
    main {
        text-align: center;
        margin-top: 25px;
        width: 100%;
        height: calc(100vh - 190px);
        display: block;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 0 3px var(--main-background-color), 0 0 0 6px var(--accent-background-color);
    }

    #container {
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-gutter: stable both-edges;
        height: 100%;
        width: 100%;
    }

    #bottom-padding {
        height: 150px;
    }
</style>
