FROM node:25-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm

ENV CLIENT_DIST="/server/client"
# ENV CONFIG_PATH="/app/server/config"

FROM base AS build
COPY . .

RUN pnpm install
RUN pnpm --filter client -r build
RUN pnpm --filter server -r build

FROM base AS server
COPY --from=build /app/apps/server /server
COPY --from=build /app/apps/client/dist /server/client/dist
WORKDIR /server
EXPOSE 8001
CMD [ "pnpm", "start" ]
