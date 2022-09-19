<script>
    export let data
    export let setKey
</script>

<main on:click={() => setKey(data.key)}>
    <p>{data.name}</p>
</main>

<style>
    p {
        font-weight: 300;
        text-align: center;
        font-size: 2em;
        border: 1px solid var(--accent-background-color);
        /* background-color: var(--accent-background-color); */
        width: 60%;
        margin: auto;
        padding-top: 1vh;
        padding-bottom: 1vh;
        border-radius: 10px;
    }
</style>
