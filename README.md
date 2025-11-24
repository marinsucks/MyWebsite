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
- Internationalization (FR/EN) support
- Performance mode detection
- Clean component architecture

**DevOps Setup**
- Automatic HTTPS via Let's Encrypt
- Multi-domain support (v1/v2)
- One-command Docker deployment
- Development hot-reload

## Development

```bash
make logs        # Check what's happening
make rebuild     # Fresh deployment
make ssl-status  # Verify certificates
```

**Built with**: React, TypeScript, Tailwind, Docker, nginx-proxy, Let's Encrypt

**Requirements**: Docker, a domain pointing to your server, and you're good to go!

---

Feel free to reach out at [hello@marinbecker.me](mailto:hello@marinbecker.me) if you have any questions!
