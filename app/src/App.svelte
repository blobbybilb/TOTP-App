<script lang="ts">
    import Titlebar from './lib/components/Titlebar.svelte'
    import Totpdisplay from './lib/components/Totpdisplay.svelte' // FIXME
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
</main>

<style>
</style>
