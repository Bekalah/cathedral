# ---- build image ----
FROM node:20-alpine AS builder
WORKDIR /app

# Toolchain (for native deps if needed)
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy entire repo (simpler than partial COPY to avoid path drift)
COPY . .

# Speed up npm installs
RUN npm set fund false && npm set audit false

# Build all apps (root package.json supplies these scripts)
RUN npm run build
RUN npm run bundle:static

# ---- runtime image ----
FROM nginx:1.27-alpine AS runtime
WORKDIR /usr/share/nginx/html

# NGINX config
COPY nginx.conf /etc/nginx/nginx.conf

# Static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Fly uses $PORT
ENV PORT=8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
