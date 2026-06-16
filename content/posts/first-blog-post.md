---
title: "Getting Started with Hugo: Building an Academic Portfolio"
date: 2025-06-01
lastmod: 2025-06-01
author: "Srinjoy Bhuiya"
description: "A practical walkthrough of setting up a Hugo-based academic portfolio site with Docker deployment and Portainer management."
tags:
  - "hugo"
  - "web-development"
  - "docker"
  - "academic"
categories:
  - "tutorials"
image: ""
draft: false
---

Building a personal academic website used to mean wrestling with WordPress plugins or paying for hosted services. With **Hugo** and **Docker**, you can have a fast, self-hosted, fully customisable site up and running in an afternoon.

This post walks through the approach I used for my own portfolio.

## Why Hugo?

Hugo is a static site generator written in Go. It converts Markdown files and data files (JSON, YAML) into a complete HTML website. Key advantages for academics:

- **No database** — just files in a Git repository
- **Content-first** — write in Markdown, not in a GUI
- **Fast builds** — even large sites build in seconds
- **Easy deployment** — static HTML + NGINX is bulletproof
- **Free hosting options** — GitHub Pages, Cloudflare Pages, or self-hosted

## Project Structure

My site uses a clean separation between **content** and **data**:

```
site/
├── data/          ← JSON files (resume, publications, skills…)
├── content/       ← Markdown pages and blog posts
├── layouts/       ← Hugo templates
└── static/        ← CSS, JS, images
```

All resume information lives in the `data/` folder as structured JSON files. This means I can update my CV without touching any template code — I just edit a JSON file and push.

## Docker Setup

The site is served via a multi-stage Docker build:

1. **Stage 1** — Hugo builds the static HTML
2. **Stage 2** — NGINX serves the output

```dockerfile
FROM hugomods/hugo:exts AS builder
WORKDIR /src
COPY . .
RUN hugo --minify --gc

FROM nginx:alpine
COPY --from=builder /src/public /usr/share/nginx/html
EXPOSE 80
```

## Portainer Deployment

With Portainer's Git-based stack deployment, every `git push` can automatically trigger a container rebuild. The workflow is:

1. Edit a JSON data file or add a blog post
2. `git add . && git commit -m "Update" && git push`
3. Portainer detects the change and rebuilds the stack
4. The new container is live within seconds

## Adding Blog Posts

Creating a new post is as simple as adding a Markdown file:

```bash
# Using Hugo's archetype command:
hugo new posts/my-new-post.md
```

Or manually create `content/posts/my-new-post.md` with this front matter:

```yaml
---
title: "My Research Update"
date: 2025-06-16
author: "Srinjoy Bhuiya"
tags: ["research", "machine-learning"]
---

Your post content here...
```

## Next Steps

In upcoming posts I will cover:
- Setting up Cloudflare Tunnel for secure public access
- Customising the site's CSS theme
- Automating deployments with GitHub Actions

Stay tuned!
