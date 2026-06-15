FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache tini

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY scripts/docker-entrypoint.sh ./scripts/
RUN chmod +x scripts/docker-entrypoint.sh

ENV NODE_ENV=production
ENV DATA_FILE=/app/data/entries.json

RUN mkdir -p /app/data

VOLUME ["/app/data"]

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["./scripts/docker-entrypoint.sh"]
