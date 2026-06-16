# =============================================================================
# Multi-stage Docker build for Hugo academic portfolio
#
# Stage 1: Build the static site with Hugo (extended for SCSS support)
# Stage 2: Serve with NGINX (lightweight production image)
# =============================================================================

# ---- Stage 1: Hugo build ----
FROM hugomods/hugo:exts AS builder

WORKDIR /src

# Copy site source
COPY . .

# Build the static site
# --minify reduces HTML/CSS/JS/JSON output sizes
RUN hugo --minify --gc

# ---- Stage 2: NGINX serve ----
FROM nginx:alpine

# Remove default NGINX content
RUN rm -rf /usr/share/nginx/html/*

# Copy built static site from builder stage
COPY --from=builder /src/public /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
