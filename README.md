# Srinjoy Bhuiya — Academic Portfolio

A ready-to-deploy **Hugo academic website** powered by structured JSON resume data, served via Docker, and managed through Portainer.

> 📖 **Full deployment guide:** [README-HUGO.md](./README-HUGO.md)

## Overview

This repository contains:

1. **Structured JSON resume content** (`data/`) — the single source of truth for all professional information
2. **A complete Hugo static site** — templates, layouts, and styles that consume those JSON files
3. **Docker + docker-compose configuration** — ready for Portainer Git-based deployment

The content-template separation means:
- **Update your CV** by editing a JSON file — no template changes needed
- **Add a blog post** by creating a Markdown file — no code required
- **Redeploy automatically** — Portainer detects Git changes and rebuilds

## Quick Start

### Local development

```bash
# Install Hugo Extended (v0.120+)
# macOS: brew install hugo
# Linux: see README-HUGO.md

hugo server --buildDrafts
# Site runs at http://localhost:1313
```

### Docker

```bash
docker compose up -d --build
# Site runs at http://localhost:8080
```

### Portainer

1. Create a new stack → Repository method
2. Point to this GitHub repo
3. Enable GitOps polling
4. Deploy — done!

See [README-HUGO.md](./README-HUGO.md) for the full guide.

---

## Directory Structure

```
.
├── hugo.yaml              # Hugo site configuration
├── Dockerfile             # Multi-stage build (Hugo → NGINX)
├── docker-compose.yml     # Portainer-ready stack definition
├── nginx.conf             # NGINX server config
│
├── data/                  # ⭐ Edit these to update your resume
│   ├── profile.json       # Name, bio, contact, social links
│   ├── education.json     # Degrees and courses
│   ├── experience.json    # Work history and internships
│   ├── publications.json  # Research papers
│   ├── awards.json        # Scholarships and honours
│   ├── skills.json        # Technical skills by category
│   └── volunteer.json     # Leadership and service
│
├── content/               # Markdown pages
│   ├── _index.md          # Home page
│   ├── about.md           # About page
│   ├── cv.md              # CV page (auto-generated from JSON)
│   ├── projects.md        # Projects page
│   ├── contact.md         # Contact page
│   └── posts/             # Blog posts
│       ├── _index.md
│       ├── first-blog-post.md
│       └── example-research-update.md
│
├── layouts/               # Hugo templates (HTML)
│   ├── index.html         # Home page (all sections)
│   ├── _default/          # Base, single, list templates
│   ├── cv/                # CV-specific layout
│   ├── posts/             # Blog layouts
│   └── partials/          # Reusable section partials
│
├── static/
│   ├── css/custom.css     # All styles (dark mode, responsive)
│   ├── js/custom.js       # Dark mode toggle, mobile nav
│   ├── images/            # ← Place profile.jpg here
│   └── files/             # ← Place resume.pdf here
│
├── archetypes/            # Templates for new content files
├── assets/scss/           # Optional SCSS overrides
└── README-HUGO.md         # Full deployment guide
```

## Data Files Description

### `profile.json`
Core personal and professional identity information.

**Contains:**
- Full name
- Professional title/role
- Contact information (email, phone)
- Location
- Social media links (LinkedIn, GitHub)
- Short biography
- Research interests

**Example:**
```json
{
  "name": "Srinjoy Bhuiya",
  "title": "Master's Student in Computing Science | AI & ML Researcher",
  "email": "srinjoybhuiya@gmail.com",
  "phone": "+1-587-937-5679",
  "location": "Edmonton, Canada",
  "social": {
    "linkedin": "https://www.linkedin.com/in/srinjoy-bhuiya/",
    "github": "https://github.com/Srinjoycode"
  },
  "bio": "Master's student...",
  "researchInterests": [...]
}
```

---

### `education.json`
Academic background and educational achievements.

**Contains (per degree):**
- Institution name
- Degree type (e.g., Master's, Bachelor's)
- Field of study
- Location
- Start and end dates
- GPA/CGPA
- Relevant courses
- Teaching assistant roles
- Supervisor/advisor information with links
- Key achievements and highlights

**Example:**
```json
{
  "education": [
    {
      "id": "ualberta-masters",
      "institution": "University of Alberta",
      "degree": "Master's in Computing Science (Thesis)",
      "field": "Computing Science",
      "location": "Edmonton, Canada",
      "startDate": "2023-09",
      "endDate": "2026-05",
      "gpa": "3.9/4",
      "supervisor": {...},
      "laboratory": {...},
      "courses": [...],
      "teachingAssistant": [...],
      "highlights": [...]
    },
    ...
  ]
}
```

---

### `experience.json`
Professional work experience, internships, and research positions.

**Contains (per role):**
- Organization name
- Location
- Job title(s) (multiple roles at same org supported)
- Start and end dates
- Role description
- Key achievements and accomplishments
- Supervisor/mentor names
- Technologies/tools used

**Example:**
```json
{
  "experience": [
    {
      "id": "synapsis-medical",
      "organization": "Synapsis Medical Technologies",
      "location": "Edmonton, Canada",
      "roles": [
        {
          "title": "Machine Learning Research Scientist (Part-Time)",
          "startDate": "2025-05",
          "endDate": "2025-09"
        },
        {
          "title": "Research Intern (MITACS Accelerate Fellowship)",
          "startDate": "2024-05",
          "endDate": "2025-04"
        }
      ],
      "description": "...",
      "achievements": [...]
    },
    ...
  ]
}
```

---

### `publications.json`
Research papers, conference presentations, and publications.

**Contains (per publication):**
- Publication title
- Publication date
- Status (accepted, presented, in progress, preprint)
- Publication venue/conference
- Authors list
- Supervisor(s)
- Description and abstract
- Research focus areas
- External links (DOI, arXiv, IEEE, Springer, etc.)

**Example:**
```json
{
  "publications": [
    {
      "id": "biomedical-gan-2023",
      "title": "High-Quality 3D Biomedical Image Generation using Generative Adversarial Networks",
      "status": "Accepted and Presented",
      "date": "2023-05",
      "venue": "PREMI 2023",
      "publication": "Springer Lecture Notes in Computer Science (LNCS)",
      "authors": [...],
      "supervisor": "Dr. Dinabandhu Bhandari",
      "description": "...",
      "researchFocus": [...],
      "links": {
        "doi": "https://...",
        "title": "..."
      }
    },
    ...
  ]
}
```

---

### `awards.json`
Honors, scholarships, grants, and recognitions.

**Contains (per award):**
- Award name
- Awarding organization
- Location
- Award date and end date (if applicable)
- Award type
- Description
- Significance
- Key highlights

**Example:**
```json
{
  "awards": [
    {
      "id": "ualberta-scholarship",
      "name": "Graduate Recruitment Scholarship",
      "organization": "University of Alberta",
      "location": "Edmonton, Canada",
      "awardDate": "2023-09",
      "endDate": "2024-09",
      "type": "Scholarship",
      "description": "...",
      "significance": "...",
      "highlights": [...]
    },
    ...
  ]
}
```

---

### `skills.json`
Technical and professional skills organized by category.

**Contains (per category):**
- Skill category name
- List of skills
- Optional proficiency level

**Example:**
```json
{
  "skills": [
    {
      "category": "Generative AI & LLMs",
      "skills": [
        "Transformers",
        "Retrieval-Augmented Generation (RAG)",
        "LangChain",
        "Fine-tuning (LoRA, PEFT)",
        "Prompt Engineering",
        "Vector Databases",
        "RLHF (Reinforcement Learning from Human Feedback)"
      ]
    },
    ...
  ]
}
```

---

### `volunteer.json`
Volunteer experience, community leadership, and service roles.

**Contains (per role):**
- Organization/group name
- Location
- Position and role title
- Start and end dates
- Role description
- Responsibilities
- Impact/achievements

**Example:**
```json
{
  "volunteer": [
    {
      "id": "csgsa-finance",
      "organization": "Computing Science Graduate Students Association (CSGSA)",
      "location": "Edmonton, Canada",
      "position": "Director of Finances",
      "role": "Executive Member",
      "startDate": "2023-09",
      "endDate": "2025-04",
      "description": "...",
      "responsibilities": [...],
      "impact": "..."
    },
    ...
  ]
}
```

---

## How to Use These Files

### With Hugo Academic Templates

1. **Place data files in your Hugo project:**
   ```
   your-hugo-site/
   ├── data/
   │   ├── profile.json
   │   ├── education.json
   │   ├── experience.json
   │   ├── publications.json
   │   ├── awards.json
   │   ├── skills.json
   │   └── volunteer.json
   ```

2. **Reference in Hugo templates** (example in `themes/your-theme/layouts/partials/about.html`):
   ```html
   {{ $profile := site.Data.profile }}
   <h1>{{ $profile.name }}</h1>
   <p>{{ $profile.title }}</p>
   <p>{{ $profile.bio }}</p>
   ```

3. **Loop through data** (example for experience):
   ```html
   {{ range site.Data.experience.experience }}
     <div class="experience-item">
       <h3>{{ .organization }}</h3>
       <p>{{ .description }}</p>
       {{ range .achievements }}
         <li>{{ .description }}</li>
       {{ end }}
     </div>
   {{ end }}
   ```

### With Static Site Generators

These JSON files can be used with other static site generators:
- **Astro**: Import JSON directly into components
- **Eleventy**: Use data files in templates
- **Next.js/Gatsby**: Import JSON into React components

### With Custom Applications

Parse and utilize the JSON data in custom applications, APIs, or databases.

---

## Editing Content

### Adding a New Publication

1. Open `data/publications.json`
2. Add a new object to the `publications` array:
   ```json
   {
     "id": "unique-id",
     "title": "Paper Title",
     "status": "Accepted",
     "date": "2025-06",
     "type": "Conference Paper",
     "venue": "Conference Name",
     "authors": [...],
     "description": "...",
     "links": {...}
   }
   ```
3. Commit and push to GitHub
4. Hugo site automatically rebuilds

### Adding a New Blog Post

Create a Markdown file in `content/post/`:
```markdown
---
title: "My Research Update"
date: 2025-06-16
author: "Srinjoy Bhuiya"
tags: ["research", "machine-learning"]
---

Content here...
```

### Updating Profile Information

1. Edit `data/profile.json`
2. Update name, bio, links, etc.
3. Commit and push
4. Site automatically updates

---

## Docker Deployment

For local homelab hosting with Docker:

```dockerfile
FROM klakegg/hugo:ext-alpine AS builder
WORKDIR /src
COPY . .
RUN hugo

FROM nginx:alpine
COPY --from=builder /src/public /usr/share/nginx/html
EXPOSE 80
```

Deploy with Portainer using the provided `docker-compose.yml`.

---

## Integration with Portainer

1. Create a GitHub repository with this structure
2. Add `Dockerfile` and `docker-compose.yml`
3. In Portainer, create a new stack from Git
4. Point to your GitHub repository
5. Enable auto-update
6. Any changes to JSON files trigger automatic rebuilds and redeployment

---

## Schema Validation

All JSON files follow consistent schemas for reliability. You can validate using tools like:
- [jsonschema.net](https://www.jsonschema.net/)
- JSON validators in your editor (VS Code, etc.)

---

## Best Practices

1. **Use unique IDs**: Every entry should have a unique `id` field for reference
2. **Date format**: Use `YYYY-MM` or `YYYY-MM-DD` format consistently
3. **Links**: Always include full URLs with protocol (`https://`)
4. **Descriptions**: Keep descriptions concise but informative
5. **Version control**: Always commit changes with meaningful messages
6. **Backup**: Keep LaTeX resume as backup source

---

## Future Updates

To update your website:
1. Edit JSON files in GitHub (web or local editor)
2. Commit and push
3. Portainer automatically detects changes
4. Container rebuilds and redeploys
5. Site updates with new content

---

## Source Information

- **Original Resume**: LaTeX (`main.tex`)
- **Template Author**: Anubhav Singh
- **Theme**: Academic/Researcher focused Hugo theme
- **Hosted**: Local homelab via Docker + Portainer
- **Public Access**: Via Nginx Proxy Manager + Cloudflare Tunnel

---

## Support and Maintenance

For questions or updates:
- Review Hugo documentation: https://gohugo.io/
- Check academic theme docs: https://hugoblox.com/
- Validate JSON files regularly
- Keep backup of original LaTeX resume

---

**Last Updated**: June 2026
**Maintained by**: Srinjoy Bhuiya
**Repository**: [sb-resume-content-json](https://github.com/Srinjoycode/sb-resume-content-json)
