#### Note: progress will be slow for some time, as I'm busy with other stuff, and I don't need it right now. Also, I'd prefer to wait and see how common WebAuthn becomes before committing more time into this, just in case.
---
### Open Source TOTP authenticator with E2EE self-hostable sync

Goal: a free, open-source, cross-platform, authenticator app that supports E2EE sync

Why: there don't seem to be any free, open-source, non-self hosted authenticators with E2EE sync, for some reason


Status: **Pre-alpha, not yet useable, in active development**
(everything is WIP, including the name)

- core library (TS): done

- default remote (cloudflare workers): functional, almost done
- self-hosted remote (deno, koa): nearly functional

- **GUI** (svelte SPA/PWA): close to functional
- CLI (deno script): ~~not yet started~~ ~~soon...~~ maybe...
- ~~no-JS GUI (non-E2EE, server side JS (could be self-hosted)): maybe~~
- ~~alexa skill: maybe~~
