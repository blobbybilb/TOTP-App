<script lang="ts">
    import Account from './lib/components/Account.svelte'
    import Titlebar from './lib/components/Titlebar.svelte'
    import Totpdisplay from './lib/components/Totpdisplay.svelte'
    // import * as data from './lib/data'
    import { verifyLocalData, initLocalData, getLocalData } from './lib/localdata'

    let totpdisplay: Totpdisplay

    const PIN: string = 'blob'
    // const PIN: string = prompt('Enter PIN')

    if (!verifyLocalData()) {
        initLocalData(PIN)
    }
</script>

<main>
    <Titlebar {PIN} />
    <div id="totpdisplay">
        <Totpdisplay bind:this={totpdisplay} />
    </div>
    <div id="maingrid">
        {#await getLocalData(PIN) then [_, tokenData]}
            {#each tokenData as token}
                <Account {token} setKey={totpdisplay?.setKey} />
            {/each}
        {/await}
    </div>
    <!-- <Config id="config" /> -->
</main>

<style>
    main {
        width: 98vw;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    #maingrid {
        margin-top: 2vh;
        display: grid;
        grid-template: auto / auto;
        row-gap: 2vh;
    }
</style>
