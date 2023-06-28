<script lang="ts">
    import type {TOTPAccount} from '../../../../core/types'
    import {currentName} from "../../helpers/stores";

    export let token: TOTPAccount
    export let setTOTPDisplay: (token: TOTPAccount) => void
    // const id = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`
    const id = `${token.name}`

    function activate() {
        setTOTPDisplay(token)
        const button = document.getElementById(id)

        button!.style.opacity = '0.75'

        setTimeout(() => {
            button!.style.opacity = '1'
        }, 100)
    }
</script>

<button on:click={activate} {id} class={$currentName === token.name ? "selected" : ""}>{token.name}</button>
<br/>

<style>
    button {
        height: 40px;
        max-width: 500px;
        width: 70%;
        border-radius: 10px;
        box-shadow: 0 0 0 2px var(--main-background-color), 0 0 0 5px var(--accent-background-color);
        background-color: var(--accent-background-color);
        border: none;
        margin-top: 30px;
        color: var(--main-color);
        font-size: medium;
        cursor: pointer;
    }

    button.selected {
        box-shadow: 0 0 0 2px var(--main-background-color), 0 0 0 5px var(--accent-color);
    }
</style>
