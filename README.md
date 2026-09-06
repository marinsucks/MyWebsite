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
- Performance mode detection
- Clean component architecture

**DevOps Setup**
- Automatic HTTPS and certificate renewal via Caddy
- Frontend built reproducibly with Docker and `npm ci`
- No frontend web server in production
- Only Caddy is exposed publicly
- Multi-domain support (v1/v2)
- One-command Docker deployment
- Development hot-reload

## Development

```bash
make dev-setup       # Install locked frontend and API dependencies
make dev-frontend    # Start Vite
make dev-api         # Start Fastify with hot reload (second terminal)
```

## Deployment

```bash
make logs            # Follow Caddy logs
make logs-api        # Follow API logs
make rebuild         # Fresh deployment
```

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
`api/src/routes/index.ts`. The initial skeleton only provides `GET /health`;
Caddy and Vite expose it publicly as `GET /api/health`. No business or contact
endpoint is implemented yet.

**Built with**: React, TypeScript, Tailwind, Fastify, Docker, Caddy

**Requirements**: Docker, a domain pointing to your server, and you're good to go!

---

Feel free to reach out at [hello@marinbecker.me](mailto:hello@marinbecker.me) if you have any questions!
