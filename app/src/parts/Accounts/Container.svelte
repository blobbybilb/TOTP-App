<script lang="ts">
    import Topbar from './Topbar.svelte'
    import Account from './Account.svelte'
    import type {TOTPAccount} from '../../../../core/types'
    import {currentName, storage} from '../../helpers/stores'
    import {deletedAccountString} from "../../../../core/constants";

    export let PIN: string
    export let setTOTPDisplay: (token: TOTPAccount) => void

    async function getData() {
        console.log('DATA', (await $storage.getData(PIN))[1]!)
        return (await $storage.getData(PIN))[1]!
    }
</script>

<main>
    <Topbar {PIN}/>
    <div id="container">
        {#await getData() then tokens}
            {#each tokens as token}
                {#if token.key !== deletedAccountString}
                    <Account {token} {setTOTPDisplay}/>
                {/if}
            {/each}
        {/await}
        <div id="bottom-padding"></div>
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
