FROM node:25-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm

# -------------------------
# Build
# -------------------------
FROM base AS build
COPY . .
RUN pnpm install
RUN pnpm --filter client build
RUN pnpm --filter server build

# -------------------------
# Runtime
# -------------------------
FROM base AS server
WORKDIR /server

# Copy server source
COPY --from=build /app/apps/server .

# Copy built client assets
COPY --from=build /app/apps/client/dist ./client/dist

# Install only prod deps for server
RUN pnpm install --prod

EXPOSE 8001
CMD ["pnpm", "start"]
