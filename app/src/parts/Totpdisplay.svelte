<script lang="ts">
    import type {TOTPAccount} from '../../../core/types'
    import {getTimeUntilTOTPChange, newTOTP} from '../../../core/totp'
    import type {TOTP} from '../../../core/external/otpauth.esm'
    import copyIcon from '../assets/copy-outline.svg'
    import {keybind} from '../helpers/ui'
    import {currentName} from '../helpers/stores'
    import IconButton from "../components/IconButton.svelte";

    let shownTOTP = $state('--- ---')
    let shownTimer = $state(0)
    let shownAccount = $state('-')
    let totp: TOTP | null = $state(null)

    export function set(token: TOTPAccount): void {
        totp = newTOTP(token.key)
        shownAccount = token.name
        updateDisplay()
    }

    function updateDisplay() {
        if (!totp) return
        const current = totp.generate()
        shownTOTP = `${current.substring(0, 3)} ${current.substring(3, 6)}`
        shownTimer = getTimeUntilTOTPChange()
        currentName.set(shownAccount)
    }

    function copy() {
        navigator.clipboard.writeText(shownTOTP.replace(' ', ''))
    }

    setInterval(updateDisplay, 1000)
</script>

<div>
    <p id="account">{shownAccount}</p>
    <p id="otp">{shownTOTP}</p>
    <IconButton action={copy} src={copyIcon} alt="copy" size={25}/>
    <p id="timer">{shownTimer}</p>
</div>

<style>
    div {
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
        margin: var(--spacing) 0 0;
        margin-bottom: 10px;
    }

    #timer {
        text-align: center;
        margin: var(--spacing) 0 0;
    }
</style>
