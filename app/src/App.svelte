<script lang="ts">
    import Titlebar from './parts/Titlebar.svelte'
    import Totpdisplay from './parts/Totpdisplay.svelte'
    import Accounts from './parts/Accounts/Container.svelte'
    import type {TOTPAccount} from '../../core/types'
    import {ModalShown, modalShown, storage} from './helpers/stores'
    import QRScanModal from "./parts/QRScanModal.svelte"
    import HelpModal from './parts/HelpModal.svelte'

    let setTOTPDisplay = $state<((token: TOTPAccount) => void)>(undefined as any)

    const PIN: string = 'blob'
    // const PIN: string = prompt('Enter PIN')

    if (!$storage.verifyLocalData()) {
        $storage.initLocalData(PIN)
    }

    if (localStorage.getItem('firstTimeDone') != 'true') {
        $modalShown = ModalShown.Help
    }
</script>

<main>
    <Titlebar {PIN}/>
    <Totpdisplay bind:set={setTOTPDisplay}/>
    <Accounts {PIN} {setTOTPDisplay}/>
    {#if $modalShown === ModalShown.QRScan}
        <QRScanModal {PIN}/>
    {/if}
    {#if $modalShown === ModalShown.Help}
        <HelpModal/>
    {/if}
</main>

<style>
</style>
