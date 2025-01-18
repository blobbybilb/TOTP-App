<script lang="ts">
    export let src: string
    export let alt: string
    export let action: () => void

    export let size: number = 23
</script>

<button on:click={action}>
    <img src={src} alt={alt} style="height: {size}px"/>
</button>

<style>
    img {
        filter: var(--img-filter);
        margin: 0 10px;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        min-height: 0;
        min-width: 0;
    }

    button:active img {
        animation: fade 0.5s;
    }

    @keyframes fade {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
</style>