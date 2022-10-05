<script>
  let shownTOTP = '--- ---'
  let shownTimer = 0
  let shownAccount = '-'
  let totp
  // @ts-ignore
  const TOTP = OTPAuth.TOTP
  const getTimeUntilTOTPChange = () =>
    30 - (Number(new Date().getSeconds()) % 30)

  export function setKey(token) {
    totp = new TOTP({
      digits: 6,
      period: 30,
      secret: token.key,
    })
    shownAccount = token.name
    updateDisplay()
  }

  function updateDisplay() {
    if (!totp) return
    const current = totp.generate()
    shownTOTP = `${current.substring(0, 3)} ${current.substring(3, 6)}`
    shownTimer = getTimeUntilTOTPChange()
  }

  setInterval(() => {
    updateDisplay()
  }, 1000)
</script>

<main>
  <p id="timer">{shownAccount}</p>
  <p id="otp">{shownTOTP}</p>
  <p id="timer">{shownTimer}</p>
  <hr />
</main>

<style>
  * {
    background-color: var(--main-background-color);
  }
  #otp {
    font-weight: 300;
    text-align: center;
    margin-top: 2vh;
    margin-bottom: 1vh;
    font-size: 3em;
  }
  #timer {
    text-align: center;
  }
</style>
