# My Portfolio Website

Hey there! This is my personal portfolio website, built to showcase my work and projects. It's designed to be simple, fast, and clean.

## Quick Setup

```bash
cp example.env .env  # Set your domain
make deploy         # Deploy everything
```

Your site will be live with automatic HTTPS at `https://yourdomain.com` 🚀

## What's Inside

**Frontend & Design**
- Modern React interface with dark/light mode
- ASCII character background animation 
- Transparent glassmorphism header/footer
- Mobile-first responsive design

**Tech Stack**
- React + TypeScript + Tailwind CSS
- Fastify + TypeScript API
- Internationalization (FR/EN) support
- Contact form with localized confirmation email
- Performance mode detection
- Clean component architecture

**DevOps Setup**
- Automatic HTTPS and certificate renewal via Caddy
- Frontend built reproducibly with Docker and `npm ci`
- Pull-request CI with parallel API, frontend and infrastructure quality gates
- Enforced API coverage thresholds and separate dependency security audits
- Docker image, Compose model and Caddy configuration validation
- No frontend web server in production
- Only Caddy is exposed publicly
- Multi-domain support (v1/v2)
- One-command Docker deployment
- Development hot-reload
- Turnstile, honeypot, strict validation and per-IP contact rate limiting

## Development

```bash
nvm install         # Use the exact Node.js version in .nvmrc (bundles pinned npm)
nvm use
make dev-setup       # Install locked frontend and API dependencies
make dev-frontend    # Start Vite
make dev-api         # Start Fastify with hot reload (second terminal)
```

Vite forwards `/api/*` to the local API. In development, the contact page uses
Cloudflare's official always-pass Turnstile test key when no
`VITE_TURNSTILE_SITE_KEY` is provided. Set `RESEND_API_KEY` in the API process
if you also want to send real test emails; without it, contact submissions
return `503` by design.

### Image assets

Homepage illustrations use checked-in, lossless WebP assets at 768px and 1536px.
The browser selects a size for its viewport and pixel density. The first image
is preloaded from HTML; both start loading without waiting for scrolling. Keep
the preload's `imagesizes` and `imagesrcset` consistent with `Home.tsx` to avoid
duplicate downloads. Originals remain available for editing and social previews.
Header logos and the About avatar use small WebP derivatives instead of shipping
the full SVG paths in JavaScript or downloading the original portrait. Conversion
is not part of installation or CI and adds no application dependency. The offline
browser tests enforce a 260 KB budget for both homepage images on a 390px, 2x screen.

## Deployment

```bash
make logs            # Follow Caddy logs
make logs-api        # Follow API logs
make rebuild         # Fresh deployment
```

The reusable `.github/workflows/tests.yaml` workflow runs four CI jobs in
parallel on every pull request targeting `master`:

- API tests with coverage thresholds, type-checking and compilation
- Frontend type-checking, linting and production build
- Browser E2E tests of FR/EN navigation and the complete contact flow
- Compose/Caddy validation and reproducible builds of both Docker images

Every push to `master` runs the isolated test workflow. Only production-source
changes trigger `deploy.yml`; changes limited to tests, monitoring, workflows or
documentation never restart the site. Deployment can also be requested manually.
When triggered, `deploy.yml` calls that same workflow through
`workflow_call`. Publishing to GHCR and the self-hosted production deployment
only start after the complete called workflow passes. Both workflows can also
be run manually from the GitHub Actions interface.

### Reproducible dependencies and security audits

Node.js is fixed to `24.22.3` in `.nvmrc` and npm to its bundled `11.19.1`.
Both projects enforce these exact versions through `engines` and `.npmrc`.
Direct dependencies use exact versions; the committed `package-lock.json`
files also lock transitive dependencies and their integrity hashes. Use
`npm ci`, not `npm install` or `npm update`, to reproduce an existing checkout.
CI and Docker installations disable the implicit network security audit.

Test and deployment actions are pinned to commit SHAs. Docker base images,
Caddy and BuildKit are pinned to image digests, Buildx uses an exact version,
and hosted CI selects Ubuntu 26.04 explicitly. GitHub can still patch its
hosted runner image, and downloads still require registry availability; this
does not make the entire build offline or bit-for-bit reproducible.

`dependency-audit.yml` separately checks both lockfiles with
`npm audit --package-lock-only --audit-level=high` on pushes to `master`, pull
requests, weekly and on manual dispatch. It fails visibly on high/critical
findings, but is not a dependency of the test or deployment workflow.
The advisory database is live: even an unchanged lockfile can acquire new
findings. Keep this workflow separate from required reproducibility checks.

The CI fix preserves all installed library versions; it does not remediate
the reported vulnerabilities. Dependency/security updates must be deliberate:
change the requested exact versions and lockfiles, then run all quality gates.
When updating Node/npm, also update `.nvmrc`, both projects' engine/package
manager declarations, and the Node image digest in both Dockerfiles.

### Contact tests and live monitoring

The `e2e` project pins Playwright 1.58.2 and its browser image by digest. The
deployment gates exercise the production frontend build, HTTP proxy, real API,
contact service and Resend SDK. Only the external Turnstile/Resend network
boundaries are replaced locally. Cases include both languages and recipients,
provider outages, invalid credentials, partial responses, retained form content
and safe retries after a lost response. No real emails or secrets are used in CI.

```bash
nvm use
npm ci --prefix e2e --no-audit --no-fund
cd e2e && npm exec -- playwright install chromium && cd ..
npm --prefix api run build
VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm --prefix frontend run build
node --test e2e/monitor.test.mjs
npm --prefix e2e test
```

The separate **Health Check** workflow runs hourly (at minute 17 UTC), after a
successful deployment, and manually. It checks public pages, the public API,
production Turnstile rejection/availability, then submits the local monitoring
form through the real Cloudflare test widget/Siteverify and real Resend API.
Both emails go exclusively to Resend's official `delivered+...@resend.dev` test
recipients; the workflow verifies that Resend accepts both emails and returns
two distinct message IDs.

Sending uses the existing `RESEND_API_KEY`. Optional delivery checks require a
separate `RESEND_MONITOR_API_KEY` with read access. When configured, the workflow
also waits for simulated `delivered` events and checks the previous 24 hours of
this domain's sent emails for rejection, suppression, complaints, delivery
delays or missing delivery after 30 minutes. Without that key, a workflow notice
and a skipped test make this coverage limit explicit; send acceptance and
Turnstile checks still run. The domain comes from the existing `DOMAIN` setting.
Two synthetic emails per hourly run consume sending quota (normally 48/day,
plus manual and post-deployment runs).

Failures open one GitHub issue assigned to `marinsucks`; repeated failures update
that issue, and recovery adds a comment and closes it. Notification is independent
of Resend. Enable email/mobile notifications for assigned issues in GitHub's
personal notification settings. GitHub schedules can be delayed and GitHub itself
can be unavailable, so this is hourly monitoring, not an immediate uptime SLA.

These checks do **not** prove final inbox placement or Squarespace forwarding.
Cloudflare requires test keys for automated successful challenges; the production
widget/secret pairing still needs a real visitor's valid challenge. Resend's
`delivered` event means acceptance by the destination mail server, not that a
human saw the message. There is currently no durable message outbox: failed
submissions remain in the open form for retry, not in server-side storage. A
persistent outbox with backups is required before promising recoverability
after a browser/server failure. Monitoring detects incidents; it does not replace
that storage.

The edge configuration is versioned in `proxy/Caddyfile`. During deployment,
the one-shot `frontend-build` container copies the generated v1/v2 assets into
a private volume and exits. Caddy is the only publicly exposed service: it
serves that volume and owns TLS, security headers and host routing. The API
remains private on the Compose network. Caddy's `/data` volume contains TLS
certificates and private keys and must remain persistent.

The API follows a conventional layered structure:

```text
api/src/
├── config/       # Runtime configuration
├── controllers/  # HTTP request handlers
├── middleware/   # Cross-cutting HTTP behavior
├── routes/       # Central, explicit route registry
└── services/     # Business logic
```

Routes are declared without the public `/api` prefix in
`api/src/routes/index.ts`. Caddy and Vite add that public prefix:

| Internal API route | Public route | Purpose |
| --- | --- | --- |
| `GET /health` | `GET /api/health` | Health check |
| `POST /contact` | `POST /api/contact` | Validate and deliver a contact submission |

The contact route validates the payload, silently traps honeypot submissions,
verifies a single-use Cloudflare Turnstile token, and rate-limits each IP to
three attempts per 15 minutes. Resend then submits the private notification and
the visitor's localized confirmation together under one idempotency key. The
visitor's address is used as `Reply-To`, never as `From`.

## Contact service setup

1. Create a Resend account, add `marinbecker.me`, and copy the DNS records
   supplied by Resend into the Squarespace domain's custom DNS records. Keep
   Squarespace's existing email-forwarding records: Resend normally uses the
   `send` subdomain for its MX/SPF records and `resend._domainkey` for DKIM, so
   these records can coexist.
2. Wait for the domain to show as verified in Resend, create an API key, then
   add it as the GitHub Actions repository secret `RESEND_API_KEY`.
3. Create a Cloudflare Turnstile widget for `marinbecker.me`, allowing the root,
   `www`, and `v2` hostnames. Add its secret key as the GitHub Actions
   repository secret `TURNSTILE_SECRET_KEY`.
4. Add the widget's public site key as the GitHub Actions repository variable
   `TURNSTILE_SITE_KEY`.
5. Add repository variables `DOMAIN=marinbecker.me` and `EMAIL` (your ACME
   contact address). The API uses `contact@marinbecker.me` for both sending
   and receiving, and derives allowed Turnstile hostnames from `DOMAIN`
   (root, `www`, and `v2`). Non-secret settings can also be stored
   as repository secrets; variables take precedence when both exist.

On every deployment, Actions generates `.env` at the checkout root with mode
`600` using `scripts/deployment-env.sh`. Required settings are checked before
publishing the frontend image and again before stopping any containers.
Values are never printed. The generated file remains available for server-side
Compose commands and is replaced on the next deployment. No parent `.env`
or manual secret copying is needed. Local development still uses your own
ignored `.env`; it is never uploaded by the workflow. Configure repository-level
settings under **Settings → Secrets and variables → Actions** (the workflow
does not select a GitHub Environment).

The production machine needs a running GitHub Actions runner, Docker Engine
with the Compose plugin, `make`, Git and curl. The runner user must be able to
use Docker. Keep ports 80/443 available and DNS pointing at this machine.
GitHub supplies `GITHUB_TOKEN` automatically for image publication; the current
public GHCR image can be pulled without a manually configured registry token.
Only pushes to `master` by `marinsucks` in `marinsucks/MyWebsite` are authorized
for automatic deployment. Images are pulled and the API is built while the
existing stack stays running, then Compose updates the services. API replacement
can still interrupt in-flight requests; this is not a zero-downtime or automatic
rollback setup. Tests and live monitoring never invoke Docker on production.

Squarespace forwarding only covers incoming mail. The automatic confirmation
is sent from `contact@marinbecker.me` by Resend, but a manual reply from the
destination mailbox may expose that mailbox's own address. To keep
`contact@marinbecker.me` as the visible sender for manual replies too, configure
it as a verified "Send as" identity in the destination mail client. If that
client accepts external SMTP, use a dedicated Resend API key with
`smtp.resend.com`, port `465` (TLS), username `resend`, and the API key as the
password. Otherwise, use a mailbox provider that hosts this address instead of
forwarding only.

**Built with**: React, TypeScript, Tailwind, Fastify, Docker, Caddy

**Requirements**: Docker, a domain pointing to your server, and you're good to go!

---

Use the contact form at `/contact` to get in touch.
