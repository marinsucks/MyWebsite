FROM node:24-alpine@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5 AS build

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund

COPY . .
ARG TURNSTILE_SITE_ID
RUN test -n "$TURNSTILE_SITE_ID" && VITE_TURNSTILE_SITE_KEY="$TURNSTILE_SITE_ID" npm run build


FROM alpine:3.24.1@sha256:28bd5fe8b56d1bd048e5babf5b10710ebe0bae67db86916198a6eec434943f8b AS artifacts

COPY --from=build /app/dist /artifacts/v2
COPY dist_v1 /artifacts/v1

CMD ["sh", "-ec", "find /output -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +; cp -a /artifacts/. /output/"]
