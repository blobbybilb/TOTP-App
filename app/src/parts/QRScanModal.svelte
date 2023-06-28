<script lang="ts">
    import QrScanner from "qr-scanner";
    import {onMount} from "svelte";
    import {ModalShown, storage, modalShown} from "../helpers/stores";
    import {StorageStatus} from "../../../core/types";

    export let PIN: string

    let qrScanner: QrScanner

    let lastStatusUpdate = Date.now()
    let status = "Scanning..."

    setInterval(() => {
        if (Date.now() - lastStatusUpdate > 2000) {
            status = "Scanning..."
        }
    }, 1000)

    function onDetect(result: QrScanner.ScanResult) { // TODO test this with invalid stuff
        if (result.data === "") return
        let url: URL
        try {
            url = new URL(result.data)
        } catch (_) {
            status = "Invalid QR code (no URL found)"
            lastStatusUpdate = Date.now()
            return
        }
        if (url.protocol !== "otpauth:") {
            status = "Invalid QR code (not an OTP URL)"
            lastStatusUpdate = Date.now()
            return
        }
        // otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP
        let part1, part2
        try {
            [part1, part2] = url.pathname.split("/").filter(x => x !== "")
        } catch (_) {
            status = "Invalid QR code (not a valid URL)"
            lastStatusUpdate = Date.now()
            return
        }
        if (part1 !== "totp") {
            status = "Invalid QR code (not a TOTP URL)"
            lastStatusUpdate = Date.now()
            return
        }
        let issuer, user
        try {
            [issuer, user] = part2.split(":")
        } catch (_) {
            status = "Invalid QR code (not a valid URL)"
            lastStatusUpdate = Date.now()
            return
        }
        const secret = url.searchParams.get("secret")
        if (secret === null) {
            status = "Invalid QR code (no secret found)"
            lastStatusUpdate = Date.now()
            return
        }

        $storage.addAccount(PIN, `${issuer}: ${user}`, secret).then((s) => {
            if (s !== StorageStatus.Success) alert("Failed to add account from QR code")
            window.location.reload()
        })
        qrScanner.stop();
        $modalShown = ModalShown.None
    }

    onMount(() => {
        console.log('onMount')
        const qrScanEl = document.getElementById('qr-scan-el');
        qrScanner = new QrScanner(
            qrScanEl,
            onDetect,
            {
                returnDetailedScanResult: true,
                overlay: true,
                // onDecodeError: error => console.error(error),
            },
        )
        qrScanner.start();
    })
</script>

<section>
    <div>
        <figure>
            <video id="qr-scan-el"></video>
        </figure>
    </div>
    <p>{status}</p>
    <button on:click={() => $modalShown = ModalShown.None}>Cancel</button>
</section>

<style>
    section {
        width: 90vw;
        height: 90vh;
        background-color: var(--accent-background-color);
        z-index: 1;
        position: absolute;
        top: 5vh;
        left: 5vw;
        box-shadow: 0 0 0 5px var(--main-background-color), 0 0 0 8px var(--accent-color);
        border-radius: 10px;
        display: grid;

    }

    div {
        width: fit-content;
        height: fit-content;
        margin: auto;
    }

    video {
        width: auto;
        height: 50vh;
        margin-left: auto;
        border-radius: 10px;
        max-width: 80vw;
    }

    button {
        height: 40px;
        max-width: 200px;
        width: 70%;
        border-radius: 10px;
        box-shadow: 0 0 0 2px var(--accent-background-color), 0 0 0 5px var(--main-background-color);
        background-color: var(--main-background-color);
        border: none;
        color: var(--main-color);
        font-size: medium;
        cursor: pointer;
        margin: 0 auto auto;
    }

    p {
        margin: 0 auto;
        color: var(--main-color);
    }
</style>