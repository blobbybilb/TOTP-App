<script lang="ts">
    import type { TOTPAccount } from '../core/types'
    export let token: TOTPAccount
    export let setKey: Function

    function activate() {
        setKey(token)
    }
</script>

<main on:click={activate}>
    <p>{token.name}</p>
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
