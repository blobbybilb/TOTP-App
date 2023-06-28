<script lang="ts">
    import qrIcon from '../../assets/qr-code-outline.svg'
    import plusIcon from '../../assets/add-outline.svg'
    import trashIcon from '../../assets/trash-outline.svg'
    import editIcon from '../../assets/create-outline.svg'

    import {currentName, storage} from '../../helpers/stores'
    import IconButton from "../../lib/components/IconButton.svelte";

    export let PIN: string

    function addAccount() {
        const name = prompt('Enter account name')
        if (!name) return
        const key = prompt('Enter account key')
        if (!key) return
        $storage.addAccount(PIN, name!, key!)
        window.location.reload()
    }

    async function removeAccount() {
        // cannot simply remove account from storage because it gets added back on sync
        if (confirm('Delete selected account?')) {
            await $storage.removeAccount(PIN, $currentName)
            await $storage.addAccount(PIN, $currentName, 'deleteddeleteddeleted')
            window.location.reload()
        }
    }

    async function editAccount() {
        if (confirm('Edit selected account?')) {
            const key = prompt('Enter new account key')
            if (!key) return
            await $storage.removeAccount(PIN, $currentName)
            await $storage.addAccount(PIN, $currentName, key!)
            window.location.reload()
        }
    }
</script>

<div>
    <IconButton action={() => alert('QR code scanning is coming soon-ish')} src={qrIcon} alt="scan"/>
    <IconButton action={addAccount} src={plusIcon} alt="add"/>
    <IconButton action={removeAccount} src={trashIcon} alt="delete"/>
    <IconButton action={editAccount} src={editIcon} alt="edit"/>

    <!-- TODO verify data is as expected when syncing after editing/deleting -->
</div>
<!--</main>-->

<style>
    div {
        display: block;
        padding-top: 15px;
        width: 100%;
        height: 38px;
        background-color: var(--accent-background-color);
    }
</style>
