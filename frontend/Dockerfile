# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]

# # Healthcheck
# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD curl -f http://localhost/ || exit 1
