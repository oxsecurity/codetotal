FROM node:18-alpine3.18
WORKDIR /app
ENV NODE_ENV=production
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
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