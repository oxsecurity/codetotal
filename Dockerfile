# Builder
FROM node:18-alpine3.18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Final image
FROM node:18-alpine3.18
ARG BUILD_DATE=dev
ARG BUILD_REVISION=dev
ARG BUILD_VERSION=dev
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["node", "dist/index.js"]
LABEL maintainer="Nicolas Vuillamy <nicolas.vuillamy@ox.security>" \
      org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.revision=$BUILD_REVISION \
      org.opencontainers.image.version=$BUILD_VERSION \
      org.opencontainers.image.authors="Nicolas Vuillamy <nicolas.vuillamy@ox.security>, Eyal Paz <eyal@ox.security>, Itay Bisoni <itayy@ox.security>" \
      org.opencontainers.image.url="https://github.com/oxsecurity/codetotal" \
      org.opencontainers.image.source="https://github.com/oxsecurity/codetotal" \
      org.opencontainers.image.documentation="https://github.com/oxsecurity/codetotal" \
      org.opencontainers.image.vendor="OX Security" \
      org.opencontainers.image.description="Front End and Back End for CodeTotal"