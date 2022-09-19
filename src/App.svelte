<script>
    import Account from './lib/Account.svelte'
    import Titlebar from './lib/Titlebar.svelte'
    import Totpdisplay from './lib/Totpdisplay.svelte'

    let totpdisplay

    const tokenData = [
        {
            name: 'beep',
            key: 'boop',
        },
        {
            name: 'blip',
            key: 'blap',
        },
    ]
</script>

<main>
    <Titlebar />
    <Totpdisplay bind:this={totpdisplay} />
    <div id="maingrid">
        {#each tokenData as token}
            <Account data={token} setKey={totpdisplay?.setKey} />
        {/each}
    </div>
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
