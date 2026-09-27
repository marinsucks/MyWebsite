FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG TURNSTILE_SITE_ID
RUN test -n "$TURNSTILE_SITE_ID" && VITE_TURNSTILE_SITE_KEY="$TURNSTILE_SITE_ID" npm run build


FROM alpine:3.24.1 AS artifacts

COPY --from=build /app/dist /artifacts/v2
COPY dist_v1 /artifacts/v1

CMD ["sh", "-ec", "find /output -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +; cp -a /artifacts/. /output/"]
