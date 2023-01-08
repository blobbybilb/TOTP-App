<script lang="ts">
    import qrIcon from '../../../assets/qr-code-outline.svg'
    import plusIcon from '../../../assets/add-outline.svg'
    import { DefaultStorage } from '../../storage'

    export let PIN: string

    function addAccount() {
        const name = prompt('Enter account name')
        const key = prompt('Enter account key')
        DefaultStorage.addAccount(PIN, name, key)
    }
</script>

<main>
    <div id="grid">
        <div>
            <img src={qrIcon} alt="scan" />
        </div>
        <div on:click={addAccount} on:keypress>
            <img src={plusIcon} alt="add" />
        </div>
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
