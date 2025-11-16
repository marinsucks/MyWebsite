# Build stage for v2
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine

RUN apk add --no-cache gettext certbot certbot-nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html/v2
COPY dist_v1 /usr/share/nginx/html/v1

EXPOSE 80 443

# Use envsubst to replace environment variables and start nginx
CMD [ "nginx", "-g", "daemon off;" ]

# # Healthcheck
# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD curl -f http://localhost/ || exit 1
