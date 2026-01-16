FROM node:25-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm install
RUN pnpm run -r build
RUN pnpm deploy --filter=client --prod /client
RUN pnpm deploy --filter=server --prod /server

FROM base AS client
COPY --from=build /client /client

FROM base AS server
COPY --from=build /server /server
COPY --from=build /client/dist /server/client/dist
WORKDIR /server
EXPOSE 8001
CMD [ "pnpm", "start" ]
