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
        // let part1, part2
        // try {
        //     [part1, part2] = url.pathname.split("/").filter(x => x !== "")
        // } catch (_) {
        //     status = "Invalid QR code (not a valid URL)"
        //     lastStatusUpdate = Date.now()
        //     return
        // }
        // if (part1 !== "totp") {
        //     status = "Invalid QR code (not a TOTP URL)"
        //     lastStatusUpdate = Date.now()
        //     return
        // }


        // otpauth://totp/somelabel?secret=somesecret&issuer=someissuer
        if (url.hostname !== "totp") {
            status = "Invalid QR code (not a TOTP URL)"
            lastStatusUpdate = Date.now()
            return
        }

        const label = url.pathname.split("/").filter(x => x !== "")[0]

        let [issuer, user] = ["", ""]
        if (url.searchParams.has("issuer")) {
            issuer = url.searchParams.get("issuer")!
        }
        if (label !== "") {
            user = url.searchParams.get("user")!
        }

        const secret = url.searchParams.get("secret")
        if (secret === null) {
            status = "Invalid QR code (no secret found)"
            lastStatusUpdate = Date.now()
            return
        }

        qrScanner.stop();

        let name = `${issuer}${issuer !== "" ? ": " : ""}${user}`
        name = prompt("Enter a name for this account", name)

        // let issuer, user
        // try {
        //     [issuer, user] = part2.split(":")
        // } catch (_) {
        //     status = "Invalid QR code (not a valid URL)"
        //     lastStatusUpdate = Date.now()
        //     return
        // }
        // const secret = url.searchParams.get("secret")
        // if (secret === null) {
        //     status = "Invalid QR code (no secret found)"
        //     lastStatusUpdate = Date.now()
        //     return
        // }
        // qrScanner.stop();

        // let name = `${issuer}: ${user}`
        // name = prompt("Enter a name for this account", name)

        if (name === null) {
            $modalShown = ModalShown.None
            return
        }

        $storage.addAccount(PIN, name, secret).then((s) => {
            if (s === StorageStatus.Duplicate) alert("Account already exists")
            else if (s !== StorageStatus.Success) alert("Failed to add account from QR code")
            window.location.reload()
        })
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
            },
        )
        qrScanner.start();
    })

    modalShown.subscribe((value) => {
        if (value !== ModalShown.QRScan) {
            qrScanner.stop();
        }
    })

</script>

<section>
    <div class="placeholder"></div>

    <div class="video-container">
        <figure>
            <video id="qr-scan-el"></video>
        </figure>
    </div>

    <p>{status}</p>
    <button on:click={() => $modalShown = ModalShown.None}>Cancel</button>
</section>
<div class="overlay"></div>

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

    div.video-container {
        width: min-content;
        height: min-content;
        margin: auto;
        position: absolute;
        top: 0;
        left: 45vw;
        transform: translateX(-50%);
    }

    div.placeholder {
        height: 60vh;
    }

    video {
        width: min-content;
        margin-left: auto;
        border-radius: 10px;
        max-height: 50vh;
        /*max-width: 90vw;*/
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

    div.overlay {
        width: 90vw;
        height: 90vh;
        z-index: 2;
        position: absolute;
        top: 5vh;
        left: 5vw;
        box-shadow: 0 0 0 5px var(--main-background-color), 0 0 0 8px var(--accent-color), 0 0 10vmax 10vmax var(--main-background-color);
        border-radius: 10px;
        display: grid;
        pointer-events: none
    }
</style>