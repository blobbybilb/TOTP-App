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
    <p id="account">{shownAccount}</p>
    <p id="otp">{shownTOTP}</p>
    <p id="timer">{shownTimer}</p>
</main>

<style>
    main {
        --spacing: 15px;
        text-align: center;
        width: 100%;
        margin-top: calc(var(--spacing));
    }

    #account {
        font-size: 1.2em;
        margin: 0;
    }
    #otp {
        font-weight: 300;
        font-size: 3em;
        margin: 0;
        margin-top: var(--spacing);
    }
    #timer {
        text-align: center;
        margin: 0;
        margin-top: var(--spacing);
    }
</style>
