FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM alpine:3.24.1 AS artifacts

COPY --from=build /app/dist /artifacts/v2
COPY dist_v1 /artifacts/v1

CMD ["sh", "-ec", "find /output -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +; cp -a /artifacts/. /output/"]
