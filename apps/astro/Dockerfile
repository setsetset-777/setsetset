FROM node:25-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@10

# -------------------------
# Build
# -------------------------
FROM base AS build
COPY . .
RUN pnpm install
RUN pnpm --filter @app/astro build

FROM httpd:2.4 AS runtime
COPY --from=build /app/apps/astro/dist /usr/local/apache2/htdocs/
EXPOSE 80
