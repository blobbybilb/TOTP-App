<script lang="ts">
    import Account from './Account.svelte'
</script>

<main>
    <div id="topbar" />
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
        outline: 3px solid var(--accent-background-color);
        margin-top: 25px;
        width: 100%;
        height: calc(100vh - 190px);
        display: block;
        border-radius: 10px;
        overflow: hidden;
        outline-offset: 3px;
    }

    #topbar {
        height: 50px;
        background-color: var(--accent-background-color);
    }

    #container {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }

    #bottom-padding {
        height: 100px;
    }
</style>
