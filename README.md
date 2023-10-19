#### Note: progress will be slow for some time, as I'm busy with other stuff, and I don't need it right now. Also, I'd prefer to wait and see how common WebAuthn becomes before committing more time into this, just in case.
---
<img width=200 src="https://github.com/blobbybilb/TOTP-App/assets/58201828/4ca7f46e-7a1d-4163-9c8c-a8acc3432113" alt="hello"></img>

# TOTP[App]
### Open Source TOTP authenticator with E2EE self-hostable sync

Goal: a free, open-source, cross-platform, authenticator app that supports end-to-end encrypted sync.

Currently in **Alpha**. Barely functional. Has bugs and missing features. Use at your own risk, and back up your tokens.

Why: there don't seem to be any free, open-source, non-self hosted authenticators with E2EE sync, for some reason

(everything is WIP, including the name)

- **GUI** (svelte SPA/PWA): close to functional

- core library (TS): done
- remote (cloudflare workers): done
- CLI: coming soon(-ish)

# Usage
Easiest: [Go to the live, static web app, hosted on Cloudflare Pages.](https://totp-app.pages.dev/) It is a fully offline capable PWA, and can be "installed" through your browser.

Apps for iOS and Android are coming soon.

You can also self-host the `app/dist` directory, which contains the same site deployed to Cloudflare Pages.

By default, it uses Cloudflare Workers to sync data across devices.

## Self-hosted sync
*Not yet supported in the GUI App, coming soon.*
The `remote` directory contains an npm project for a cloudflare worker. To run it locally you can run `npm i` and `npm run start` in the `remote` directory. (This uses `miniflare` and `workersd`, I'm not too sure about how reliable/production ready that is. If I find out that it's not, I will make a different remote for self hosting.)

# Coming soon list
(A list of stuff "coming soon")

coming soon

---

GPLv3 License.

Icons used are from Iconicons by Ionic, under the MIT License.
