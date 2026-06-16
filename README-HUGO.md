# Hugo Academic Portfolio — Deployment Guide

Complete guide for building, running, and maintaining the **Srinjoy Bhuiya Academic Portfolio** — a Hugo static site served via Docker and managed through Portainer.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Project Structure](#project-structure)
4. [Adding Content](#adding-content)
5. [Docker Build & Run](#docker-build--run)
6. [Portainer Deployment](#portainer-deployment)
7. [Auto-Redeploy Workflow](#auto-redeploy-workflow)
8. [PR Preview (Design Check Before Deployment)](#pr-preview-design-check-before-deployment)
9. [Customisation](#customisation)
10. [Updating Resume Content](#updating-resume-content)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool | Required for |
|------|-------------|
| [Hugo Extended](https://gohugo.io/installation/) v0.120+ | Local development |
| [Docker](https://docs.docker.com/get-docker/) | Building & running the container |
| [Docker Compose](https://docs.docker.com/compose/) | Multi-container management |
| [Git](https://git-scm.com/) | Version control |
| [Portainer](https://www.portainer.io/) | Homelab container management (optional) |

### Install Hugo (local development only)

**macOS:**
```bash
brew install hugo
```

**Linux (Debian/Ubuntu):**
```bash
wget https://github.com/gohugoio/hugo/releases/latest/download/hugo_extended_0.128.0_linux-amd64.deb
sudo dpkg -i hugo_extended_*.deb
```

**Windows:**
```powershell
winget install Hugo.Hugo.Extended
```

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Srinjoycode/sb-resume-content-json.git
cd sb-resume-content-json
```

### 2. Start the development server

```bash
hugo server --buildDrafts --watch
```

Hugo will:
- Build the site
- Start a local server at **http://localhost:1313**
- Auto-reload when you save any file

### 3. Build for production (optional)

```bash
hugo --minify --gc
# Output is in the public/ folder
```

---

## Project Structure

```
.
├── hugo.yaml              ← Hugo configuration
├── Dockerfile             ← Multi-stage Docker build
├── docker-compose.yml     ← Portainer / Compose deployment
├── nginx.conf             ← NGINX config for the container
│
├── data/                  ← ⭐ JSON resume content (edit these!)
│   ├── profile.json       ← Name, bio, contact, social links
│   ├── education.json     ← Degrees and courses
│   ├── experience.json    ← Work history
│   ├── publications.json  ← Research papers
│   ├── awards.json        ← Scholarships and honours
│   ├── skills.json        ← Technical skills by category
│   └── volunteer.json     ← Leadership and service
│
├── content/               ← Markdown pages
│   ├── _index.md          ← Home page (minimal; sections are data-driven)
│   ├── about.md           ← About page
│   ├── cv.md              ← Full CV page (auto-generated from JSON)
│   ├── projects.md        ← Projects narrative page
│   ├── contact.md         ← Contact page
│   └── posts/             ← Blog posts
│       ├── _index.md
│       ├── first-blog-post.md
│       └── example-research-update.md
│
├── layouts/               ← Hugo templates
│   ├── index.html         ← Home page layout (loads all section partials)
│   ├── _default/
│   │   ├── baseof.html    ← Base HTML wrapper (navbar + footer)
│   │   ├── single.html    ← Generic single page
│   │   └── list.html      ← Generic list/section page
│   ├── cv/
│   │   └── single.html    ← Full CV layout (reads all JSON data)
│   ├── posts/
│   │   ├── single.html    ← Blog post (with sharing + nav)
│   │   └── list.html      ← Blog listing
│   └── partials/          ← Reusable HTML partials
│       ├── head.html      ← <head> meta/CSS
│       ├── navbar.html    ← Navigation bar
│       ├── footer.html    ← Footer with social links
│       ├── about-hero.html      ← Hero section (profile.json)
│       ├── education.html       ← Education timeline (education.json)
│       ├── experience.html      ← Experience timeline (experience.json)
│       ├── publications.html    ← Publications list (publications.json)
│       ├── skills.html          ← Skills grid (skills.json)
│       ├── awards.html          ← Awards section (awards.json)
│       ├── volunteer.html       ← Volunteer timeline (volunteer.json)
│       ├── blog-posts.html      ← Recent posts preview
│       └── contact.html         ← Contact section
│
├── static/
│   ├── css/custom.css     ← All site styles (dark mode, responsive)
│   ├── js/custom.js       ← Dark mode, mobile nav, scrollspy
│   ├── images/            ← Profile photo goes here
│   └── files/             ← Resume PDF goes here
│
└── archetypes/
    ├── default.md         ← Default new-page template
    └── posts.md           ← New blog post template
```

---

## Adding Content

### Add a blog post

**Option A — Hugo CLI (recommended):**
```bash
hugo new posts/my-post-title.md
```
This creates `content/posts/my-post-title.md` with pre-filled front matter.

**Option B — Manual:**
Create `content/posts/my-post.md`:

```markdown
---
title: "My Research Update"
date: 2025-07-01
author: "Srinjoy Bhuiya"
description: "Brief summary shown in post listings"
tags:
  - "machine-learning"
  - "research"
categories:
  - "research-updates"
draft: false
---

Your post content in Markdown...
```

Set `draft: false` when ready to publish. Push to GitHub to trigger deployment.

---

### Update a JSON data file

All resume content lives in `data/*.json`. Edit these directly:

**Add a new publication:**
```json
// data/publications.json → inside "publications" array:
{
  "id": "my-new-paper-2025",
  "title": "Paper Title",
  "status": "Accepted",
  "date": "2025-09",
  "type": "Conference Paper",
  "venue": "CONFERENCE 2025",
  "authors": ["Srinjoy Bhuiya", "Co-Author Name"],
  "description": "Brief abstract or description.",
  "researchFocus": ["Topic 1", "Topic 2"],
  "links": {
    "doi": "https://doi.org/...",
    "arxiv": "https://arxiv.org/abs/..."
  }
}
```

**Add a new job:**
```json
// data/experience.json → inside "experience" array:
{
  "id": "company-year",
  "organization": "Company Name",
  "location": "City, Country",
  "roles": [
    {
      "title": "Job Title",
      "startDate": "2025-06",
      "endDate": "Present"
    }
  ],
  "description": "Brief overview of the role.",
  "achievements": [
    {
      "title": "Achievement Title",
      "description": "What you built or accomplished."
    }
  ]
}
```

---

### Add your profile photo

1. Place your photo at `static/images/profile.jpg`
   - Recommended: 400×400 px square JPEG
2. Commit and push — the site will show your photo automatically

---

### Add your CV PDF

1. Place your PDF at `static/files/resume.pdf`
2. The "Download CV" button will link to it automatically

---

## Docker Build & Run

### Build and run locally

```bash
docker compose up -d --build
```

Visit **http://localhost:8080** (or whatever port is set in `docker-compose.yml`).

### Stop

```bash
docker compose down
```

### View logs

```bash
docker compose logs -f portfolio
```

### Rebuild after changes

```bash
docker compose up -d --build --force-recreate
```

---

## Portainer Deployment

### Method 1 — Git-based stack (recommended)

1. Open **Portainer → Stacks → Add stack**
2. Choose **"Repository"** as build method
3. Fill in:
   - **Repository URL:** `https://github.com/Srinjoycode/sb-resume-content-json`
   - **Repository branch:** `main`
   - **Compose path:** `docker-compose.yml`
4. Enable **"GitOps updates"** → set a polling interval (e.g., 5 minutes)
5. Click **Deploy the stack**

Portainer will:
- Clone the repo
- Build the Docker image
- Start the container
- Check for updates on the configured interval

### Method 2 — Upload compose file

1. Open **Portainer → Stacks → Add stack**
2. Choose **"Web editor"** or **"Upload"**
3. Paste or upload the contents of `docker-compose.yml`
4. Click **Deploy the stack**

### Changing the port

Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:80"   # change 8080 to your desired host port
```

This should match the port your previous hello-world container was using, so your Nginx Proxy Manager / Cloudflare Tunnel rules stay the same.

---

## Auto-Redeploy Workflow

### Using Portainer GitOps polling

Configure Portainer to poll the GitHub repo every 5 minutes. When a push is detected, the stack is redeployed.

**Workflow:**
```
Edit JSON / add blog post
    ↓
git commit + git push
    ↓
Portainer detects change (within 5 min)
    ↓
Hugo builds new static site
    ↓
NGINX serves updated site
    ↓
Live on your domain ✅
```

### Using Watchtower (image-based)

If you push a pre-built Docker image to a registry:

1. Add Watchtower to your Portainer stack
2. Label the portfolio container with `com.centurylinklabs.watchtower.enable=true`
3. Watchtower checks for new images and auto-updates

### Using GitHub Actions + webhook

For instant deploys:
1. Create a GitHub Action that builds and pushes the image on every push to `main`
2. Configure a Portainer webhook to re-pull and restart on new image

---

## PR Preview (Design Check Before Deployment)

A GitHub Actions workflow automatically builds the Hugo site for every pull request and deploys it to a **temporary GitHub Pages URL** so you can inspect the full design before merging and triggering a production rebuild.

### How it works

1. Open (or push to) a pull request
2. The **"Deploy PR Preview"** workflow runs automatically:
   - Checks out the PR branch
   - Builds the Hugo site with a preview-specific `baseURL`
   - Pushes the built output to a `pr-preview/pr-<number>/` subdirectory on the `gh-pages` branch
   - Enables GitHub Pages on the `gh-pages` branch (first run only, idempotent)
3. A bot comment is posted (or updated) on the PR with a direct link:

```
🔍 Live Preview
➡️ https://<owner>.github.io/<repo>/pr-preview/pr-<number>/
```

4. When the PR is **closed** (merged or dismissed), a cleanup workflow removes the preview directory automatically.

> **No manual setup required.** The workflow automatically enables GitHub Pages on the `gh-pages` branch on its first successful run. GitHub Pages can take 1–2 minutes to go live after the first deployment.

### Preview workflow files

| File | Purpose |
|------|---------|
| `.github/workflows/preview.yml` | Build + deploy preview on PR push |
| `.github/workflows/preview-cleanup.yml` | Remove preview when PR is closed |

---

## Customisation

### Change the accent colour

Edit the CSS variable in `static/css/custom.css`:

```css
:root {
  --color-primary: #7c3aed;   /* purple accent */
}
```

### Change the default theme

Edit `hugo.yaml`:

```yaml
params:
  defaultTheme: "dark"   # "light" | "dark" | "auto"
```

`"auto"` respects the visitor's OS dark-mode preference.

### Enable Disqus comments

```yaml
params:
  disqusShortname: "your-disqus-shortname"
```

### Enable Google Analytics

```yaml
params:
  googleAnalytics: "G-XXXXXXXXXX"
```

### Change the port

```yaml
# docker-compose.yml
ports:
  - "YOUR_PORT:80"
```

---

## Updating Resume Content

All content is in `data/*.json`. No template changes are needed for typical updates.

| What to update | File |
|----------------|------|
| Name, bio, contact, social links | `data/profile.json` |
| Add/edit degree | `data/education.json` |
| Add/edit job or internship | `data/experience.json` |
| Add/edit publication | `data/publications.json` |
| Add/edit award | `data/awards.json` |
| Add/edit skills | `data/skills.json` |
| Add/edit volunteer role | `data/volunteer.json` |

---

## Troubleshooting

### Hugo build fails

```bash
# Check Hugo version
hugo version    # should be 0.120+

# Run with verbose output
hugo --verbose

# Check for template errors
hugo server --debug
```

### Container starts but site is blank

```bash
# Check NGINX logs
docker logs srinjoy-portfolio

# Check if public/ was built
docker exec srinjoy-portfolio ls /usr/share/nginx/html
```

### Port conflict

Change the host port in `docker-compose.yml`:
```yaml
ports:
  - "8081:80"   # use a different available port
```

### Dark mode toggle not working

Clear browser cache. The theme preference is stored in `localStorage`.

### Images not showing

Ensure:
- Profile photo is at `static/images/profile.jpg`
- File permissions allow reading
- Container was rebuilt after adding the image:
  ```bash
  docker compose up -d --build --force-recreate
  ```

---

## Quick Reference

```bash
# Start local dev server
hugo server --buildDrafts

# New blog post
hugo new posts/my-post.md

# Build for production
hugo --minify --gc

# Docker: build + run
docker compose up -d --build

# Docker: stop
docker compose down

# Docker: view logs
docker compose logs -f portfolio

# Docker: shell into container
docker exec -it srinjoy-portfolio sh
```

---

**Maintained by:** Srinjoy Bhuiya  
**Last Updated:** June 2026  
**Hugo Docs:** https://gohugo.io/documentation/  
**Portainer Docs:** https://docs.portainer.io/
