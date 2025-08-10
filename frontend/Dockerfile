# Build stage for v2
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
# Copy v2 build
COPY --from=build /app/dist /usr/share/nginx/html/v2
# Copy v1 static files
COPY dist_v1 /usr/share/nginx/html/v1
# Copy nginx template
COPY nginx.conf /etc/nginx/nginx.conf
# Install envsubst and certbot
RUN apk add --no-cache gettext certbot certbot-nginx

EXPOSE 80 443

# Use envsubst to replace environment variables and start nginx
CMD ["/bin/sh", "-c", "envsubst '$$DOMAIN' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]

# # Healthcheck
# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD curl -f http://localhost/ || exit 1
