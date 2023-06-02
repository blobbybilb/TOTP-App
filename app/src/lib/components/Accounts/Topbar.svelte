<script lang="ts">
    import qrIcon from '../../../assets/qr-code-outline.svg'
    import plusIcon from '../../../assets/add-outline.svg'
    import trashIcon from '../../../assets/trash-outline.svg'
    import editIcon from '../../../assets/create-outline.svg'

    import { currentName, storage } from '../../../stores'

    export let PIN: string

    function addAccount() {
        const name = prompt('Enter account name')
        const key = prompt('Enter account key')
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
            await $storage.removeAccount(PIN, $currentName)
            await $storage.addAccount(PIN, $currentName, key!)
            window.location.reload()
        }
    }
</script>

<main>
    <div id="grid">
        <div on:click={() => alert('QR code scanning is coming soon-ish')} on:keypress>
            <img src={qrIcon} alt="scan" />
        </div>
        <div on:click={addAccount} on:keypress>
            <img src={plusIcon} alt="add" />
        </div>
        <div on:click={removeAccount} on:keypress>
            <img src={trashIcon} alt="delete" />
        </div>
        <div on:click={editAccount} on:keypress>
            <img src={editIcon} alt="edit" />
        </div>
        <!-- TODO verify data is as expected when syncing after editing/deleting -->
    </div>
</main>

<style>
    main {
        height: 50px;
        background-color: var(--accent-background-color);
    }

    #grid {
        display: block;
        padding-top: 15px;
        width: 100%;
    }

    img {
        margin: 0 10px;
    }

    div {
        display: inline;
    }
</style>
