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
- Enforced API coverage thresholds and dependency audits
- Docker image, Compose model and Caddy configuration validation
- No frontend web server in production
- Only Caddy is exposed publicly
- Multi-domain support (v1/v2)
- One-command Docker deployment
- Development hot-reload
- Turnstile, honeypot, strict validation and per-IP contact rate limiting

## Development

```bash
make dev-setup       # Install locked frontend and API dependencies
make dev-frontend    # Start Vite
make dev-api         # Start Fastify with hot reload (second terminal)
```

Vite forwards `/api/*` to the local API. In development, the contact page uses
Cloudflare's official always-pass Turnstile test key when no
`VITE_TURNSTILE_SITE_KEY` is provided. Set `RESEND_API_KEY` in the API process
if you also want to send real test emails; without it, contact submissions
return `503` by design.

## Deployment

```bash
make logs            # Follow Caddy logs
make logs-api        # Follow API logs
make rebuild         # Fresh deployment
```

The reusable `.github/workflows/tests.yaml` workflow runs three CI jobs in
parallel on every pull request targeting `master`:

- API tests with coverage thresholds, type-checking, compilation and dependency audit
- Frontend type-checking, linting, production build and dependency audit
- Compose/Caddy validation and reproducible builds of both Docker images

On a push to `master`, `deploy.yml` calls that same workflow through
`workflow_call`. Publishing to GHCR and the self-hosted production deployment
only start after the complete called workflow passes. Both workflows can also
be run manually from the GitHub Actions interface.

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
for automatic deployment. Deployment currently stops the stack while pulling
images/building the API; it is not a zero-downtime or automatic rollback setup.

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
