<script lang="ts">
    import Titlebar from './lib/components/Titlebar.svelte'
    import Totpdisplay from './lib/components/Totpdisplay.svelte' // FIXME
    import Account from './lib/components/Account.svelte'
    import AccountsContainer from './lib/components/AccountsContainer.svelte'

    import { DefaultStorage } from './lib/storage'

    let totpdisplay: Totpdisplay

    const PIN: string = 'blob'
    // const PIN: string = prompt('Enter PIN')

    if (!DefaultStorage.verifyLocalData()) {
        DefaultStorage.initLocalData(PIN)
    }
</script>

<main>
    <Titlebar {PIN} />
    <Totpdisplay bind:this={totpdisplay} />
    <AccountsContainer />

    <!-- <div id="maingrid">
        {#await DefaultStorage.getData(PIN) then [_, tokenData]}
            {#each tokenData as token}
                <Account {token} setKey={totpdisplay?.setKey} />
            {/each}
        {/await}
    </div>
    -->
</main>

<style>
    /* #maingrid {
        margin-top: 2vh;
        display: grid;
        grid-template: auto / auto;
        row-gap: 2vh;
    } */
</style>
