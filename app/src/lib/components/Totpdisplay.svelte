<script lang="ts">
    import type { TOTPAccount } from '../../../../core/types'
    import { getTimeUntilTOTPChange, newTOTP } from '../../../../core/totp'
    import type { TOTP } from '../../../../core/external/otpauth.esm'

    let shownTOTP = '--- ---'
    let shownTimer = 0
    let shownAccount = '-'
    let totp: TOTP

    export function setKey(token: TOTPAccount): void {
        totp = newTOTP(token.key)
        shownAccount = token.name
        updateDisplay()
    }

    function updateDisplay() {
        if (!totp) return
        const current = totp.generate()
        shownTOTP = `${current.substring(0, 3)} ${current.substring(3, 6)}`
        shownTimer = getTimeUntilTOTPChange()
    }

    setInterval(updateDisplay, 1000)
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
