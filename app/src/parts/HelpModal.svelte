<script lang="ts">
    import { ModalShown, modalShown } from '../helpers/stores'
    import qrIcon from '../assets/qr-code-outline.svg'
    import plusIcon from '../assets/add-outline.svg'
    import trashIcon from '../assets/trash-outline.svg'
    import editIcon from '../assets/create-outline.svg'
    import IconButton from '../components/IconButton.svelte'
    import syncIcon from '../assets/sync-outline.svg'
    import settingsIcon from '../assets/settings-outline.svg'

    const firstTimeDone = localStorage.getItem('firstTimeDone') == 'true'

    function onDone() {
        localStorage.setItem('firstTimeDone', 'true')
        $modalShown = ModalShown.None
    }
</script>

<section>
    <h1>{firstTimeDone ? 'Help' : 'Welcome!'}</h1>
    <p>
        All app options can be accesssed by clicking one icon. (Currently, this web app only supports the default sync
        server, hosted on Cloudflare.)
    </p>

    <div>
        <IconButton src={qrIcon} alt="scan" action={() => {}} />
        <span>Scan a QR code to add an account</span>
    </div>
    <div>
        <IconButton src={plusIcon} alt="add" action={() => {}} />
        <span>Add an account manually by entering a TOTP key</span>
    </div>
    <div>
        <IconButton src={trashIcon} alt="delete" action={() => {}} />
        <span>Delete the currently selected account</span>
    </div>
    <div>
        <IconButton src={editIcon} alt="edit" action={() => {}} />
        <span>Edit the TOTP key of the currently selected account</span>
    </div>
    <div>
        <IconButton src={syncIcon} alt="sync" action={() => {}} />
        <span>Sync your accounts with the server (asks for your encryption password)</span>
    </div>
    <div>
        <IconButton src={settingsIcon} alt="settings" action={() => {}} />
        <span>Change or set your sync account token (this should be the same across all your devices)</span>
    </div>
    <button on:click={onDone}>Done</button>
</section>

<style>
    section {
        width: 90vw;
        height: 80vh;
        background-color: var(--accent-background-color);
        z-index: 1;
        position: absolute;
        top: 10vh;
        left: 5vw;
        box-shadow:
            0 0 0 5px var(--main-background-color),
            0 0 0 8px var(--accent-color);
        border-radius: 10px;
        display: grid;
    }

    button {
        height: 40px;
        max-width: 200px;
        width: 70%;
        border-radius: 10px;
        box-shadow:
            0 0 0 2px var(--accent-background-color),
            0 0 0 5px var(--main-background-color);
        background-color: var(--main-background-color);
        border: none;
        color: var(--main-color);
        font-size: medium;
        cursor: pointer;
        margin: 0 auto auto;
    }

    h1 {
        margin: 20px auto;
        color: var(--main-color);
        margin-bottom: 0px;
    }

    p {
        margin: 0 auto;
        padding: 0 15px;
        color: var(--main-color);
    }

    div {
        padding: 0 10px;
    }

    span {
        position: relative;
        top: -5px;
    }
</style>
