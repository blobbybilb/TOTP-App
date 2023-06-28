<script lang="ts">
    let token = localStorage.getItem('remoteToken')
    let password: string

    function save() {
    }
</script>

<main>
    <div id="main">
        <h2>Remote Sync</h2>
        <div class="token">
            <label for="token">Token</label>
            <input type="text" id="token" bind:value={token}/>

            <label for="password">Password</label>
            <input type="password" id="password" bind:value={password}/>

            <button on:click={save}>Save</button>
        </div>
    </div>
</main>

<style>
    #main {
        border-radius: 20px;
        background-color: var(--accent-background-color);
        position: fixed;
        top: 30%;
        height: 200px;
        width: 300px;
        z-index: 2;
    }

    * {
        display: block;
    }

</style>
