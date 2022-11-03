<script lang="ts">
    import Account from './Account.svelte'
    import qrIcon from '../../assets/qr-code-outline.svg'
    import plusIcon from '../../assets/add-outline.svg'
</script>

<main>
    <div id="topbar">
        <div id="grid">
            <img src={qrIcon} alt="scan" />
            <img src={plusIcon} alt="add" />
        </div>
    </div>
    <div id="container">
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
        <div id="bottom-padding" />
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

    #topbar {
        height: 50px;
        background-color: var(--accent-background-color);
    }

    #container {
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-gutter: stable both-edges;
        height: 100%;
        width: 100%;
    }

    #bottom-padding {
        height: 100px;
    }

    #grid {
        display: block;
        padding-top: 15px;
        width: 100%;
    }

    img {
        margin: 0 10px;
    }
</style>
