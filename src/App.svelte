<script>
  import Account from './lib/Account.svelte'
  import Titlebar from './lib/Titlebar.svelte'
  import Totpdisplay from './lib/Totpdisplay.svelte'
  import * as data from './lib/data'

  let totpdisplay

  const PIN = 'blob'
  // const PIN = prompt('Enter PIN')

  if (!localStorage.getItem('data')) {
    data.setLocalData(PIN, { name: 'test', key: 'test' })
  }
  data.getLocalData(PIN).then((e) => console.log(e))
</script>

<main>
  <Titlebar {PIN} />
  <div id="totpdisplay">
    <Totpdisplay bind:this={totpdisplay} />
  </div>
  <div id="maingrid">
    {#await data.getLocalData(PIN) then tokenData}
      {#each tokenData as token}
        <Account {token} setKey={totpdisplay?.setKey} />
      {/each}
    {/await}
  </div>
  <!-- <Config id="config" /> -->
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
