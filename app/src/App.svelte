<script lang="ts">
    import Titlebar from './lib/components/Titlebar.svelte'
    import Totpdisplay from './lib/components/Totpdisplay.svelte'
    import AccountsContainer from './lib/components/Accounts/AccountsContainer.svelte'
    import type { TOTPAccount } from '../../core/types'
    import { storage } from './stores'

    let setTOTPDisplay: (token: TOTPAccount) => void // TODO replace this with a type

    const PIN: string = 'blob'
    // const PIN: string = prompt('Enter PIN')

    if (!$storage.verifyLocalData()) {
        $storage.initLocalData(PIN)
    }
</script>

<main>
    <Titlebar {PIN} />
    <Totpdisplay bind:set={setTOTPDisplay} />
    <AccountsContainer {PIN} {setTOTPDisplay} />
</main>

<style>
</style>
