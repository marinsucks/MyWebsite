# Build stage for v2
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built applications
COPY --from=build /app/dist /usr/share/nginx/html/v2
COPY dist_v1 /usr/share/nginx/html/v1

# Expose internal port for nginx-proxy
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1
